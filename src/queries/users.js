import bcrypt from "bcrypt";
import db from "#src/db/client";


export async function createUSer(
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

  console.log("Before the check");
  const isValid = await bcrypt.compare(password, user.password);
  console.log("After the isValid variable is assigned.")
  if (!isValid) return null;
  console.log(user);
  return user;
}

export async function getUserById(id) {
  const sql = `SELECT * FROM users WHERE id = $1`;

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

export async function updateUserFavorites(id, favorite_team, favorite_conference) {
  const sql = `
    UPDATE users
    SET favorite_team = $2, favorite_conference = $3
    WHERE id = $1
    RETURNING *;`;
  const {
    rows: [user],
  } = await db.query(sql, [id, favorite_team, favorite_conference]);
  return user;
}

export async function getUserDataByID(id) {
  const sql = `SELECT id, username, email, favorite_team, favorite_conference, bets FROM users WHERE id = $1`;

  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
