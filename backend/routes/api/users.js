// backend/routes/api/users.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { validateSignup } = require("../../utils/validation");
const { User } = require("../../db/models");


// Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, firstname, lastname} = req.body;
    const user = await User.signup({ email, username, password, firstname, lastname });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
