const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const morgan = require("morgan");

app.use(express.static(path.join(__dirname, "public")), morgan("tiny"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.listen(port, () => {
  console.log(morgan);
});
