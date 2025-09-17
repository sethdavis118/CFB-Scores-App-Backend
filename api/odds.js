import express from "express";
const router = express.Router;
export default router;
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

<<<<<<< HEAD
import { GetOdds, GetOddsById } from "#src/queries/odds";
=======
import { GetOdds, GetOddsById, GetOddsByGameId } from "#src/queries/odds";
>>>>>>> bc9eaf0ed092ff2fca7e5501de12341ad1e06a7c

router.route("/").get(async (req, res) => {
  const odds = await GetOdds();
});

router.param("id", async (req, res, next, id) => {
  const odds = await GetOddsById(id);
<<<<<<< HEAD
  if (!odds) return res.status(404).json({ error: "No odds available" });
=======
  if (!odds) return res.status(404).json("No odds available");
>>>>>>> bc9eaf0ed092ff2fca7e5501de12341ad1e06a7c
  req.odds = odds;
  next();
});
router.route("/:id").get(async (req, res) => {
  res.send(req.odds);
});
<<<<<<< HEAD
=======

router.route("/:id/games").get(async (req, res) => {
  const odds = await GetOddsByGameId(req.params.id);
  res.send(odds);
});
>>>>>>> bc9eaf0ed092ff2fca7e5501de12341ad1e06a7c
