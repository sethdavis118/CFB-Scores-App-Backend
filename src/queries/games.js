import db from "../db/client.js";

// get all games
export async function GetGames() {
  const { rows } = await db.query("SELECT * FROM games;");
  return rows;
}

// get game by ID
export async function GetGameById(id) {
  const { rows } = await db.query("SELECT * FROM games WHERE id = $1;", [id]);
  return rows[0];
}

// update completed game
export async function editGameIsCompleted(gameId, awayPoints, homePoints) {
  const sql = `
    UPDATE games
    SET completed = true,
    away_points = COALESCE($2, away_points),
        home_points = COALESCE($3, home_points)
        away_points = $2,
        home_points = $3
    WHERE game_id = $1
    RETURNING *;
  `;
  const { rows } = await db.query(sql, [gameId, awayPoints, homePoints]);
  return rows[0];
}

export async function markGameCompleted(gameId, awayPoints, homePoints) {
  const sql = `
    UPDATE games
    SET completed = true,
        away_points = COALESCE($2, away_points),
        home_points = COALESCE($3, home_points)
    WHERE game_id = $1
    RETURNING *;
  `;
  const { rows } = await db.query(sql, [gameId, awayPoints, homePoints]);
  return rows[0];
}

export async function GetGamesByTeam(team_id) {
  const sql = `SELECT * FROM games WHERE home_team_id = $1 OR away_team_id = $1`;
  const {
    rows: [games],
  } = await db.query(sql, [team_id]);
  return games;
}

export async function GetGamesByWeek(season_week) {
  const sql = `SELECT * FROM games WHERE season_week = $1`;
  const {
    rows: [games],
  } = await db.query(sql, [season_week]);
  return games;
}

export async function GetGamesByConference(conference) {
  const sql = `SELECT * FROM games WHERE homeConference = $1 OR awayConference = $1`;
  const { rows: games } = await db.query(sql, [conference]);
  return games;
}

export async function GetGamesBySeasonType(season_type) {
  const sql = `SELECT * FROM games WHERE season_type = $1`;
  const {
    rows: [games],
  } = await db.query(sql, [season_type]);
  return games;
}

export async function GetGamesByConferenceAndWeek(conference, week) {
  const sql = `SELECT * FROM games WHERE (homeConference = $1 OR awayConference = $1) AND season_week = $2`;
  const { rows: games } = await db.query(sql, [conference, week]);
  return games;
}

export async function createGame(
  game_id,
  season,
  season_week,
  season_type,
  start_date,
  completed,
  neutral_site,
  conference_game,
  home_team_id,
  home_points,
  home_qtr_scores,
  away_team_id,
  away_points,
  away_qtr_scores
) {
  const sql = `INSERT INTO games
    (
      game_id,
      season,
      season_week,
      season_type,
      start_date,
      completed,
      neutral_site,
      conference_game,
      home_team_id,
      home_points,
      home_qtr_scores,
      away_team_id,
      away_points,
      away_qtr_scores
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING*
    `;
  //console.log(sql);
  const game = await db.query(sql, [
    game_id,
    season,
    season_week,
    season_type,
    start_date,
    completed,
    neutral_site,
    conference_game,
    home_team_id,
    home_points ? null : 0,
    Array.isArray(home_qtr_scores) ? home_qtr_scores : null,
    away_team_id,
    away_points ? null : 0,
    Array.isArray(away_qtr_scores) ? away_qtr_scores : null,
  ]);
  return game;
}

export async function getGamesByYear(year) {
  const CFBD_API_KEY = process.env.CFBD_API_KEY;
  const CFBD_API_BASE = process.env.CFBD_API_BASE;
  console.log("CFBD_API_KEY: ", process.env.CFBD_API_KEY);
  if (!CFBD_API_KEY) {
    throw new Error("CFBD_API_KEY is not set");
  }

  const url = new URL("./games", CFBD_API_BASE);
  await url.searchParams.set("year", year);
  url.searchParams.set("classification", "fbs");
  console.log("url with search params: ", url.toString());
  // you could pass other params here e.g. seasonType, week, etc.

  const resp = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${CFBD_API_KEY}`,
    },
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(
      `CFBD API request failed: ${resp.status} ${resp.statusText} - ${errBody}`
    );
  }

  const data = await resp.json();
  return data;
}
