// Creates new router for routes
const router = require("express").Router();
// makes sure the notesRouter requires the path of ./notes
const notesRouter = require("./notes");
//middlware router.use for /notes and notes router
router.use("/notes", notesRouter);
// GET * should return the index.html file
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
// exports the module to router to other paths
module.exports = router;
