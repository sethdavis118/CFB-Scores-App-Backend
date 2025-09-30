import db from "../db/client.js";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { verifyToken } from "#utils/jwt.js";
import { getUserById } from "#src/queries/users.js";

dotenv.config({ path: "#/.env" });

export async function GetGames() {
  const sql = ` SELECT * FROM games`;
  const { rows: games } = await db.query(sql);
  return games;
}

export async function GetGameById(id) {
  console.log("id", id);
  const sql = `SELECT * FROM games WHERE game_id = $1`;
  const game = await db.query(sql, [id]);
  return game;
}

export async function GetGamesByTeam(team_id) {
  const sql = `SELECT * FROM games WHERE home_team_id = $1 OR away_team_id = $1`;
  const { rows: games } = await db.query(sql, [team_id]);
  return games;
}

export async function GetGamesByWeek(season_week) {
  const sql = `SELECT * FROM games WHERE season_week = $1 ORDER BY start_date ASC`;
  const { rows: games } = await db.query(sql, [season_week]);
  return games;
}

export async function getGamesByYear(year) {
  const sql = `SELECT * FROM games WHERE season = $1`;
  const { rows: games } = await db.query(sql, [year]);
  return games;
}

// export async function GetGamesByConference(conference) {
//   const sql = `SELECT * FROM games
//     JOIN teams AS home_team ON games.home_team_id = home_team.id
//     JOIN teams AS away_team ON games.away_team_id = away_team.id
//     WHERE home_team.conference = $1 OR away_team.conference = $1`;
//   const { rows: games } = await db.query(sql, [conference]);
//   return games;
// }

export async function GetGamesBySeasonType(season_type) {
  const sql = `SELECT * FROM games WHERE season_type = $1`;
  const { rows: games } = await db.query(sql, [season_type]);
  return games;
}

export async function GetGamesByYearAndWeek(year, week) {
  const sql = `SELECT * FROM games WHERE season = $1 AND season_week = $2`;
  const { rows: games } = await db.query(sql, [year, week]);
  return games;
}

export async function createGame(
  game_id,
  season,
  season_week,
  season_type,
  start_date,
  completed,
  neutral_site,
  conference_game,
  home_team_id,
  home_points,
  home_qtr_scores,
  away_team_id,
  away_points,
  away_qtr_scores
) {
  const sql = `INSERT INTO games
    (
      game_id,
      season,
      season_week,
      season_type,
      start_date,
      completed,
      neutral_site,
      conference_game,
      home_team_id,
      home_points,
      home_qtr_scores,
      away_team_id,
      away_points,
      away_qtr_scores
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12, $13, $14) RETURNING*
    `;
  //console.log(sql);
  const game = await db.query(sql, [
    game_id,
    season,
    season_week,
    season_type,
    start_date,
    completed,
    neutral_site,
    conference_game,
    home_team_id,
    home_points,
    `{${home_qtr_scores}}`,
    away_team_id,
    away_points,
    `{${away_qtr_scores}}`,
  ]);
  return game;
}

export async function editGameIsCompleted(id, homePoints, awayPoints) {
  const sql =
    "UPDATE games SET completed = true, home_points = $2, away_points = $3 WHERE game_id = $1 RETURNING *";
  const {
    rows: [updatedGame],
  } = await db.query(sql, [id, homePoints, awayPoints]);

  
  return updatedGame;
}

/**
 * Get games from DB, then sort based on:
 * 1. Favorite team games
 * 2. Incomplete Top 25 games
 * 3. Other incomplete games by start_date ASC
 * 4. Completed games by start_date ASC
 */
export async function getSortedGames(authHeader) {
  // Step 1: Verify token and get user
  if (!authHeader) throw new Error("No token provided");
  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

  const user = await getUserById(payload.id);
  if (!user) throw new Error("User not found");

  const favoriteTeamId = user.favorite_team;

  // Step 2: Get all games from DB
  const { rows: games } = await db.query(`SELECT * FROM games`);

  // Step 3: Fetch Top 25 rankings from API
  const res = await fetch("https://apinext.collegefootballdata.com/rankings", {
    headers: { Authorization: `Bearer ${process.env.CFBD_API_KEY}` },
  });
  const rankingData = await res.json();

/**************
At this point, an array of ranked teams won't work.  We need a set.
Information for a set can be found below because there's not a ton of room to explain them.
It's easier to compare rankings with this data object.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
**************/
  const rankedTeams = new Set();
  rankingData.forEach((week) => {
    week.polls.forEach((poll) => {
      poll.ranks.forEach((rank) => {
        if (rank.rank <= 25) {
          rankedTeams.add(rank.team.id); // assumes API returns team.id
        }
      });
    });
  });

  /*
    sorting by game with favorite team, ongoing game with a top 25 team, ongoing games by start time, then completed games.
    Look in the Value Equality section of the mdn link provided to see the logic.
  */

  //sort by favorite team first
  const aFav =
      a.home_team_id === favoriteTeamId || a.away_team_id === favoriteTeamId;
    const bFav =
      b.home_team_id === favoriteTeamId || b.away_team_id === favoriteTeamId;
    if (aFav && !bFav) return -1;
    if (bFav && !aFav) return 1;

  //Sort by games with top 25 teams in them that are not completed
  const aTop25 =
      !a.completed &&
      (rankedTeams.has(a.home_team_id) || rankedTeams.has(a.away_team_id));
    const bTop25 =
      !b.completed &&
      (rankedTeams.has(b.home_team_id) || rankedTeams.has(b.away_team_id));
    if (aTop25 && !bTop25) return -1;
    if (bTop25 && !aTop25) return 1;

  //Sort by other ongoing games by start time.
  if (!a.completed && !b.completed) {
      return new Date(a.start_date) - new Date(b.start_date);
    }
  //Sort completed games by start date last.
      if (!a.completed && b.completed) return -1;
    if (a.completed && !b.completed) return 1;

    return 0;
  });

  return sorted;
}
