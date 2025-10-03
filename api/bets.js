import express from "express";
const router = express.Router();
export default router;

import {
  createBet,
  deleteBet,
  editBetWinStatus,
  getBetsById,
  getBetsByUser,
  getBetsByWeek,
} from "#src/queries/bets";

//all bets by user
router.get("/", async (req, res) => {
  try {
    const user = req.user;
    const bets = await getBetsByUser(user.id);
    res.send(bets);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.post("/place_bet", async (req, res) => {
  try {
    const user = req.user;
    const { gameId, teamId, favoredTeamId, amount, betSpread } = req.body;
    const userBets = getBetsByUser(user.id);

    // if (userBets.contains(gameId)) {
    //   return res
    //     .status(400)
    //     .send("Can't place multiple bets on the same game.");
    // }
    const bet = createBet(
      user.id,
      gameId,
      teamId,
      favoredTeamId,
      amount,
      betSpread
    );
    return res.status(201).send(bet);
  } catch (error) {
    return res.status(500).json({ e: "There was an error" });
  }
  //   if (Number.isNaN(yearNum) || !Number.isInteger(yearNum)) {
  //   return res.status(400).json({ error: "year must be an integer" });
  // }
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
  try {
    const { id } = req.params;
    const deleteRes = deleteBet(id);
    return res.status(200).send(deleteRes);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { winStatus } = req.body;
    const updatedBet = await editBetWinStatus(id, winStatus);
    return res.status(201).send(updatedBet);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.get("/bet/:id", async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const bet = await getBetsById(id);
    res.send(bet);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});
