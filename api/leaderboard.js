import express from "express";
const router = express.Router();
export default router;

import {
  editTotalAmountWon,
  editWeeklyAmountWon,
  getLeaderboard,
} from "#src/queries/leaderboard";

//get leaderboard
router.route("/").get(async (req, res) => {
  req.body = {};
  const leaderboard = await getLeaderboard();
  res.send(leaderboard);
});

router.route("/update").put(async (req, res) => {
  const { amount_won } = req.body;
  const user = req.user;
  await editTotalAmountWon(user.id, amount_won);
  const updatedUser = await editWeeklyAmountWon(user.id, amount_won);
  return res.status(200).send(updatedUser);
});

//create leaderboard
// router.post("/", async (req, res) => {
//   try {
//     const {
//       username,
//       position,
//       total_bets,
//       weekly_wins,
//       weekly_losses,
//       all_time_wins,
//       all_time_losses,
//       total_amount_won,
//     } = req.body;
//     const leaderboard = await createLeaderboard(
//       username,
//       position,
//       total_bets,
//       weekly_wins,
//       weekly_losses,
//       all_time_wins,
//       all_time_losses,
//       total_amount_won
//     );
//     res.status(201).json(leaderboard);
//   } catch (error) {
//     console.error("Leaderboard error:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });
