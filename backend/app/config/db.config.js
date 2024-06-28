module.exports = {
  HOST: "localhost", // Lokasi host database
  USER: "root", // Nama pengguna database
  PASSWORD: "", // Kata sandi pengguna database
  DB: "faraidpro", // Nama database yang digunakan
  dialect: "mysql", // Jenis database yang digunakan (MySQL)
  timezone: "+07:00", // Zona waktu yang digunakan (+07:00 untuk Waktu Indonesia Barat)
  pool: {
    max: 5, // Jumlah maksimum koneksi dalam pool
    min: 0, // Jumlah minimum koneksi dalam pool
    acquire: 30000, // Waktu maksimum (dalam milidetik) untuk mendapatkan koneksi dari pool
    idle: 10000 // Waktu maksimum (dalam milidetik) koneksi dapat tetap tidak aktif dalam pool
  }
};