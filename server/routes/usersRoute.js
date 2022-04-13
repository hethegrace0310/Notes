const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

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
