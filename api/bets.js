import express from "express";
const router = express.Router();
export default router;

import { getBetsByUser } from "#src/queries/bets";

//all bets by user
router.get("/user/:id", async (req, res) => {
  req.body = {};
  const bets = await getBetsByUser(req.params.id);
  res.send(bets);
});

//bets by user
// router.get("/user", async (req, res) => {
//   req.body = {};
//   const bets = await getBetsByUser(req.params.id);
//   console.log(bets);
//   res.send(bets);
// });
