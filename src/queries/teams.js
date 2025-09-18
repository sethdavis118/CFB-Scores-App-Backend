import db from "../db/client.js";

export async function GetTeams() {
  const sql = "SELECT * FROM teams";
  const { rows: teams } = await db.query(sql);
  return teams;
}

export async function GetTeamById(id) {
  const sql = "SELECT * FROM teams WHERE id = $1";
  const {
    rows: [team],
  } = await db.query(sql, [id]);
  return team;
}

export async function GetTeamByTeamId(team_id) {
  const sql = "SELECT * FROM teams WHERE team_id = $1";
  const {
    rows: [team],
  } = await db.query(sql, [team_id]);
  return team;
}

export async function GetTeamsByConference() {
  const sql = "SELECT * FROM teams WHERE conference = $1";
  const { rows: teams } = await db.query(sql, [conference]);
  return teams;
}

export async function createTeam(
  team_id,
  school,
  mascot,
  abbreviaion,
  conference,
  division,
  classification,
  color,
  alternate_color,
  logos,
  home_location_id
) {
  const sql = `
    INSERT INTO teams (
    team_id,
    school,
    mascot,
    abbreviation,
    conference,
    division,
    classification,
    color,
    alternate_color,
    logos,
    home_location_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;
    `;
  try {
    const { rows: team } = await db.query(sql, [
      team_id,
      school,
      mascot,
      abbreviaion,
      conference,
      division,
      classification,
      color,
      alternate_color,
      "{" + logos + "}",
      home_location_id,
    ]);
    return team;
  } catch (e) {
    console.error(e);
  }
}
