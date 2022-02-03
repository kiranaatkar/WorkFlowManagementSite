import { Application } from "https://deno.land/x/abc/mod.ts";
import { DB } from "https://deno.land/x/sqlite@v2.5.0/mod.ts";
import { abcCors } from "https://deno.land/x/cors/mod.ts";

// denon run --allow-net --allow-read --allow-write server.js

const db = new DB("projects.db");
const app = new Application();
const PORT = 8080;

app.use(abcCors());

app.get("/projects", getAllProjects).start({ port: PORT });

async function getAllProjects(server) {
  const projects = [
    ...db.query("SELECT * FROM projects ORDER BY due_date DESC").asObjects(),
  ];
  await server.json(projects, 200);
}

console.log(`Server running on http://localhost:${PORT}`);
