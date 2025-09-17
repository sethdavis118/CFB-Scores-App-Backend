import app from "#app";
import db from "#src/db/client";
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = process.env.PORT ?? 3000;

await db.connect();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
