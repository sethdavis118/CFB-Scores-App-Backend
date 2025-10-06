import bcrypt from "bcrypt";
import db from "#src/db/client";

export async function createUser(
  username,
  email,
  password,
  favorite_team = null,
  favorite_conference = null
) {
  const sql =
    "INSERT INTO users (username, email, password, favorite_team, favorite_conference) VALUES ($1, $2, $3, $4, $5) RETURNING *";

  const hashedPassword = await bcrypt.hash(password, 10);

  // console.log("hashed:" + hashedPassword + "; username:" + username)
  const {
    rows: [user],
  } = await db.query(sql, [
    username,
    email,
    hashedPassword,
    favorite_team,
    favorite_conference,
  ]);
  return user;
}

export async function getUserByEmailAndPassword(email, password) {
  const sql = "SELECT * FROM users WHERE email = $1";

  const {
    rows: [user],
  } = await db.query(sql, [email]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}

export async function getUserDataByEmailAndPassword(email, password) {
  const sql = "SELECT * FROM users WHERE email = $1";

  const {
    rows: [user],
  } = await db.query(sql, [email]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}

export async function getUserById(id) {
  const sql = `SELECT * FROM users WHERE id = $1`;

  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

export async function getUserDataByID(id) {
  const sql = `SELECT id, username, email, favorite_team, favorite_conference, bets FROM users WHERE id = $1`;

  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

export async function getOddsByUser(user_id) {
  const sql = `SELECT * FROM odds WHERE user_id = $1`;
  const { rows: odds } = await db.query(sql, [user_id]);
  return odds;
}

export async function updateUser(userId, newValues) {
  try {
    const fields = [];
    const values = [];
    let index = 1;
    const { username, email, favorite_team, favorite_conference } = newValues;

    /*
      get field values from newValues array
      and return a user object
    */
    for (const [key, value] of Object.entries(newValues)) {
      // if request body doesn't include a field to update, ignore it.
      if (value !== undefined && value !== null) {
        fields.push(`${key} = $${index++}`); //need extra $ to make a literal $ when run.
      }
      //add value object to values array declared under try in each iteration{
      values.push(value);
    }
    if (fields.length === 0) {
      `SELECT id, username. email, favorite_team, favorite_conference FROM user ${[
        userId,
      ]}`;
      return user;
    }
    //ad the userId argument to the values array defined below the try {
    values.push(userId);

    /*
      Now that all the fields in the user object were retrieved by the SELECT
      statement, all the fields to updated are seperated by a comma and space.

      The index was defined in line 83. , so each loop its $1, $2, etc
    */

    const sql = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *;`;

    console.log(`UPDATE SQL: ${sql} field values ${values}`);
    const {
      rows: [user],
    } = await db.query(sql, values);
    return user;
  } catch (err) {
    console.error(`Error in updateUser: ${err}`);
    throw err;
  }
}
