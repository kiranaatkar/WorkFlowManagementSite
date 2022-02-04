import { Application } from "https://deno.land/x/abc/mod.ts";
import { DB } from "https://deno.land/x/sqlite@v2.5.0/mod.ts";
import { abcCors } from "https://deno.land/x/cors/mod.ts";

// denon run --allow-net --allow-read --allow-write server.js

const db = new DB("projects.db");
const app = new Application();
const PORT = 8080;

app.use(abcCors());

app
  .get("/projects", getAllProjects)
  .post("/projects/add", postNewProject)
  .start({ port: PORT });

async function getAllProjects(server) {
  const projects = [
    ...db.query("SELECT * FROM projects ORDER BY due_date DESC").asObjects(),
  ];
  await server.json(projects, 200);
}

async function postNewProject(server) {
  let { title, team_id, dueDate, description, tasks } = await server.body;
  team_id = team_id ? team_id : null;
  await db.query(
    `INSERT INTO projects
      (title, team_id, due_date, description, created_at, updated_at)
      VALUES
      (?, ?, ?, ?, datetime('now'), datetime('now'));
  `,
    [title, team_id, dueDate, description]
  );

  // get new project ID
  const [projectID] = await db.query(
    `SELECT project_id 
     FROM projects
     WHERE title = ?;
  `,
    [title]
  );
  await createTasksTable(tasks, projectID);
  server.json("Project added", 200);
}

function createTasksTable(tasks, projectID) {
  const tableName = `project_${projectID}_tasks`;
  db.query(
    `CREATE TABLE ${tableName} (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    due_date DATETIME,
    complete BOOLEAN NOT NULL
  );`
  );
  tasks.forEach(async (task) => {
    const due_date = task.due_date ? task.due_date : null;
    db.query(
      `INSERT INTO ${tableName} 
      (description, due_date, complete)
      VALUES
      (?, ?, ?)
;`,
      [task.info, due_date, 0]
    );
  });
}

console.log(`Server running on http://localhost:${PORT}`);
