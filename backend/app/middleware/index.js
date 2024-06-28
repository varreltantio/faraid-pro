const tokenJwt = require("./tokenJwt"); // Mengimpor modul tokenJwt untuk pengaturan JWT
const register = require("./register"); // Mengimpor modul register untuk registrasi pengguna

module.exports = {
  tokenJwt, // Ekspor modul tokenJwt untuk digunakan dalam konfigurasi autentikasi JWT
  register // Ekspor modul register untuk digunakan dalam proses registrasi pengguna
};