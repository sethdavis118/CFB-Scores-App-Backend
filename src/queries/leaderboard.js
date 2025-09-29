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
