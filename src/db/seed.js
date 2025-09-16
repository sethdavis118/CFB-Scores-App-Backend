import db from "./client.js";
import { GetTeams, CreateTeam } from "../queries/teams.js";
import teamList from "../../CFDTeams.js";
//import gameList from "../../ncaafevents.json";
//import oddsList from "../../oddsspreads.json";
//import { Register } from "#db/queries/users";
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");
async function seed() {
  console.log(`DB Client: ${db}`);
  await SeedTeams();
}

async function SeedTeams() {
  try {
    console.log(teamList);
    for (const team of teamList) {
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
    }
  } catch (e) {
    console.error(e);
  }
}
