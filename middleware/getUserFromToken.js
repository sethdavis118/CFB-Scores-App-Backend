import { getUserById } from "../src/queries/users.js";
import { verifyToken } from "../utils/jwt.js";

export default async function getUserFromToken(req, res, next) {
  const authHeader = req.headers("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null; //no token
    return next();
  }

  try {
    const token = authHeader.split(" "([1]));
    if (!token) return next();

    const payload = verifyToken(token);

    if (!payload?.id) {
      req.user = null;
      return next();
    }

    const user = await getUserById(payload.id);
    if (user) {
      req.user = user;
    } else {
      req.user = null;
    }
    return next();
  } catch (err) {
    console.error(`Error in getUserFromToken: ${err.message}`);
    //clear req.user so routes don’t break
    req.user = null;
    return next();
  }
}
