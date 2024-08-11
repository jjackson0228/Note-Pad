const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve static files from the public directory
app.use(express.static("public"));
