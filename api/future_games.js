import express from "express";
const router = express.Router();
import requireUser from "#middleware/requireUser";
export default router;

import { GetFutureGames } from "#src/queries/future_games";
//all games
router.route("/").get(async (req, res) => {
  try {
    const futureGames = await GetFutureGames();
    res.send(futureGames);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});
