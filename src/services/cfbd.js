// src/services/cfbd.js
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const API_BASE =
  process.env.CFBD_API_BASE || "https://apinext.collegefootballdata.com";
const API_KEY = process.env.CFBD_API_KEY; // set this in your env

export async function fetchScoreboard(year, classification = "fbs") {
  const url = `${API_BASE}/scoreboard?year=${year}&classification=${classification}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  if (!res.ok) throw new Error(`CFBD API failed: ${res.status}`);
  return res.json();
}
