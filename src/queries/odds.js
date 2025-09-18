import db from "#src/db/client";

export async function getOdds() {
  const sql = `SELECT * FROM odds`;
  const { rows: odds } = await db.query(sql);
  return odds;
}

export async function getOddsById(id) {
  const sql = `SELECT * FROM odds WHERE id = $1`;
  const {
    rows: [odds],
  } = db.query(sql, [id]);
  return odds;
}

export async function getOddsByGameId(id) {
  const sql = `SELECT odds.* FROM odds
  JOIN games ON games.id = odds.game_id
  WHERE games.id = $1 `;
  const { rows: odds } = await db.query(sql, [id]);
  return odds;
}
