const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      Email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    }

    next();
  });
};


const register = {
  checkDuplicateEmail: checkDuplicateEmail
};

module.exports = register;