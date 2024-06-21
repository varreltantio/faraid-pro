const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const checkToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  const tokenArray = bearerHeader.split(' ');
  const bearerToken = tokenArray[1];

  if (!bearerToken) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(bearerToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

const tokenJwt = {
  checkToken: checkToken
};

module.exports = tokenJwt;
