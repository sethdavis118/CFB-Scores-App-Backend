// src/jobs/scoreboardUpdater.js
import cron from "node-cron";
import { fetchScoreboard } from "../services/cfbd.js";
import { markGameCompleted } from "../queries/games.js";

/**
 * Starts the scoreboard updater job.
 * Runs every 15 minutes on Fri, Sat, Sun, Mon
 */
export function startScoreboardUpdater() {
  cron.schedule("*/15 * * * *", async () => {
    try {
      const dayOfWeek = new Date().getDay();
      if (![0, 1, 5, 6].includes(dayOfWeek)) {
        console.log("Skipping scoreboard update (not game day).");
        return;
      }

      console.log("Running scoreboard updater...");
      const year = new Date().getFullYear();

      const scoreboard = await fetchScoreboard(year, "fbs");

      let updated = 0;
      for (const game of scoreboard) {
        if (game.status?.toLowerCase() === "completed") {
          const updatedGame = await markGameCompleted(
            game.id, // CFBD id → maps to games.game_id
            game.away_points,
            game.home_points
          );
          if (updatedGame) updated++;
        }
      }

      console.log(`Scoreboard updater finished. Updated ${updated} games.`);
    } catch (err) {
      console.error("Error in scoreboard updater:", err.message);
    }
  });
}
