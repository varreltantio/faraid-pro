const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

// Middleware untuk memeriksa keberadaan dan validitas token JWT pada header Authorization
const checkToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  // Jika header Authorization tidak tersedia
  if (!bearerHeader) {
    return res.status(403).send({
      message: "Token tidak diberikan!"
    });
  }

  // Memisahkan token dari format "Bearer <token>"
  const tokenArray = bearerHeader.split(' ');
  const bearerToken = tokenArray[1];

  // Jika token tidak tersedia setelah dipisahkan
  if (!bearerToken) {
    return res.status(403).send({
      message: "Token tidak diberikan!"
    });
  }

  // Verifikasi token JWT menggunakan secret dari konfigurasi
  jwt.verify(bearerToken, config.secret, (err, decoded) => {
    if (err) {
      // Jika verifikasi gagal, kirim respons Unauthorized
      return res.status(401).send({
        message: "Tidak diizinkan!",
      });
    }
    // Jika verifikasi berhasil, tambahkan decoded id dan role ke dalam req untuk digunakan di handler selanjutnya
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

// Objek tokenJwt untuk mengekspor middleware checkToken
const tokenJwt = {
  checkToken: checkToken
};

// Mengekspor tokenJWT agar dapat digunakan di tempat lain dalam aplikasi
module.exports = tokenJwt;