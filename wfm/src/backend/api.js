import { Application } from "https://deno.land/x/abc@v1.3.1/mod.ts";
import { abcCors } from "https://deno.land/x/cors/mod.ts";
import { Store } from "./store/store.ts";

const app = new Application();
const store = new Store("shortenings");
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
  .get("/", getHomePage)

  .post("/shortlinks", postURL)

  .start({ port: PORT });

function getHomePage(server) {
  server.json({}, 200);
}

async function postURL(server) {
  const { fullUrl, display } = await server.body;
  const response = await validateURL(fullUrl);

  if (response) {
    const key = randomShortCode();
    await store.set(key, { domain: fullUrl, visits: 0, display: display });
    return server.json({ url: fullUrl, shortcode: key }, 200);
  } else {
    return server.json({ error: "Invalid URL" }, 400);
  }
}

function randomShortCode() {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomStr = "";
  for (let i = 0; i < 4; i++) {
    randomStr += chars[Math.floor(Math.random() * chars.length)];
  }
  return randomStr;
}

async function validateURL(url) {
  let valid = false;
  try {
    valid = await fetch(url);
  } catch (e) {
    console.log(e);
  } finally {
    return valid;
  }
}

console.log(`Server running on http://localhost:${PORT}`);
