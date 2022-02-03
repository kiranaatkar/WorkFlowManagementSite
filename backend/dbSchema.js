import { DB } from "https://deno.land/x/sqlite/mod.ts";

try {
  await Deno.remove("projects.db");
} catch {
  // nothing to remove
}

const db = new DB("./projects.db");
await db.query(
  `CREATE TABLE projects (
    project_id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id integer,
    title TEXT NOT NULL,
    due_date DATETIME NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
  )`
);

await db.query(
  `CREATE TABLE project_1_tasks (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    due_date DATETIME,
    complete BOOLEAN NOT NULL
  )`
);

await db.query(
  `CREATE TABLE project_2_tasks (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    due_date DATETIME,
    complete BOOLEAN NOT NULL
  )`
);

// deno run --allow-read --allow-write dbSchema.js
// sqlite3 projects.db < dbSeed.sql
