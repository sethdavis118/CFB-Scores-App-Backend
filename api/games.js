import express from "express";
import {
  GetGames,
  GetGameById,
  GetGamesByTeam,
  GetGamesByWeek,
  GetGamesByConference,
  GetGamesBySeasonType,
  editGameIsCompleted,
  GetGamesByConferenceAndWeek,
} from "../src/queries/games.js";

const router = express.Router();

// GET /api/games  → all games
router.get("/", async (req, res, next) => {
  try {
    const games = await GetGames();
    res.json({ classification: "fbs", games });
  } catch (err) {
    next(err);
  }
});

// GET /api/games/year/:year
router.get("/year/:year", async (req, res, next) => {
  try {
    const games = await GetGamesByYear(req.params.year);
    res.json({ classification: "fbs", year: req.params.year, games });
  } catch (err) {
    next(err);
  }
});

// GET /api/games/year/:year/week/:week
router.get("/year/:year/week/:week", async (req, res, next) => {
  try {
    const games = await GetGamesByYearAndWeek(req.params.year, req.params.week);
    res.json(games);
  } catch (err) {
    next(err);
  }
});

// GET /api/games/week/:week
router.get("/week/:week", async (req, res, next) => {
  try {
    const games = await GetGamesByWeek(req.params.week);
    res.json(games);
  } catch (err) {
    next(err);
  }
});

// GET /api/games/conference/:conference
router.get("/conference/:conference", async (req, res, next) => {
  try {
    const games = await GetGamesByConference(req.params.conference);
    res.json(games);
  } catch (err) {
    next(err);
  }
});

// GET /api/games/conference/:conference/week/:week
router.get("/conference/:conference/week/:week", async (req, res, next) => {
  try {
    const games = await GetGamesByConferenceAndWeek(
      req.params.conference,
      req.params.week
    );
    res.json(games);
  } catch (err) {
    next(err);
  }
});

// GET /api/games/season/:season type
router.get("/season/:season", async (req, res, next) => {
  try {
    const games = await GetGamesBySeasonType(req.params.season);
    res.json(games);
  } catch (err) {
    next(err);
  }
});

// GET /api/games/team/:team_id
router.get("/team/:team_id", async (req, res, next) => {
  try {
    const games = await GetGamesByTeam(req.params.team_id);
    res.json(games);
  } catch (err) {
    next(err);
  }
});

// GET /api/games/:id  (single game)
router.get("/:id", async (req, res, next) => {
  try {
    const game = await GetGameById(req.params.id);
    if (!game) return res.status(404).send("No game found");
    res.json(game);
  } catch (err) {
    next(err);
  }
});

// PUT /api/games/update/:id
router.put("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { awayPoints, homePoints } = req.body;
    const updatedGame = await editGameIsCompleted(id, awayPoints, homePoints);
    res.json(updatedGame);
  } catch (err) {
    next(err);
  }
});

router.post("/sync-scoreboard", async (req, res, next) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const week = req.query.week; // optional

    let url = `${process.env.CFBD_API_BASE}/scoreboard?year=${year}&classification=fbs`;
    if (week) url += `&week=${week}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.CFBD_API_KEY}` },
    });

    if (!response.ok) {
      throw new Error(`CFBD API failed: ${response.status}`);
    }

    const data = await response.json();
    const updated = [];

    // CFBD returns weeks array with games inside
    for (const weekObj of data.weeks || []) {
      for (const game of weekObj.games || []) {
        if (game.status?.toLowerCase() === "completed") {
          const dbGame = await editGameIsCompleted(
            game.id,
            game.awayPoints ?? null,
            game.homePoints ?? null
          );
          if (dbGame) updated.push(dbGame);
        }
      }
    }

    res.json({
      message: "Games marked as completed",
      updatedCount: updated.length,
      updated,
    });
  } catch (err) {
    console.error("Error in /sync-scoreboard:", err);
    next(err);
  }
});

export default router;
