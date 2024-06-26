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

  router.get("/", [tokenJwt.checkToken], konsultasi.findKonsultasiUnanswered);
  router.get("/answered", konsultasi.findKonsultasiAnswered);
  router.post("/tambah", [tokenJwt.checkToken], konsultasi.tambahPertanyaan);
  router.put("/jawab/:id", [tokenJwt.checkToken], konsultasi.jawabPertanyaan);
  router.get("/unanswered-notifications", [tokenJwt.checkToken], konsultasi.getUnansweredNotifications);
  router.get("/answered-notifications", [tokenJwt.checkToken], konsultasi.getAnsweredNotifications);

  app.use('/api/konsultasi', router);
};