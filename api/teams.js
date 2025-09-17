import express from "express";
const router = express.Router();
export default router;
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import {
  GetTeams,
  GetTeamById,
  GetTeamsByConference,
} from "#src/queries/teams";
//all teams
router.route("/").get(async (req, res) => {
  const teams = await GetTeams();
  res.send(teams);
});
//teams by conference
router.route("/conference/:conference").get(async (req, res) => {
  try {
    const teams = await GetTeamsByConference(req.params.conference);
    res.send(teams);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});
//teams by id
router.param("id", async (req, res, next, id) => {
  const team = await GetTeamById(id);
  if (!team) return res.status(404).send("Team not found");
  req.team = team;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.team);
});
