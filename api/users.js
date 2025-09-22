import express from "express";
const router = express.Router();
export default router;
import requireBody from "#middleware/requireBody";
import { createUSer, getUserByEmailAndPassword, getUserDataByEmailAndPassword } from "#src/queries/users";
import { createToken } from "#utils/jwt";

// router
//   .route("/register")
//   .post(requireBody(["username", "email", "password"]), async (req, res) => {
//     console.log("im here")
//     const { username, email, password, favorite_team, favorite_conference } =
//       req.body;
//     const user = await createUSer(
//       username,
//       email,
//       password,
//       favorite_team,
//       favorite_conference
//     );
// console.log("made it here")
//     const token = createToken({ id: user.id });
//     res.status(201).send(token);
//   });

router.post(
  "/register",
  requireBody(["username", "email", "password"]),
  async (req, res) => {
    try {
      const { username, email, password, favorite_team, favorite_conference } = req.body;

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

      const token = createToken({ id: user.id });
      res.status(201).json({ token });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);


// router
//   .route("/login")
//   .post(requireBody(["email", "password"]), async (req, res) => {
//     const { email, password } = req.body;
//     const user = await getUserByEmailAndPassword(email, password);
//     if (!user) {
//       return res
//         .status(401)
//         .send("Invalid email, password, or both. Who knows for sure ");
//     }

//     const token = createToken({ id: user.id });
//     res.status(token);
//   });

router.post("/login", requireBody(["email", "password"]), async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmailAndPassword(email, password);

  if (!user) {
    return res.status(401).json({ error: "Invalid email, password, or both." });
  }

  const token = createToken({ id: user.id });
  res.status(200).json({ token }); 
});


router.post("/me", requireBody(["email", "password"]), async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await getUserDataByEmailAndPassword(email, password);

    if (!user) {
    return res.status(401).json({ error: "Invalid email, password, or both." });
  }

  return res.status(201).send(user);
})

