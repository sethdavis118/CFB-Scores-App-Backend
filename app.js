import express from "express";
const app = express();
export default app;
import getUserFromToken from "./middleware/getUserFromToken.js";
import cors from "cors";
import { updateUser } from "./src/queries/users.js";

app.use(
  cors({
    origin: ["http://localhost:5173", "http://sidelinecfb.netlify.app"],
    credentials: true,
  }) //I think these are the cors objects that were passed before.  Changed to one object.
  //if not needed, just remove, again, but makes sure collegefootball data is nor public-Mike
  // {
  //   origin: "http://localhost:5173",
  //   credentials: true,
  // },
  // {
  //   origin: "https://sidelinecfb.netlify.app",
  //   credentials: true,
  // }
);

app.use(express.json());
app.use(getUserFromToken);

import betsRouter from "./api/bets.js";
import creditsRouter from "./api/credits.js";
import futureGameRouter from "./api/future_games.js";
import gamesRouter from "./api/games.js";
import leaderboardRouter from "./api/leaderboard.js";
import rankingsRouter from "./api/rankings.js";
import scoreboardsRouter from "./api/scoreboards.js";
import teamsRouter from "./api/teams.js";
import usersRouter from "./api/users.js";

app.use("/bets", betsRouter);
app.use("/credits", creditsRouter);
app.use("/games", gamesRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("/rankings", rankingsRouter);
app.use("/scoreboard", scoreboardsRouter);
app.use("/teams", teamsRouter);
app.use("/upcoming", futureGameRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use((err, req, res, next) => {
  switch (err.code) {
    case "22P02":
      return res.status(400).send(err.message);

    case "23505":

    case "23503":
      return res.status(400).send(err.detail);

    case "23502":
      return res.status(500).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Not saying I blame you, but something went wrong.");
});
