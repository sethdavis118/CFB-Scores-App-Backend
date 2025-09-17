import db from "./client.js";
import { GetTeams, CreateTeam, GetTeamById } from "../queries/teams.js";
import { GetGames, GetGame, CreateGame } from "../queries/games.js";
import teamList from "../../CFDTeams.js";
import gameList from "../../CFDGames.js";
import conferenceList from "../../CFDConferences.js";
//import gameList from "../../ncaafevents.json";
//import oddsList from "../../oddsspreads.json";
//import { Register } from "#db/queries/users";
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");
async function seed() {
  await SeedTeams();
  await SeedGames();
}

async function SeedTeams() {
  try {
    for (const team of teamList) {
      if ((team.classification = "fbs")) {
        await CreateTeam(
          team.team_id,
          team.school,
          team.mascot,
          team.abbreviation,
          team.conference,
          team.classification,
          team.color,
          team.alternateColor,
          team.logos,
          team.location.id
        );
        //console.log("Team after insert", team);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

async function SeedGames() {
  try {
    for (const game of gameList) {
      console.log(`game before insert: ${game}`);
      await CreateGame(
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
      console.log(`game after insert: ${game}`);
    }
  } catch (e) {
    console.error(e);
  }
}
