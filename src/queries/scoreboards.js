import db from "../db/client.js";

export async function GetScoreboards() {
  const sql = `SELECT * FROM scoreboads`;
  const { row: scoreboards } = await db.query(sql);
  return scoreboards;
}

export async function GetScoreboard(GameId) {
  const sql = `SELECT * FROM scoreboads WHERE id = $1`;
  const { row: scoreboards } = await db.query(sql[GameId]);
  return scoreboards;
}

export async function CreateScoreboard(
  game_id,
  start_date,
  start_time_tbd,
  tv,
  neutral_site,
  games_status,
  game_period,
  clock,
  possesion,
  last_play,
  venue,
  home_team,
  away_team,
  weather,
  betting
) {
  console.log(`Calling CreateScoreboard`);
  const sql = `
    INSERT INTO scoreboards (
        game_id,
        start_date,
        start_time_tbd,
        tv,
        neutral_site,
        games_status,
        game_period,
        clock,
        possesion,
        last_play,
        venue,
        home_team,
        away_team,
        weather,
        betting
    ) VALUES ($1, $2, $2, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;
  try {
  } catch (e) {
    const { rows: sb } = await db.query(sql, [
      game_id,
      start_date,
      start_time_tbd,
      tv,
      neutral_site,
      games_status,
      game_period,
      clock,
      possesion,
      last_play,
      venue,
      `{${home_team}}`,
      `{${away_team}}`,
      `{${weather}}`,
      `{${betting}}`,
    ]);
    return sb;
  }
}
