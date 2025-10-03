import express from "express";
const router = express.Router();
export default router;

import {
  editTotalAmountWon,
  editWeeklyAmountWon,
  getLeaderboard,
} from "#src/queries/leaderboard";

// GET leaderboard
router.get("/", async (req, res) => {
  try {
    const leaderboard = await getLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});

router.route("/update").put(async (req, res) => {
  try {
    const { amount_won } = req.body;
    const user = req.user;
    await editTotalAmountWon(user.id, amount_won);
    const updatedUser = await editWeeklyAmountWon(user.id, amount_won);
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
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
