import db from "../db/client.js";

export async function GetGames() {
  const sql = ` SELECT * FROM games`;
  const { rows: games } = await db.query(sql);
  return games;
}

export async function GetGame(id) {
  const sql = `SELECT * FROM games WHERE id = $1`;
  const game = await db.query(sql, [id]);
  return game;
}

export async function CreateGame(
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
  away_qtr_points,
  away_qtr_scores
) {
  const sql =
    "INSERT INTO games " +
    "(game_id, season, season_week, season_type, " +
    "start_date, completed, neutral_site, conference_game, " +
    "home_team_id, home_points, home_qtr_scores, " +
    "away_team_id, away_points, away_qtr_scores) VALUES " +
    "($1, $2, $2, $4, $5, $6, $7, $8, $9, $10, " +
    "$11, $12, $13, $14) RETURNING*";
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
    home_points,
    "{" + home_qtr_scores + "}",
    away_team_id,
    away_points,
    "{" + away_qtr_scores + "}",
  ]);
  return game;
}
