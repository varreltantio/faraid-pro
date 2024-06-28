const db = require("../models");
const User = db.user;

// Middleware untuk memeriksa apakah email yang diinputkan sudah terdaftar pada pengguna lain
checkDuplicateEmail = (req, res, next) => {
  // Cari data user berdasarkan input email dari request body
  User.findOne({
    where: {
      Email: req.body.email
    }
  }).then(user => {
    if (user) {
      // Jika email sudah terdaftar, kirim respons dengan status 400
      res.status(400).send({
        message: "Gagal! Email sudah digunakan!"
      });
      return;
    }

    // Lanjutkan ke middleware berikutnya jika email belum terdaftar
    next();
  });
};

// Objek register untuk mengekspor middleware checkDuplicateEmail
const register = {
  checkDuplicateEmail: checkDuplicateEmail
};

// Mengekspor register agar dapat digunakan di tempat lain dalam aplikasi
module.exports = register;