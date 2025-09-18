import express from "express";
const router = express.Router();
export default router;

import { GetRankings } from "#src/queries/rankings";

//all rankings
router.route("/").get(async (req, res) => {
  const rankings = await GetRankings();
  res.send(rankings);
});

//ranking by team id
router.route("/team/:team_id").get(async (req, res) => {
  try {
    const rankings = await GetRankingsByTeamId(req.params.team_id);
    res.send(rankings);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});
