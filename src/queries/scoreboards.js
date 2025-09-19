import db from "../db/client.js";

export async function getScoreboards() {
  const sql = `SELECT * FROM scoreboads`;
  const { row: scoreboards } = await db.query(sql);
  return scoreboards;
}

export async function getScoreboard(GameId) {
  const sql = `SELECT * FROM scoreboads WHERE id = $1`;
  const { row: scoreboards } = await db.query(sql[GameId]);
  return scoreboards;
}

export async function createScoreboard(sb) {
  console.log(sb);
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
}
