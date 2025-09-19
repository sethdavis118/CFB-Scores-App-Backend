import express from "express";
const router = express.Router();
export default router;
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import { GetScoreboards } from "#src/queries/odds";

router.route("/").get(async (req, res) => {
  const odds = await GetScoreboards();
});
