import express from "express";
const router = express.Router();
import requireUser from "../middleware/requireUser.js";
export default router;

import { GetFutureGames } from "../src/queries/future_games.js";
//all games
router.route("/").get(async (req, res) => {
  const futureGames = await GetFutureGames();
  res.send(futureGames);
});
