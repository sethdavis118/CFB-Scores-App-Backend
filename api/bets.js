import express from "express";
const router = express.Router();
export default router;

import {
  createBet,
  deleteBet,
  editBetWinStatus,
  getBetsByUser,
  getBetsByWeek,
} from "#src/queries/bets";

//all bets by user
router.get("/", async (req, res) => {
  const user = req.user;
  console.log(req.user);
  // console.log(req);
  const bets = await getBetsByUser(user.id);
  res.send(bets);
});

router.post("/place_bet", async (req, res) => {
  const user = req.user;
  const { gameId, teamId, favoredTeamId, amount, betSpread } = req.body;
  const bet = createBet(
    user.id,
    gameId,
    teamId,
    favoredTeamId,
    amount,
    betSpread
  );
  return res.status(201).send(bet);
});

//bets by week
router.get("/week/:week", async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(400).send("Not authorized");

    const week = Number.parseInt(req.params.week, 10);
    if (!Number.isInteger(week) || week < 1 || week > 16) {
      return res.status(400).send("Invalid week number");
    }
    const bets = await getBetsByWeek(user.id, week);
    res.send(bets);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deleteRes = deleteBet(id);
  return res.status(200).send(deleteRes);
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { winStatus } = req.body;
  const updatedBet = await editBetWinStatus(id, winStatus);
  return res.status(201).send(updatedBet);
});
