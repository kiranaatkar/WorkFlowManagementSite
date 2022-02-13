import { Application } from "https://deno.land/x/abc/mod.ts";
import { DB } from "https://deno.land/x/sqlite@v2.5.0/mod.ts";
import { abcCors } from "https://deno.land/x/cors/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

// denon run --allow-net --allow-read --allow-write server.js

const db = new DB("projects.db");
const app = new Application();
const PORT = 8080;
const allowedHeaders = [
  "Authorization",
  "Content-Type",
  "Accept",
  "Origin",
  "User-Agent",
];
const allowedMethods = ["GET", "POST", "DELETE"];

const corsConfig = abcCors({
  origin: "http://localhost:3000",
  Headers: allowedHeaders,
  Methods: allowedMethods,
  credentials: true,
});

app.use(corsConfig);

app
  .get("/projects", getAllProjects)
  .get("/projects/tasks/:id", getProjectTasks)
  .post("/users", createAccount)
  .post("/sessions", login)
  .post("/projects", postNewProject)
  .delete("/sessions", logOut)
  .start({ port: PORT });

async function getAllProjects(server) {
  const projects = [
    ...db.query("SELECT * FROM projects ORDER BY due_date DESC").asObjects(),
  ];
  await server.json({ projects }, 200);
}

async function getProjectTasks(server) {
  const { id } = server.params;
  const query = `SELECT * FROM tasks 
                 WHERE project_id = ?`;
  const tasks = [...db.query(query, [id]).asObjects()];
  await server.json({ tasks }, 200);
}

async function postNewProject(server) {
  let { title, user_id, dueDate, description, tasks } = await server.body;
  const query = `INSERT INTO projects
      (title, team_id, due_date, description, created_at, updated_at)
      VALUES
      (?, ?, ?, ?, datetime('now'), datetime('now'));
  `;
  await db.query(query, [title, team_id, dueDate, description]);

  // get projects
  const [projectID] = await db.query(
    `SELECT project_id 
     FROM projects
     WHERE title = ?;
  `,
    [title]
  );
  await postTasks(tasks, projectID, user_id);
  server.json("Project added", 200);
}

function postTasks(tasks, project_id, user_id) {
  const query = `INSERT INTO tasks
                 (project_id, created_by, description, due_date, complete)
                 VALUES (?, ?, ?, ?, ?)`;
  tasks.forEach(async (task) => {
    const due_date = task.due_date ? task.due_date : null;
    db.query(query, [project_id, user_id, task.info, due_date, 0]);
  });
}

async function createAccount(server) {
  const { email, password, confirmation } = await server.body;
  const authenticated = await validateCreateAccount(
    email,
    password,
    confirmation
  );
  if (authenticated.result) {
    const passwordEncrypted = await createHash(password);
    const query = `INSERT INTO users(email, encrypted_password, created_at, updated_at) 
                   VALUES (?, ?, datetime('now'), datetime('now'));`;

    await db.query(query, [email, passwordEncrypted]);
    await login(server);
  } else {
    server.json({ message: authenticated.msg }, 400);
  }
}

async function validateCreateAccount(email, password, confirmation) {
  const [userExists] = await db.query(
    `SELECT COUNT(*) FROM users WHERE email = ?`,
    [email]
  );

  const exists = {
    value: userExists[0],
    error: `An account already exists with the e-mail ${email}. `,
  };

  const match = {
    value: password !== confirmation,
    error: "Passwords do not match. ",
  };

  const tooShort = {
    value: password.length < 8,
    error: "Password must be at least 8 characters. ",
  };
  const authentication = { exists, match, tooShort };
  let errorMsg = "";
  for (const props of Object.values(authentication)) {
    if (props.value) {
      errorMsg += props.error;
    }
  }

  return errorMsg
    ? { result: false, msg: errorMsg }
    : { result: true, msg: "Success" };
}

async function createHash(password) {
  const salt = await bcrypt.genSalt(8);
  const passwordEncrypted = await bcrypt.hash(password, salt);
  return passwordEncrypted;
}

async function login(server) {
  const { email, password } = await server.body;
  const authenticated = await validateCredentials(email, password);
  if (authenticated.result) {
    const sessionId = v4.generate();
    const query = `INSERT INTO sessions (uuid, user_id, created_at) 
                   VALUES (?, ?, datetime('now'))`;
    await db.query(query, [sessionId, authenticated.user.id]);

    server.setCookie({
      name: "sessionId",
      value: sessionId,
    });
    server.setCookie({
      name: "user",
      value: email,
    });
    server.setCookie({
      name: "user_id",
      value: authenticated.user.id,
    });
    server.json({ msg: authenticated.msg }, 200);
  } else {
    server.json({ msg: authenticated.msg }, 400);
  }
}

async function validateCredentials(email, password) {
  let result = false;
  let msg = "";
  const query = `SELECT * FROM users WHERE email = ?`;
  const [user] = [...(await db.query(query, [email]).asObjects())];

  if (user) {
    const match = await bcrypt.compare(password, user.encrypted_password);
    if (match) {
      result = true;
      msg = "Success";
    } else {
      msg = "Incorrect password.";
    }
  } else {
    msg = `User ${email} does not exist`;
  }

  return { result, user, msg };
}

async function logOut(server) {
  const { sessionId } = server.cookies;
  const query = `DELETE FROM sessions WHERE uuid = ?`;
  await db.query(query, [sessionId]);
  await server.setCookie({
    name: "sessionId",
    value: "",
  });
  await server.setCookie({
    name: "user",
    value: "",
  });
  await server.setCookie({
    name: "user_id",
    value: "",
  });
  return server.json("Successfully logged out", 200);
}

async function getCurrentUser(sessionId) {
  const sessionsQuery = `SELECT * FROM sessions
                        WHERE uuid = ?`;
  const [session] = await db.query(sessionsQuery, [sessionId]).asObjects();
  if (!session) return false;

  //check if within 1 week
  const now = new Date();
  const weekAgo = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7
  );
  const sessionStartTime = new Date(session.created_at);
  if (sessionStartTime - weekAgo > 0) {
    const userQuery = "SELECT * FROM users WHERE id = ?";
    const [user] = db.query(userQuery, [session.user_id]).asObjects();
    return user;
  } else {
    return false;
  }
}

console.log(`Server running on http://localhost:${PORT}`);
