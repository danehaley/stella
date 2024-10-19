const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;
const morgan = require("morgan");
const limit = require("express-rate-limit");
const helmet = require("helmet");

let phasesData = readDataFile("/data/phases.json");
let globalPointer = 0; // Global pointer for all clients

// Set up rate limiting
const limiter = limit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

// For HTML responses
app.use((req, res, next) => {
  if (req.accepts("html")) {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' https://cdn.tailwindcss.com; style-src 'self' https://cdn.tailwindcss.com 'unsafe-inline'"
    );
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-Powered-By", "blood.net");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "interest-cohort=()");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-strict");
    res.setHeader("Cross-Origin-Resource-Policy", "same-site-mixed-content");
  }
  next();
});

// For static asset responses
app.use(express.static(path.join(__dirname, "public")));

// For other responses
app.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

app.get("/", rateLimitCheck, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/musik", rateLimitCheck, (req, res) => {
  const id = req.query.id;
  const sanitizedId = path.basename(id);
  const html = path.join(__dirname, "public", "musik." + sanitizedId + ".html");
  res.sendFile(html, function (err, fd) {
    if (err !== undefined && err.code === "ENOENT") {
      res.sendFile(path.join(__dirname, "public", "home.html"));
      console.log("NOT_FOUND: query id " + req.query.id + " had no musik HTML.");
      return;
    }
  });
});

app.get("/services/phases/nav", rateLimitCheck, (req, res) => {
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

app.get("/services/phases/today", rateLimitCheck, (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://cdn.tailwindcss.com; style-src 'self' https://cdn.tailwindcss.com;"
  );
  next();
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

function rateLimitCheck(req, res, next) {
  if (limiter.limited) {
    res
      .status(429)
      .json({ error: "Too Many Requests", message: "Please wait before making another request." });
  } else {
    next(); // Continue to the next middleware or route handler
  }
}

function getToday() {
  fetch("/services/phases/today")
    .then((response) => response.text())
    .then((data) => {
      phase = JSON.parse(data);
      document.getElementById("her-text").innerText = "☩ " + phase.string + " ��";
    })
    .catch((error) => {
      console.error("Error fetching today's phase:", error);
      document.getElementById("her-text").innerText = "☩ i love you ☩";
    });
}
