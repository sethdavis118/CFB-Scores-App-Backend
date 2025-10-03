import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import db from "./src/db/client.js";
import { startScoreboardUpdater } from "./src/jobs/scoreboardUpdater.js";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.connect();

    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);

      //Start the scoreboard updater after server starts
      startScoreboardUpdater();
    });
  } catch (err) {
    console.error(`Failed to connect to DB ${err}`);
    process.exit(1);
  }
})();
