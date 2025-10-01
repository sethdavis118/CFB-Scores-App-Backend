import db from "../db/client.js";

export async function createLeaderboard(
  user_id,
  username,
  position = 0,
  total_bets = 0,
  weekly_wins = 0,
  weekly_losses = 0,
  all_time_wins = 0,
  all_time_losses = 0,
  total_amount_won = 0
) {
  const sql = `
    INSERT INTO leaderboard (
      user_id, username, position, total_bets, weekly_wins, weekly_losses, 
      all_time_wins, all_time_losses, total_amount_won
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT (user_id)
    DO UPDATE SET
      username = EXCLUDED.username, -- keep username updated
      position = EXCLUDED.position,
      total_bets = leaderboard.total_bets + EXCLUDED.total_bets,
      weekly_wins = leaderboard.weekly_wins + EXCLUDED.weekly_wins,
      weekly_losses = leaderboard.weekly_losses + EXCLUDED.weekly_losses,
      all_time_wins = leaderboard.all_time_wins + EXCLUDED.all_time_wins,
      all_time_losses = leaderboard.all_time_losses + EXCLUDED.all_time_losses,
      total_amount_won = leaderboard.total_amount_won + EXCLUDED.total_amount_won
    RETURNING *;
  `;

  const {
    rows: [leaderboard],
  } = await db.query(sql, [
    user_id,
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

// Gets the leaderboard sorted by username and amount won
export async function getLeaderboard(limit = 10) {
  const sql = `
    SELECT username, total_amount_won
    FROM leaderboard
    ORDER BY total_amount_won DESC
    LIMIT $1;
  `;
  const { rows: leaderboard } = await db.query(sql, [limit]);
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
