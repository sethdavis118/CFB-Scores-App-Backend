import cron from "node-cron";
import { fetchScoreboard } from "../services/cfbd.js";
import { markGameCompleted } from "../queries/games.js";

export function startScoreboardUpdater() {
  // Run every 15 minutes
  try {
    const dayOfWeek = new Date().getDay();
    // Sunday = 0, Monday = 1, ..., Saturday = 6
    if (![0, 1, 5, 6].includes(dayOfWeek)) {
      console.log("Skipping scoreboard update (not game day).");
      return;
    }

    console.log("Running scoreboard updater...");
    const year = new Date().getFullYear();
    const scoreboard = fetchScoreboard(year, "fbs"); // hardcode FBS

    let updated = 0;
    for (const game of scoreboard.games) {
      if (game.status?.toLowerCase() === "completed") {
        const updatedGame = markGameCompleted(
          game.id, // CFBD `id` → your `game_id`
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
}
