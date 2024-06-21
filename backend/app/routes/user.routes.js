const { register, tokenJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

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
  app.get("/api/account/checkRole", [tokenJwt.checkToken], controller.checkRole);
};
