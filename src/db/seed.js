import db from "./client.js";
import { createTeam } from "../queries/teams.js";
import { createGame } from "../queries/games.js";
import { createScoreboard } from "../queries/scoreboards.js";
import teamList from "../../CFDTeams.js";
import gameList from "../../CFDGames.js";
import scoreboardList from "../../CFDScoreboard.js";
import conferenceList from "../../CFDConferences.js";
//import gameList from "../../ncaafevents.json";
//import oddsList from "../../oddsspreads.json";
//import { Register } from "#db/queries/users";
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");
async function seed() {
  await seedTeams();
  await seedGames();
  await seedScoreboards();
}

async function seedTeams() {
  try {
    for (const team of teamList) {
      console.log(`team.id ${team.id}`);
      await createTeam(
        Number(team.id),
        team.school,
        team.mascot,
        team.abbreviation,
        team.division,
        team.conference,
        team.classification,
        team.color,
        team.alternateColor,
        team.logos,
        team.location.id
      );
    }
  } catch (e) {
    console.error(e);
  }
}

async function seedGames() {
  try {
    for (const game of gameList) {
      console.log(`game.id ${game.id}`);
      await createGame(
        game.id,
        game.season,
        game.week,
        game.seasonType,
        game.startDate,
        game.completed,
        game.neutralSite,
        game.conferenceGame,
        game.homeId,
        game.homePoints,
        game.homeLineScores,
        game.awayId,
        game.awayPoints,
        game.awayLineScores
      );
    }
  } catch (e) {
    console.error(e);
  }
}

async function seedScoreboards() {
  // try {
  for (const sb of scoreboardList) {
    console.log(`scoreboard.id ${sb.id}`);
    await createScoreboard(sb);
  }
  //

  // console.error(e);
  // }
}
// //
