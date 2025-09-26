import express from "express";
const router = express.Router();
export default router;

import { getLeaderboard } from "#src/queries/leaderboard";

//create leaderboard
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      position,
      total_bets,
      weekly_wins,
      weekly_losses,
      all_time_wins,
      all_time_losses,
      total_amount_won,
    } = req.body;
    const leaderboard = await createLeaderboard(
      user_id,
      position,
      total_bets,
      weekly_wins,
      weekly_losses,
      all_time_wins,
      all_time_losses,
      total_amount_won
    );
    res.status(201).json(leaderboard);
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//get leaderboard
router.route("/").get(async (req, res) => {
  req.body = {};
  const leaderboard = await getLeaderboard();
  res.send(leaderboard);
});
