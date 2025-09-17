import express from "express";
const router = express.Router;
export default router;
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import { GetOdds, GetOddsById, GetOddsByGameId } from "#src/queries/odds";

router.route("/").get(async (req, res) => {
  const odds = await GetOdds();
});

router.param("id", async (req, res, next, id) => {
  const odds = await GetOddsById(id);
  if (!odds) return res.status(404).json("No odds available");
  req.odds = odds;
  next();
});
router.route("/:id").get(async (req, res) => {
  res.send(req.odds);
});

router.route("/:id/games").get(async (req, res) => {
  const odds = await GetOddsByGameId(req.params.id);
  res.send(odds);
});
