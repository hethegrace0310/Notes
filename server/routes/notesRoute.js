const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Note = require("../models/Note");

const { wrapAsync } = require("../utils/helper");

//get all notes
router.get(
  "/notes",
  wrapAsync(async function (req, res) {
    const notes = await Note.find({}).sort({ lastUpatedDate: 1 });
    res.json(notes);
  })
);

//create new note
router.post(
  "/notes",
  wrapAsync(async function (req, res) {
    console.log("Posted with body: " + JSON.stringify(req.body));
    const newNote = new Note({
      textTitle: req.body.textTitle,
      date: req.body.date,
      text: req.body.text,
      tags: req.body.tags,
      writer: req.body.writer,
    });

    await newNote.save();
    res.json(newNote);
  })
);

//update a note
router.put(
  "/notes/:id",
  isAgent,
  wrapAsync(async function (req, res) {
    const id = req.params.id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));

    await Note.findByIdAndUpdate(
      id,
      {
        textTitle: req.body.textTitle,
        date: req.body.date,
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
  isAgent,
  wrapAsync(async function (req, res) {
    const id = req.params.id;
    const result = await Note.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
  })
);
