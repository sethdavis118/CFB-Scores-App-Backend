import express from "express";
const router = express.Router();
export default router;

import {
  createBet,
  deleteBet,
  editBetWinStatus,
  getBetsById,
  getBetsByUser,
} from "#src/queries/bets";

//all bets by user
// router.get("/user/:id", async (req, res) => {
//   req.body = {};
//   const bets = await getBetsByUser(req.params.id);
//   res.send(bets);
// });

router.get("/", async (req, res) => {
  const user = req.user;
  const bets = await getBetsByUser(user.id);
  res.send(bets);
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

router.get("/bet/:id", async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const bet = await getBetsById(id);
  res.send(bet);
});

// router.post("/login", requireBody(["email", "password"]), async (req, res) => {
//   const { email, password } = req.body;
//   const user = await getUserByEmailAndPassword(email, password);

//   if (!user) {
//     return res
//       .status(401)
//       .json({
//         error:
//           "Invalid email, password, or both. Maybe you should start writing these down",
//       });
//   }

//bets by user
// router.get("/user", async (req, res) => {
//   req.body = {};
//   const bets = await getBetsByUser(req.params.id);
//   console.log(bets);
//   res.send(bets);
// });
