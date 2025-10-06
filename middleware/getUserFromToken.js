import { getUserById } from "#src/queries/users";
import { verifyToken } from "#utils/jwt";

export default async function getUserFromToken(req, res, next) {
  try {
    const authorization = req.get("authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }
    const token = authorization.split(" ")[1];
    const { id } = verifyToken(token);
    const user = await getUserById(id);
    req.user = user;
    next();
  } catch (err) {
    console.error(`Error in getUserFromToken: ${err.message}`);
    req.user = null;
    res.status(401).send("Invalid token.");
  }
}
