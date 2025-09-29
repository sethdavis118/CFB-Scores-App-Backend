import db from "#src/db/client";

export async function createBet(
  user_id,
  gameId,
  teamId,
  favoredTeamId,
  amount,
  betSpread
) {
  const sql =
    "INSERT INTO user_bets (user_id, game_id, team_id, favored_team, amount, odds) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  const bet = await db.query(sql, [
    user_id,
    gameId,
    teamId,
    favoredTeamId,
    amount,
    betSpread,
  ]);
  return bet;
}

export async function deleteBet(id) {
  const sql = "DELETE FROM user_bets WHERE id = $1";
  const { rows: deleteRes } = await db.query(sql, [id]);
  return deleteRes;
}

export async function editBetWinStatus(id, winStatus) {
  const sql = "UPDATE user_bets SET win_status = $2 WHERE id = $1 RETURNING *";
  const {
    rows: [updatedBet],
  } = await db.query(sql, [id, winStatus]);
  console.log("Updating bet", updatedBet);
  return updatedBet;
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
