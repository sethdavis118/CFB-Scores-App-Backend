import db from "../db/client.js";

export async function createLeaderboard(
  username,
  position,
  total_bets,
  weekly_wins,
  weekly_losses,
  all_time_wins,
  all_time_losses,
  total_amount_won
) {
  const sql =
    "INSERT INTO leaderboard (username, position, total_bets, weekly_wins, weekly_losses, all_time_wins, all_time_losses, total_amount_won) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
  const leaderboard = await db.query(sql, [
    username,
    position,
    total_bets,
    weekly_wins,
    weekly_losses,
    all_time_wins,
    all_time_losses,
    total_amount_won,
  ]);
  return leaderboard;
}

export async function getLeaderboard() {
  const sql = `SELECT * FROM leaderboard ORDER BY weekly_wins DESC, total_amount_won DESC`;
  const { rows: leaderboard } = await db.query(sql);
  return leaderboard;
}

export async function editTotalAmountWon(user_id, amount_won) {
  const sql =
    "UPDATE leaderboard SET total_amount_won = total_amount_won + $2 WHERE user_id = $1 RETURNING *";
  const {
    rows: [updatedUser],
  } = await db.query(sql, [user_id, amount_won]);
  return updatedUser;
}

export async function editWeeklyAmountWon(user_id, amount_won) {
  const sql =
    "UPDATE leaderboard SET weekly_amount_won = weekly_amount_won + $2 WHERE user_id = $1 RETURNING *";
  const {
    rows: [updatedUser],
  } = await db.query(sql, [user_id, amount_won]);
  return updatedUser;
}
