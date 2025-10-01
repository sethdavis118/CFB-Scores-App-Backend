import db from "#src/db/client";

export async function getUserCredits(user_id) {
  const {
    rows: [user],
  } = await db.query("SELECT credits, last_reset FROM users WHERE id = $1", [
    user_id,
  ]);
  if (!user) throw new Error("User not found");

  const { rows } = await db.query(
    `UPDATE users
     SET credits = 500, last_reset = CURRENT_DATE
     WHERE id = $1 AND last_reset < date_trunc('week', CURRENT_DATE)
     RETURNING credits;`,
    [user_id]
  );

  return rows.length > 0 ? rows[0].credits : user.credits;
}

export async function useCredits(user_id, amount) {
  const credits = await getUserCredits(user_id);
  if (credits < amount) throw new Error("Not enough credits");

  await db.query(
    "UPDATE users SET credits = credits - $2 WHERE id = $1 RETURNING *",
    [user_id, amount]
  );
  return credits - amount;
}

export async function returnCredits(user_id, amount) {
  // const credits = await getUserCredits(user_id);
  // if (credits < amount) throw new Error("Not enough credits");

  const { rows: credits } = await db.query(
    "UPDATE users SET credits = credits + $2 WHERE id = $1 RETURNING *",
    [user_id, amount]
  );
  return credits;
}
