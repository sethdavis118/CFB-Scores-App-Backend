import { getUserById } from "#src/queries/users";
import { verifyToken } from "#utils/jwt";

export default async function getUserFromToken(req, res, next) {
  console.log("Inside getUserFromToken");
  console.log(req.headers["authorization"]);
  const authorization = req.get("authorization");
  console.log("authorization", authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) return next();

  const token = authorization.split(" ")[1];
  console.log("token", token);
  try {
    const { id } = verifyToken(token);
    const user = await getUserById(id);
    console.log(user, "is the user");
    req.user = user;
    console.log(req.user);
    next();
  } catch {
    res.status(401).send("Invalid token.");
  }
}
