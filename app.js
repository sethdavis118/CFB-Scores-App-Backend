import express from "express";
import cors from "cors";
import getUserFromToken from "./middleware/getUserFromToken.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(getUserFromToken);

import usersRouter from "./api/users.js";
import gamesRouter from "./api/games.js";
import teamsRouter from "./api/teams.js";
import betsRouter from "./api/bets.js";
import futureGameRouter from "./api/future_games.js";
import leaderboardRouter from "./api/leaderboard.js";
import rankingsRouter from "./api/rankings.js";
import creditsRouter from "./api/credits.js";

app.use("/api/users", usersRouter);
app.use("/api/games", gamesRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/bets", betsRouter);
app.use("/api/upcoming", futureGameRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/rankings", rankingsRouter);
app.use("/api/credits", creditsRouter);

app.use((err, req, res, next) => {
  switch (err.code) {
    case "22P02":
      return res.status(400).send(err.message);

    case "23505":

    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Not saying I blame you, but something went wrong.");
});

import { startScoreboardUpdater } from "./src/jobs/scoreboardUpdater.js";
startScoreboardUpdater();

export default app;
