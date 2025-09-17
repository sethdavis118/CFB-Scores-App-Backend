import pg from "pg";
<<<<<<< HEAD
=======
//import { env } from "node:process";
import dotenv from "dotenv";
dotenv.config();
console.log(`DATABASE_URL:  ${process.env.DATABASE_URL}`);
if (process.env.NODE_ENV === "production") {
  console.log("Welcome to production");
}
if (process.env.DEBUG) {
  console.log("Debugging output");
}
>>>>>>> bc9eaf0ed092ff2fca7e5501de12341ad1e06a7c
const db = new pg.Client(process.env.DATABASE_URL);
export default db;
