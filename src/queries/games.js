import db from "../db/client.js";

export async function GetGames() {
  const sql = ` SELECT * FROM games`;
  const { rows: games } = await db.query(sql);
  return games;
}

export async function GetGameById(id) {
  const sql = `SELECT * FROM games WHERE id = $1`;
  const game = await db.query(sql, [id]);
  return game;
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
  const { rows: games } = await db.query(sql, [season_week]);
  return games;
}
//no conference in games table, will adjust if needed
// export async function GetGamesByConference(conference) {
//   const sql = `SELECT * FROM games
//     JOIN teams AS home_team ON games.home_team_id = home_team.id
//     JOIN teams AS away_team ON games.away_team_id = away_team.id
//     WHERE home_team.conference = $1 OR away_team.conference = $1`;
//   const { rows: games } = await db.query(sql, [conference]);
//   return games;
// }

// export async function GetGamesBySeason(season) {
//   const sql = `SELECT * FROM games WHERE season = $1`;
//   const { rows: games } = await db.query(sql, [season]);
//   return games;
// }

export async function GetGamesBySeasonType(season_type) {
  const sql = `SELECT * FROM games WHERE season_type = $1`;
  const { rows: games } = await db.query(sql, [season_type]);
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
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12, $13, $14) RETURNING*
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
    home_points,
    `{${home_qtr_scores}}`,
    away_team_id,
    away_points,
    `{${away_qtr_scores}}`,
  ]);
  return game;
}
