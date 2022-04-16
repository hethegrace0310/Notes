const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Note = require("../models/Note");
const User = require("../models/User");

const { wrapAsync } = require("../utils/helper");

//get all notes
router.get(
  "/notes",
  wrapAsync(async function (req, res) {
    const notes = await Note.find({}).sort({
      lastUpdatedDate: -1,
    });
    // console.log(notes);
    res.json(notes);
  })
);

//create new note
router.post(
  "/notes",
  wrapAsync(async function (req, res) {
    console.log("Posted with body: " + JSON.stringify(req.body));
    // let writer = req.body.writer;
    // if (typeof writer === "string") {
    //   writer = await User.findOne({ name: writer });
    // }
    const newNote = new Note({
      textTitle: req.body.textTitle,
      lastUpdatedDate: new Date(),
      text: req.body.text,
      tags: req.body.tags,
      // writer: writer,
    });

    await newNote.save();
    res.json(newNote);
  })
);

//update a note
router.put(
  "/notes/:id",
  wrapAsync(async function (req, res) {
    const id = req.params.id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));

    await Note.findByIdAndUpdate(
      id,
      {
        textTitle: req.body.textTitle,
        lastUpdatedDate: req.body.lastUpdatedDate,
        text: req.body.text,
        tags: req.body.tags,
      },
      { runValidators: true }
    );
    res.sendStatus(204);
  })
);

router.delete(
  "/notes/:id",
  wrapAsync(async function (req, res) {
    const id = req.params.id;
    const result = await Note.findByIdAndDelete(mongoose.Types.ObjectId(id));
    console.log("Deleted successfully: " + result);
    res.json(result);
  })
);

module.exports = router;
