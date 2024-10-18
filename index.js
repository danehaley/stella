const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;
const morgan = require("morgan");

let phasesData = readDataFile("/data/phases.json");
let globalPointer = 0; // Global pointer for all clients

app.get("/services/phases/nav", (req, res) => {
  if (phasesData === undefined) {
    phasesData = readDataFile("/data/phases.json");
  }
  if (!phasesData || !phasesData.phases) {
    res.status(500).send("Error reading phases data");
    return;
  }

  // Determine direction based on query parameter
  const direction = req.query.direction;
  if (direction === "next") {
    globalPointer++;
  } else if (direction === "prev") {
    globalPointer--;
  } else if (direction === "init") {
    globalPointer = 0;
  }

  // Loop around if necessary
  if (globalPointer >= phasesData.phases.length) {
    globalPointer = 0; // Loop back to start
  } else if (globalPointer < 0) {
    globalPointer = phasesData.phases.length - 1; // Loop back to end
  }

  // Send the phase at the current pointer position
  res.send(phasesData.phases[globalPointer]);
});

app.get("/services/phases/today", (req, res) => {});

app.get("/musik", (req, res) => {
  const id = req.query.id;
  const html = path.join(__dirname, "public", "musik." + id + ".html");
  res.sendFile(html, function (err, fd) {
    if (err !== undefined && err.code === "ENOENT") {
      res.sendFile(path.join(__dirname, "public", "home.html"));
      console.log("NOT_FOUND: query id " + req.query.id + " had no musik HTML.");
      return;
    }
  });
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
