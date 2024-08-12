//dependencies for required path fs and uuid as well as express router to route the app.get
const notes = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const util = require("util");

const dbPath = "./db/db.json";

notes.get("/", (req, res) => {
  // The "fs.readFile" function reads the contents of the "db.json" file.
  fs.readFile(dbPath, "utf8", (err, data) => {
    // This "if" block checks if there is an error while reading the file.
    if (err) {
      // If an error occurs, log it to the console.
      console.error(err);
    } else {
      // If no error occurs, try to parse the JSON data.
      try {
        // The parsed data is sent back as a JSON response.
        res.json(JSON.parse(data));
      } catch (e) {
        // If parsing fails (e.g., the JSON is malformed), send an empty string as the response.
        res.json("");
      }
    }
  });
});

//post api routes fro notes
notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const addNote = {
      title,
      text,
      id: uuidv4(),
    };
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        let notesArray;
        try {
          notesArray = JSON.parse(data);
        } catch (e) {
          notesArray = [];
        }
        notesArray.push(addNote);
        fs.writeFile("./db/db.json", JSON.stringify(notesArray), (err) =>
          err ? console.error(err) : res.json(addNote)
        );
      }
    });
  } else {
    res.error("An error occured while attempting to add tip");
  }
});
//export notes from the module
module.exports = notes;
