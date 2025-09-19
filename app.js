import express from "express";
const app = express();
export default app;
import getUserFromToken from "./middleware/getUserFromToken.js";
import cors from "cors";

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
import oddsRouter from "./api/odds.js";
import rankingsRouter from "./api/rankings.js";

app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/teams", teamsRouter);
app.use("/odds", oddsRouter);
app.use("/rankings", rankingsRouter);

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
