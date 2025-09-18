import express from "express";
const router = express.Router();
export default router;
import requireBody from "#middleware/requireBody";
import { createUSer, getUserByEmailAndPassword } from "#src/queries/users";
import { createToken } from "#utils/jwt";

router
  .route("/register")
  .post(
    requireBody(["email", "password", "favorite_team, favorite_conference"]),
    async (req, res) => {
      const { email, password } = req.body;
      const user = await createUSer(
        email,
        password,
        favorite_team,
        favorite_conference
      );

      const token = createToken({ id: user.id });
      res.status(201).send(token);
    }
  );

router
  .route("/login")
  .post(requireBody(["email", "password"]), async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmailAndPassword(email, password);
    if (!user) {
      return res
        .status(401)
        .send("Invalid email, password, or both. Who knows for sure ");
    }

    const token = createToken({ id: user.id });
    res.status(token);
  });
