import db from "#src/db/client";

export async function GetOdds() {
  const sql = `SELECT * FROM odds`;
  const { rows: odds } = await db.query(sql);
  return odds;
}

export async function GetOddsById(id) {
  const sql = `SELECT * FROM odds WHERE id = $1`;
  const {
    rows: [odds],
  } = db.query(sql, [id]);
  return odds;
}

export async function GetOddsByGameId(id) {
<<<<<<< HEAD
  const sql = `SELECT * FROM games 
  JOIN odds `;
=======
  const sql = `SELECT odds.* FROM odds
  JOIN games ON games.id = odds.game_id
  WHERE games.id = $1 `;
>>>>>>> bc9eaf0ed092ff2fca7e5501de12341ad1e06a7c
  const { rows: odds } = await db.query(sql, [id]);
  return odds;
}
