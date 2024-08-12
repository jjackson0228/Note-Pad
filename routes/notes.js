//dependencies for required path fs and uuid as well as express router to route the app.get
const notes = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const util = require("util");

const dbPath = "./db/db.json";

//get api route for notes
notes.get("/", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    //if, else, try ,catch, loop that checks for errors and logs to console if error is present. If no error tries to parse json data
    if (err) {
      console.error(err);
    } else {
      try {
        res.json(JSON.parse(data));
      } catch (e) {
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
