const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const api = require("./routes/index");
const PORT = process.env.PORT || 3001;

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

//serve static files from the public directory
app.use(express.static("public"));

// HTML Routes

// GET /notes should return the notes.html file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// GET * should return the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API routes can be added here (e.g., GET, POST for notes)

// Start the server
// const PORT = process.env.PORT || 3000; //commented out because I did'nt realize I already had it up top in the const area
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
