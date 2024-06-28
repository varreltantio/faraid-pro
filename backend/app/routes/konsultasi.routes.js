module.exports = app => {
  const { tokenJwt } = require("../middleware/index.js"); // Mengimpor middleware tokenJwt untuk otentikasi token JWT
  const konsultasi = require("../controllers/konsultasi.controller.js"); // Mengimpor controller konsultasi

  // Middleware untuk menambahkan header Access-Control-Allow-Headers
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router(); // Menggunakan Express Router untuk menangani rute-rute

  // Rute untuk mendapatkan daftar konsultasi yang belum terjawab, memerlukan token JWT untuk otentikasi
  router.get("/", [tokenJwt.checkToken], konsultasi.findKonsultasiUnanswered);

  // Rute untuk mendapatkan daftar konsultasi yang sudah terjawab
  router.get("/answered", konsultasi.findKonsultasiAnswered);

  // Rute untuk menambahkan pertanyaan baru, memerlukan token JWT untuk otentikasi
  router.post("/tambah", [tokenJwt.checkToken], konsultasi.tambahPertanyaan);

  // Rute untuk menjawab pertanyaan, memerlukan token JWT untuk otentikasi
  router.put("/jawab/:id", [tokenJwt.checkToken], konsultasi.jawabPertanyaan);

  // Rute untuk mendapatkan notifikasi pertanyaan yang belum terjawab, memerlukan token JWT untuk otentikasi
  router.get("/unanswered-notifications", [tokenJwt.checkToken], konsultasi.getUnansweredNotifications);

  // Rute untuk mendapatkan notifikasi pertanyaan yang sudah terjawab, memerlukan token JWT untuk otentikasi
  router.get("/answered-notifications", [tokenJwt.checkToken], konsultasi.getAnsweredNotifications);

  // Rute untuk memperbarui status notifikasi user, memerlukan token JWT untuk otentikasi
  router.put("/update-notifications-user/:id", [tokenJwt.checkToken], konsultasi.updateNotificationUser);

  // Rute untuk memperbarui status notifikasi pakar, memerlukan token JWT untuk otentikasi
  router.put("/update-notifications-pakar/:id", [tokenJwt.checkToken], konsultasi.updateNotificationPakar);

  // Menggunakan rute-rute yang telah ditentukan dengan awalan '/api/konsultasi'
  app.use('/api/konsultasi', router);
};