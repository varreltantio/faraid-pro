const { register, tokenJwt } = require("../middleware"); // Mengimpor middleware register dan tokenJwt
const controller = require("../controllers/user.controller"); // Mengimpor controller user
const upload = require('../middleware/upload'); // Mengimpor middleware upload

module.exports = function (app) {
  // Middleware untuk menambahkan header Access-Control-Allow-Headers
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // Rute untuk registrasi akun baru, memeriksa duplikasi email menggunakan middleware checkDuplicateEmail
  app.post("/api/account/register", [register.checkDuplicateEmail], controller.register);

  // Rute untuk login pengguna
  app.post("/api/account/login", controller.login);

  // Rute untuk logout pengguna, memerlukan token JWT untuk otentikasi
  app.post("/api/account/logout", [tokenJwt.checkToken], controller.logout);

  // Rute untuk mendapatkan profil pengguna, memerlukan token JWT untuk otentikasi
  app.get("/api/account/profile", [tokenJwt.checkToken], controller.profile);

  // Rute untuk memperbarui profil pengguna, memerlukan token JWT dan upload file foto profil
  app.post("/api/account/profile", [tokenJwt.checkToken, upload], controller.updateProfile);

  // Rute untuk memeriksa peran (role) pengguna berdasarkan token JWT
  app.get("/api/account/checkRole", [tokenJwt.checkToken], controller.checkRole);
};