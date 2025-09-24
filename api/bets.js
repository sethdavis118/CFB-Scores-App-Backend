import express from "express";
const router = express.Router();
export default router;

import { createBet, getBetsByUser } from "#src/queries/bets";

//all bets by user
// router.get("/user/:id", async (req, res) => {
//   req.body = {};
//   const bets = await getBetsByUser(req.params.id);
//   res.send(bets);
// });

router.get("/", async (req, res) => {
  const user = req.user;
  console.log(req.user);
  // console.log(req);
  const bets = await getBetsByUser(user.id);
  res.send(bets);
});

router.post("/place_bet", async (req, res) => {
  const user = req.user;
  const { gameId, amount, spread } = req.body;
  const bet = createBet(user.id, gameId, amount, spread);
  return res.status(201).send(bet);
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
