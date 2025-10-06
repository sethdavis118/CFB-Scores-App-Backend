import express from "express";
const router = express.Router();
export default router;
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import {
  createUser,
  getUserByEmailAndPassword,
  getUserById,
  updateUser,
} from "#src/queries/users";
import { createToken, verifyToken } from "#utils/jwt";
import { createLeaderboard } from "#src/queries/leaderboard";

router.post(
  "/register",
  requireBody(["username", "email", "password"]),
  async (req, res) => {
    try {
      const { username, email, password, favorite_team, favorite_conference } =
        req.body;

      const user = await createUSer(
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
      console.error("Register error:", err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

router.post("/login", requireBody(["email", "password"]), async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

/* router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1]; // read more about what this does -Evan
    const payload = verifyToken(token);

    const user = await getUserById(payload.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password, ...safeUser } = user;

    res.json(safeUser);
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
}); */
/**
 * This change means you don't have to parse the headers.
 * getUserFromToken already does that.
 *requireUser makes sure you have to be  logged in to
 get to the router.
 This is the only route needed to get token verified (i think)
 */
router.get("/me", requireUser, async (req, res) => {
  try {
    const { password, ...safeUser } = req.user; // remove sensitive data
    res.json(safeUser);
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/me", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    console.log(`PUT user/me endpoint user: ${req.user}`);
    console.log(`PUT user/me endpoint body sent: ${req.body}`);

    const updatedUser = await updateUser(userId, updates);
    res.json(updatedUser);
  } catch (err) {
    console.error("Error in PUT /users/me:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});
