import db from "../db/client.js";

export async function CreateRanking(
  poll,
  rank,
  team_id,
  school,
  conference,
  firstPlaceVotes,
  points
) {
  const sql = `INSERT INTO rankings (poll, rank, team_id, school, conference, firstPlaceVotes, points) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const {
    rows: [ranking],
  } = await db.query(sql, [
    poll,
    rank,
    team_id,
    school,
    conference,
    firstPlaceVotes,
    points,
  ]);
  return ranking;
}

export async function GetRankings() {
  const sql = ` SELECT * FROM rankings`;
  const { rows: rankings } = await db.query(sql);
  return rankings;
}

export async function GetRankingById(id) {
  const sql = `SELECT * FROM rankings WHERE id = $1`;
  const {
    rows: [ranking],
  } = await db.query(sql, [id]);
  return ranking;
}

export async function GetRankingsByTeamId(team_id) {
  const sql = `SELECT * FROM rankings WHERE team_id = $1`;
  const {
    rows: [ranking],
  } = await db.query(sql, [team_id]);
  return ranking;
}
