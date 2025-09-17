import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

/** Creates a token */
export function createToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

/** Extracts payload from token */
export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
