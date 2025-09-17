import express from "express";
const router = express.Router();
export default router;
import requireUser from "#middleware/requireUser";

import { GetGames, GetGame } from "#src/queries/games";

router.route("/").get(async (req, res) => {
  const games = await GetGames();
  res.send(games);
});

router.param("id", async (req, res, next, id) => {
  const game = await GetGame(id);
  if (!game) return res.status(404).send("No game available");
  req.game = game;
});

router.route("/:id").get((req, res) => {
  res.send(req.game);
});

router.route("/:id/games").get(requireUser, async (req, res) => {
  const games = await GetGames(req.user.id);
  res.send(games);
});
