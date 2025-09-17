import pg from "pg";
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
const db = new pg.Client(process.env.DATABASE_URL);
export default db;
