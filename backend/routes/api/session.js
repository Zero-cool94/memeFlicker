// backend/routes/api/session.js
const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { validateLogin } = require("../../utils/validation");
const { User } = require("../../db/models");

// const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Log in
router.post(
  "/",
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    console.log("==========",credential, "==============",password)
    const user = await User.login({ credential, password });
    if (!user) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

// router.post(
//   "/demo",
//   asyncHandler(async (req, res, next) => {
//     const user = await User.login({
//       credential: "demoUser",
//       password: "password",
//     });
//     await setTokenCookie(res, user);
//     return res.json({
//       user,
//     });
//   })
// );






// Log out route
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// Restore session user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

module.exports = router;
