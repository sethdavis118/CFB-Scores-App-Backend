import db from "./client.js";
import { createTeam } from "../queries/teams.js";
import { createGame } from "../queries/games.js";
import { createScoreboard } from "../queries/scoreboards.js";
import teamList from "../../CFDTeams.js";
import gameList from "../../CFDGames.js";
import scoreboardList from "../../CFDScoreboard.js";
import conferenceList from "../../CFDConferences.js";
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");
async function seed() {
  await seedTeams();
  await seedGames();
  /* await seedScoreboards();*/
}
async function seedTeams() {
  try {
    for (const team of teamList) {
      await createTeam(
        Number(team.id),
        team.school,
        team.mascot,
        team.abbreviation,
        team.conference,
        team.division,
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
      await createGame(
        game.id,
        game.season,
        game.week,
        game.seasonType,
        game.startDate,
        game.completed,
        game.neutralSite,
        game.conferenceGame,
        game.homeTeam,
        game.homeConference,
        game.homeId,
        game.homePoints,
        game.homeLineScores,
        game.awayTeam,
        game.awayConference,
        game.awayId,
        game.awayPoints,
        game.awayLineScores
      );
    }
  } catch (e) {
    console.error(e);
  }
}
