import express from "express";
import {
  getUserCredits,
  useCredits,
  returnCredits,
} from "#src/queries/credits";
const router = express.Router();
export default router;

// How each user gets credits each week
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const credits = await getUserCredits(user_id);
    res.json({ credits });
  } catch (err) {
    console.error("Error fetching credits:", err);
    res.status(500).json({ message: "Error fetching credits" });
  }
});

// Using your credits
router.put("/use", async (req, res) => {
  const user = req.user;
  const { amount } = req.body;

  try {
    const remainingCredits = await useCredits(user.id, amount);
    res.json({ credits: remainingCredits });
  } catch (err) {
    console.error("Error using credits:", err);
    res.status(400).json({ message: err.message });
  }
});

// Checks Credits
router.get("/:user_id/raw", async (req, res) => {
  const { user_id } = req.params;

  try {
    const credits = await getUserCredits(user_id);
    res.json({ credits });
  } catch (err) {
    console.error("Error fetching user credits:", err);
    res.status(500).json({ message: "Error fetching credits" });
  }
});

// Returning your credits
router.put("/return", async (req, res) => {
  const user = req.user;
  const { amount } = req.body;

  try {
    const remainingCredits = await returnCredits(user.id, amount);
    res.json({ credits: remainingCredits });
  } catch (err) {
    console.error("Error using credits:", err);
    res.status(400).json({ message: err.message });
  }
});
