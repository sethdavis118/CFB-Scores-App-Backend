import db from "../db/client.js";

export async function getScoreboard() {
  const CFBD_API_KEY = process.env.CFBD_API_KEY;
  const CFBD_API_BASE = process.env.CFBD_API_BASE;
  console.log("CFBD_API_KEY: ", process.env.CFBD_API_KEY);
  if (!CFBD_API_KEY) {
    throw new Error("CFBD_API_KEY is not set");
  }

  const url = new URL("./scoreboard", CFBD_API_BASE);
  url.searchParams.set("classification", "fbs");
  console.log("url with search params: ", url.toString());
  // you could pass other params here e.g. seasonType, week, etc.

  const resp = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${CFBD_API_KEY}`,
    },
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(
      `CFBD API request failed: ${resp.status} ${resp.statusText} - ${errBody}`
    );
  }

  const data = await resp.json();
  return data;
}

export async function createScoreboard(sb) {
  try {
    const sql = `
    INSERT INTO scoreboards (
        game_id,
        start_date,
        start_time_tbd,
        tv,
        neutral_site,
        game_status,
        game_period,
        clock,
        situation,
        possesion,
        last_play,
        venue,
        home_team,
        away_team,
        weather,
        betting
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `;
    //console.log(sql);
    const { rows: scoreb } = await db.query(sql, [
      sb.id,
      sb.startDate,
      sb.startTimeTBD,
      sb.tv,
      sb.neutralSite,
      sb.status,
      sb.period,
      sb.clock,
      sb.situation,
      sb.possesion,
      sb.lastPlay,
      sb.venue,
      sb.homeTeam,
      sb.awayTeam,
      sb.weather,
      sb.betting,
    ]);
    return scoreb;
  } catch (e) {
    console.error(e);
  }
}
