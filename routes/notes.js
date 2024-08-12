//dependencies for required path fs and uuid as well as express router to route the app.get
const notes = require("express").Router(); // Create a new router for handling notes-related routes
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const util = require("util");
const dbPath = path.join(__dirname, "../db/db.json"); // Path to the JSON file where notes are stored

notes.get("/", (req, res) => {
  // The "fs.readFile" function reads the contents of the "db.json" file.
  fs.readFile(dbPath, "utf8", (err, data) => {
    // This "if" block checks if there is an error while reading the file.
    if (err) {
      // If an error occurs, log it to the console.
      console.error(err);
      res.status(500).json({ error: "Failed to read notes" });
    } else {
      // If no error occurs, try to parse the JSON data.
      try {
        // The parsed data is sent back as a JSON response.
        res.json(JSON.parse(data));
      } catch (e) {
        // If parsing fails send an empty string as the response.
        res.json("");
      }
    }
  });
});

// POST /api/notes - Adds a new note to the list
notes.post("/", (req, res) => {
  // Destructure the title and text from the request body
  const { title, text } = req.body;

  // Check if the request body exists or contains the necessary data
  // Create a new note object with a unique ID
  const addNote = {
    title,
    text,
    id: uuidv4(),
  };

  // Read the existing notes from the db.json file
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      // If an error occurs while reading the file, log it to the console
      console.error(err);
    } else {
      let notesArray;

      // Try to parse the JSON data from the file
      try {
        notesArray = JSON.parse(data);
      } catch (e) {
        // If parsing fails, initialize notesArray as an empty array
        notesArray = [];
      }

      // Add the new note to the notes array
      notesArray.push(addNote);

      // Write the updated notes array back to the db.json file
      fs.writeFile(
        dbPath,
        JSON.stringify(notesArray),
        (err) => (err ? console.error(err) : res.json(addNote)) // If successful, send the new note as a JSON response
      );
    }
  });
});
//export notes from the module
module.exports = notes;
