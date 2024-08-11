//dependencies for required path fs and uuid as well as express router to route the app.get
const notes = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const util = require("util");

const dbPath = "./db/db.json";
