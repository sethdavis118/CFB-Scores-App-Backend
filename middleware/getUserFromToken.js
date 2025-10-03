import { getUserById } from "../src/queries/users.js";
import { verifyToken } from "../utils/jwt.js";

export default async function getUserFromToken(req, res, next) {
  const authorization = req.get("authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) return next();

  const token = authorization.split(" ")[1];
  try {
    const { id } = verifyToken(token);

    const authHeader = req.headers["authorization"];
    if (!authHeader) return next();

    const token = authHeader.split(" "([1]));
    if (!token) return next();

    const user = await getUserById(payload.id);
    if (user) {
      req.user = user;
    }
    next();
  } catch {
    console.error(`Error in getUserFromToken: ${err}`);
    next();
  }
}
