const { register, tokenJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const upload = require('../middleware/upload');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/account/register", [register.checkDuplicateEmail], controller.register);
  app.post("/api/account/login", controller.login);
  app.post("/api/account/logout", [tokenJwt.checkToken], controller.logout);
  app.get("/api/account/profile", [tokenJwt.checkToken], controller.profile);
  app.post("/api/account/profile", [tokenJwt.checkToken, upload], controller.updateProfile);
  app.get("/api/account/checkRole", [tokenJwt.checkToken], controller.checkRole);
};
