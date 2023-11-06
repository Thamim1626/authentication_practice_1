const express = require("express");
const app = express();

const bcrypt = require("bcrypt");

const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

app.use(express.json());
const path = require("path");
const dbPath = path.join(__dirname, "covid19IndiaPortal.db");
let db = null;

const initializeServerAndDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server 3000 starting.........");
    });
  } catch (e) {
    process.exit(1);
    console.log("server Fail -----");
  }
};

initializeServerAndDb();

app.post("/login/", async (request, response) => {
  const { password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  response.send(hashedPassword);
});
