import db from "./client.js";
import { GetTeams, CreateTeam, GetTeamById } from "../queries/teams.js";
import { GetGames, GetGame, CreateGame } from "../queries/games.js";
import { CreateScoreboard } from "../queries/scoreboards.js";
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
  await SeedTeams();
  await SeedGames();
  await SeedScoreboards();
}

async function SeedTeams() {
  try {
    for (const team of teamList) {
      console.log(`team.id ${team.id}`);
      await CreateTeam(
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

async function SeedGames() {
  try {
    for (const game of gameList) {
      console.log(`game.id ${game.id}`);
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
    }
  } catch (e) {
    console.error(e);
  }
}

async function SeedScoreboards() {
  try {
    for (const sb of scoreboardList) {
      console.log(`scoreboard.id ${sb.id}`);
      CreateScoreboard(
        sb.id,
        sb.startDate,
        sb.startTimeTBD,
        sb.tv,
        sb.neutralSite,
        sb.conferenceGame,
        sb.status,
        sb.period,
        sb.clock,
        sb.situation,
        sb.possession,
        sb.lastPlay,
        sb.venue,
        sb.homeTeam,
        sb.awayTeam,
        sb.weather,
        sb.betting
      );
    }
  } catch (e) {
    console.error(e);
  }
}
