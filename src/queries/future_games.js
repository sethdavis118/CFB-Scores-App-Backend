import db from "../db/client.js";

export async function GetFutureGames() {
  const sql = ` SELECT * FROM scoreboards`;
  const { rows: games } = await db.query(sql);
  return games;
}
