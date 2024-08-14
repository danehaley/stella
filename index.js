const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;
const morgan = require("morgan");

let phasesData = readDataFile("/data/phases.json");
let counter = 0;

app.get("/services/phases/random", (req, res) => {
  if (phasesData === undefined) {
    phasesData = readDataFile("/data/phases.json");
  }
  if (!phasesData || !phasesData.phases) {
    res.status(500).send("Error reading phases data");
    return;
  }
  res.send(phasesData.phases[counter]);
  counter++;
  if (counter === phasesData.phases.length) counter = 0;
});

app.use(express.static(path.join(__dirname, "public")), morgan("tiny"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function readDataFile(relativeJsonPath) {
  let data = fs.readFileSync(path.join(__dirname, relativeJsonPath), "utf8");
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("Error parsing JSON data:", err);
    return undefined;
  }
}
