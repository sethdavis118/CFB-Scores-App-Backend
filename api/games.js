import express from "express";
const router = express.Router();
import requireUser from "#middleware/requireUser";
export default router;


import { GetGames, GetGameById, GetGamesByTeam, GetGamesByWeek, GetGamesBySeasonType } from "#src/queries/games";

//all games
router.route("/").get(async (req, res) => {
  const games = await GetGames();
  res.send(games);
});
//games by id
router.param("id", async (req, res, next, id) => {
  const game = await GetGame(id);
  if (!game) return res.status(404).send("No game available");
  req.game = game;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.game);
});

router.route("/:id/games").get(requireUser, async (req, res) => {
  const games = await GetGames(req.user.id);
  res.send(games);
});
//games by team
router.route("/:id/games/teams").get(requireUser, async (req, res) => {
  const games = await GetGamesByTeam(req.params.id);
  res.send(games);
});
//games by week
router.route("/:id/games/weeks").get(requireUser, async (req, res) => {
  const games = await GetGamesByWeek(req.params.id);
  res.send(games);
});
//games by season type
router.route("/:id/games/seasonType").get(requireUser, async (req, res) => {
  const games = await GetGamesBySeasonType(req.params.id);
  res.send(games);
});
//games by conference
router.route("/:id/games/conference").get(requireUser, async (req, res) => {
  const games = await GetGamesByConference(req.params.id);
  res.send(games);
});
