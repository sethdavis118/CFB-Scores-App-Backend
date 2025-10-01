import express from "express";
const router = express.Router();
export default router;
// import requireUser from "#middleware/requireUser";
// import { getGamesByYear } from "#/db/queries/games";
import {
  GetGames,
  GetGameById,
  GetGamesByWeek,
  getGamesByYear,
  GetGamesBySeasonType,
  GetGamesByYearAndWeek,
  editGameIsCompleted,
  GetGamesByConference,
  GetGamesByConferenceAndWeek,
} from "#src/queries/games";

//all games
router.route("/").get(async (req, res) => {
  req.body = {};
  const games = await GetGames();
  res.send(games);
});

router.get("/", async (req, res) => {
  try {
    const { year } = req.query;

    if (!year) {
      return res
        .status(400)
        .json({ error: "Missing required query parameter: year" });
    }

    // Optionally validate that year is a number
    const yearNum = Number(year);
    if (Number.isNaN(yearNum) || !Number.isInteger(yearNum)) {
      return res.status(400).json({ error: "year must be an integer" });
    }

    const games = await getGamesByYear(yearNum);
    return res.json({ classification: "fbs", year: yearNum, games });
  } catch (e) {
    console.error("Error in GET /games:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//games by year
router.route("/").get(async (req, res) => {
  const year = req.query;
  const classification = req.classification;
  const data = await getGamesByYear_api(year);
  const games = data.json();
  res.send(games);
});

//games by year and week
router.route("/year/:year/week/:week").get(async (req, res) => {
  const games = await GetGamesByYearAndWeek(req.params.year, req.params.week);
  res.send(games);
});

//games by id
router.param("id", async (req, res, next, id) => {
  const game = await GetGameById(id);
  if (!game) return res.status(404).send("No game available");
  req.game = game;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.game);
});

router.route("/:id/games").get(async (req, res) => {
  const games = await GetGames(req.user.id);
  res.send(games);
});

//games by team
router.route("/:team_id").get(async (req, res) => {
  const games = await GetGamesByTeam(req.params.id);
  res.send(games);
});

//games by team name
// router.route("/team/:team").get(async (req, res) => {
//   const games = await GetGamesByTeamName(req.params.team);
//   res.send(games);
// });

//games by week
router.route("/week/:id").get(async (req, res) => {
  try {
    const games = await GetGamesByWeek(req.params.id);
    console.log(req.params.id);
    res.send(games);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

//games by conference
router.route("/conference/:conference").get(async (req, res) => {
  try {
    const games = await GetGamesByConference(req.params.conference);
    res.send(games);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

//games by conference and week
router.route("/conference/:conference/week/:week").get(async (req, res) => {
  try {
    const games = await GetGamesByConferenceAndWeek(
      req.params.conference,
      req.params.week
    );
    res.send(games);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

//games by season type
router.route("/season/:season").get(async (req, res) => {
  const games = await GetGamesBySeasonType(req.params.season);
  res.send(games);
});

//games by id
router.param("gameId", async (req, res, next, id) => {
  const game = await GetGameById(id);
  if (!game) return res.status(404).send("No game available");
  req.game = game;
  next();
});

router.route("/:gameId").get((req, res) => {
  res.send(req.game);
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { awayPoints, homePoints } = req.body;
  const updatedGame = await editGameIsCompleted(id, awayPoints, homePoints);
  return res.status(200).send(updatedGame);
});

//likely not needed
// router.route("/:gameId/games").get(requireUser, async (req, res) => {
//   const games = await GetGames(req.user.id);
//   res.send(games);
// });
