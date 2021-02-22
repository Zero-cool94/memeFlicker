const { check, validationResult } = require('express-validator')
const { User } = require('../db/models');
const cookieParser = require('cookie-parser');

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};
const validateLogin = [
  check('email')
  .exists({ checkFalsy: true})
  .withMessage('Please provide a value for Email Address.')
  .isEmail()
  .withMessage('Email Address is not a valid Email.'),
  check('password')
  .exists({ checkFalsy: true})
  .withMessage('Please provide a value for Password.'),
  handleValidationErrors,
];
const validateSignup = [
  check('email')
   .exists({ checkFalsy: true})
   .withMessage('Please provide a value for Email.')
   .isLength({ max: 60})
   .withMessage('Email can not be longer than 60 characters.')
   .isEmail()
   .withMessage('Please provide a valid Email.')
   .custom((value) => {
    return User.findOne({ where: { email: value } })
      .then((user) => {
        if (user) {
          return Promise.reject('The provided Email Address is already in use by another account.');
        }
      });
  }),
    check('username')
    .exists({ checkFalsy: true})
    .withMessage('Please provide a Username.')
    .isLength({ max: 20 })
    .withMessage('Username limit is 20 characters.')
    .custom((value) => {
      return User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Username is already in use by another account.');
          }
        });
    }),
  check("firstname")
    .exists({ checkFalsy: false })
    .isLength({ max: 20 })
    .withMessage("Please provide a name less then 20 characters.")
    .isLength({ min: 2 })
    .withMessage("Please provide a name more then 1 characters."),
  check("firstname").not().isEmail().withMessage("name cannot be an email."),
  check("lastname")
    .exists({ checkFalsy: false })
    .isLength({ max: 20 })
    .withMessage("Please provide a name less then 20 characters.")
    .isLength({ min: 2 })
    .withMessage("Please provide a name more then 1 characters."),
  check("lastname").not().isEmail().withMessage("name cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password.')
    .isLength({ max: 60 })
    .withMessage( 'Password can not be over 60 characters long.'),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup,
};
