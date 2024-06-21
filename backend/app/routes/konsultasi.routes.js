module.exports = app => {
  const { tokenJwt } = require("../middleware/index.js");
  const konsultasi = require("../controllers/konsultasi.controller.js");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  router.get("/", [tokenJwt.checkToken], konsultasi.findAllKonsultasi);
  router.get("/detail", [tokenJwt.checkToken], konsultasi.findDetailKonsultasi);
  router.post("/tambah", [tokenJwt.checkToken], konsultasi.tambahPertanyaan);
  router.put("/jawab/:id", [tokenJwt.checkToken], konsultasi.jawabPertanyaan);
  router.get("/count-unanswered", [tokenJwt.checkToken], konsultasi.getUnansweredCount);
  router.get("/answered-notifications", [tokenJwt.checkToken], konsultasi.getAnsweredNotifications);

  app.use('/api/konsultasi', router);
};