import db from "../../db/client.js";

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
