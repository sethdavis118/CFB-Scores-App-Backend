import db from "#src/db/client";
import { getScoreboard } from "../src/queries/scoreboards.js";
import scoreboardRouter from "../api/scoreboards.js";

/* export async function getScoreboards() {
  const sql = `SELECT * FROM scoreboads`;
  const { row: scoreboards } = await db.query(sql);
  return scoreboards;
}

export async function createScoreboard(sb) {
  try {
    const sql = `
    INSERT INTO scoreboards (
        game_id,
        start_date,
        start_time_tbd,
        tv,
        neutral_site,
        game_status,
        game_period,
        clock,
        situation,
        possesion,
        last_play,
        venue,
        home_team,
        away_team,
        weather,
        betting
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `;
    //console.log(sql);
    const { rows: scoreb } = await db.query(sql, [
      sb.id,
      sb.startDate,
      sb.startTimeTBD,
      sb.tv,
      sb.neutralSite,
      sb.status,
      sb.period,
      sb.clock,
      sb.situation,
      sb.possesion,
      sb.lastPlay,
      sb.venue,
      sb.homeTeam,
      sb.awayTeam,
      sb.weather,
      sb.betting,
    ]);
    return scoreb;
  } catch (e) {
    console.error(e);
  }
} */
/* export async function getScoreboard(GameId) {
  const sql = `SELECT * FROM scoreboads WHERE id = $1`;
  const { row: scoreboards } = await db.query(sql[GameId]);
  return scoreboards;
} */
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const CFBD_API_BASE = process.env.CFBD_API_BASE;
const CFBD_API_KEY = process.env.CFBD_API_KEY;

console.log(`CFBD_API_BASE: ${CFBD_API_BASE}`);
console.log(`CFBD_API_KEY (first 5 chars): ${CFBD_API_KEY?.slice(0, 5)}...`);

//Make endpoint that gets all fbs games
router.get("/", async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const classification = req.query.classification || "fbs";
    const url = `${CFBD_API_BASE}/scoreboard?classification=${classification}`;
    console.log(`CFBD_API_BASE with end point from scoreboardRouter: ${url}`);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${CFBD_API_KEY}`,
      },
    });

    if (!response.ok) {
      console.error(`CFBS API error: ${response.status}`);
      return res;
    }

    const data = await response.json();
    console.log(`CFBD API call returned: ${data.length} games`);
    res.json(data);
  } catch (err) {
    console.error("Error in /scoreboard:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
