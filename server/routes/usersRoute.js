const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");

const { wrapAsync } = require("../utils/helper");

//get
router.get(
  "/user",
  wrapAsync(async function (req, res, next) {
    const id = req.session.userId;
    console.log(id);
    if (mongoose.isValidObjectId(id)) {
      const user = await User.findById(id);
      if (user) {
        res.json(user);
        return;
      } else {
        throw new Error("User Not Found");
      }
    } else {
      throw new Error("Invalid user Id");
    }
  })
);

//get current user
router.get(
  "/user/:id",
  wrapAsync(async function (req, res, next) {
    const id = req.params.id;
    console.log(id);
    const _id = mongoose.Types.ObjectId(id);
    if (mongoose.isValidObjectId(id)) {
      // const user = await User.findById(id);
      const user = await User.findOne({ _id: _id });
      if (user) {
        res.json(user);
        return;
      } else {
        throw new Error("User Not Found");
      }
    } else {
      throw new Error("Invalid user Id");
    }
  })
);

router.get(
  "/users",
  wrapAsync(async function (req, res, next) {
    const users = await User.find({});
    res.json(users);
  })
);

router.put(
  "/user",
  wrapAsync(async function (req, res) {
    const id = req.body._id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    const colorScheme = req.body.colorScheme === "Light" ? "Light" : "Dark";
    await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        colorScheme: colorScheme,
      },
      { runValidators: true }
    );
    res.sendStatus(204);
  })
);

router.post(
  "/register",
  wrapAsync(async function (req, res) {
    const { password, email, name } = req.body;
    const user = new User({ email, password, name });
    await user.save();
    req.session.userId = user._id;
    res.json(user);
  })
);

router.post(
  "/login",
  wrapAsync(async function (req, res) {
    const { password, email } = req.body;
    const user = await User.findAndValidate(email, password);
    if (user) {
      req.session.userId = user._id;
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  })
);

router.post(
  "/logout",
  wrapAsync(async function (req, res) {
    req.session.userId = null;
    res.sendStatus(204);
  })
);

module.exports = router;
