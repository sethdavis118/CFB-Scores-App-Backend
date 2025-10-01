import db from "#src/db/client";
import { useCredits } from "#src/queries/credits"

export async function createBet(user_id, gameId, teamId, amount, betSpread) {
  const sql =
    "INSERT INTO user_bets (user_id, game_id, team_id, amount, odds) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const bet = await db.query(sql, [user_id, gameId, teamId, amount, betSpread]);
  return bet;
}

export async function deleteBet(id) {
  const sql = "DELETE FROM user_bets WHERE id = $1";
  const { rows: deleteRes } = await db.query(sql, [id]);
  return deleteRes;
}

export async function getAllBets() {
  const sql = `SELECT * FROM user_bets`;
  const { rows: bets } = await db.query(sql);
  return bets;
}

export async function getBetsById(bet_id) {
  const sql = `SELECT * FROM user_bets WHERE id = $1`;
  const {
    rows: [bets],
  } = await db.query(sql, [bet_id]);
  return bets;
}

export async function getBetsByUser(user_id) {
  const sql = `SELECT * FROM user_bets WHERE user_id = $1`;
  const { rows: bets } = await db.query(sql, [user_id]);
  return bets;
}

export async function getBetsByGame(game_id) {
  const sql = `SELECT * FROM user_bets WHERE game = $1`;
  const { rows: bets } = await db.query(sql, [game_id]);
  return bets;
}

export async function createBetWithCredits(user_id, gameId, teamId, amount, betSpread) {
  await useCredits(user_id, amount);
  const sql = "INSERT INTO user_bets (user_id, game_id, team_id, amount, odds) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const { rows: [bet] } = await db.query(sql, [user_id, gameId, teamId, amount, betSpread]);
  return bet;
}