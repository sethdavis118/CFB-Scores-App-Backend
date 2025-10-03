import express from "express";
import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import { createLeaderboard } from "../src/queries/leaderboard.js";

const usersRouter = express.Router();

//wrapper to strip passwords for /me and /register
function toSafeUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
  //keep favorite team and favorite conference from being stripped by toSageUser
  return safeUser;
}

usersRouter.post(
  "/register",
  requireBody(["username", "email", "password"]),
  async (req, res) => {
    try {
      const { username, email, password, favorite_team, favorite_conference } =
        req.body;

      const user = await createUser(
        username,
        email,
        password,
        favorite_team,
        favorite_conference
      );

      if (!user || !user.id) {
        return res.status(400).json({ error: "User creation failed" });
      }
      await createLeaderboard(user.id, user.username);

      const token = createToken({ id: user.id });
      res.status(201).json({ token });
    } catch (err) {
      console.error(`Register error: ${err}`);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

usersRouter.post(
  "/login",
  requireBody(["email", "password"]),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmailAndPassword(email, password);

    if (!user) {
      return res.status(401).json({
        error:
          "Invalid email, password, or both. Maybe you should start writing these down",
      });
    }

    const token = createToken({ id: user.id });
    res.status(200).json({ token });
  }
);

usersRouter.get("/me", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.json(toSafeUser(req.user));
  } catch (err) {
    console.error("Error in /me:", err);
    next(err);
  }
});

export default usersRouter;
