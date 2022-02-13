import { DB } from "https://deno.land/x/sqlite/mod.ts";

try {
  await Deno.remove("projects.db");
} catch {
  // nothing to remove
}

const db = new DB("./projects.db");
await db.query(
  `CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_by INTEGER NOT NULL,
    title TEXT NOT NULL,
    due_date DATETIME NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY(created_by) REFERENCES users(id)
  )`
);

await db.query(
  `CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    created_by INTEGER NOT NULL,
    description TEXT NOT NULL,
    due_date DATETIME,
    complete BOOLEAN NOT NULL,
    FOREIGN KEY(project_id) REFERENCES projects(id),
    FOREIGN KEY(created_by) REFERENCES users(id)
  )`
);

await db.query(
  `CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    encrypted_password TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
  );`
);

await db.query(
  `CREATE TABLE sessions (
  uuid TEXT PRIMARY KEY,
  created_at DATETIME NOT NULL,
  user_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id)
);`
);

// deno run --allow-read --allow-write dbSchema.js
// sqlite3 projects.db < dbSeed.sql
