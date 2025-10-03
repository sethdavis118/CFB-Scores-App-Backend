import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import db from "./src/db/client.js";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.connect();
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to connec to DB ${err}`);
    process.exit(1);
  }
})();
