// src/services/cfbd.js
import fetch from "node-fetch";

const CFBD_API_BASE =
  process.env.CFBD_API_BASE || "https://apinext.collegefootballdata.com";
const CFBD_API_KEY = process.env.CFBD_API_KEY;

/**
 * Fetch scoreboard from CFBD
 * @param {number} year - season year
 * @param {string} classification - usually "fbs"
 * @returns {Promise<Array>} games array
 */
export async function fetchScoreboard(year, classification = "fbs") {
  const url = `${CFBD_API_BASE}/scoreboard?year=${year}&classification=${classification}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${CFBD_API_KEY}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CFBD scoreboard fetch failed: ${res.status} ${text}`);
  }

  return res.json();
}
