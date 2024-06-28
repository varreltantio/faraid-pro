const express = require("express"); // Mengimpor framework Express.js
const cors = require("cors"); // Mengimpor middleware CORS untuk mengizinkan akses lintas domain
const db = require("./app/models"); // Mengimpor konfigurasi database Sequelize
const bcrypt = require("bcryptjs"); // Mengimpor modul bcrypt untuk hashing password
const path = require('path'); // Mengimpor modul path untuk penanganan path file

const initializeDatabase = async () => {
  try {
    await db.sequelize.sync(); // Sinkronisasi model-model Sequelize dengan database
    console.log("Synced db."); // Pesan log jika sinkronisasi berhasil

    const [user, created] = await db.user.findOrCreate({
      where: { Email: "pakar@gmail.com" }, // Email pengguna
      defaults: {
        Username: "pakar", // Nama pengguna
        FullName: "pakar", // Nama lengkap pengguna
        Password: bcrypt.hashSync("pakar123", 8), // Hashed password menggunakan bcrypt
        Photo: 'http://localhost:8080/images/default.jpg', // URL foto profil default
        Role: "pakar", // Peran atau role pengguna
      }
    });

    if (created) {
      console.log("User created successfully:", user.get()); // Pesan log jika pengguna baru berhasil dibuat
    } else {
      console.log("User with the same email already exists:", user.get()); // Pesan log jika pengguna dengan email yang sama sudah ada
    }
  } catch (error) {
    console.error("Failed to create/find user:", error.message); // Pesan log jika terjadi kesalahan saat menciptakan atau mencari pengguna
  }
};

initializeDatabase(); // Memanggil fungsi untuk menginisialisasi database

const app = express(); // Membuat aplikasi Express baru

global.baseDirectory = __dirname; // Menetapkan direktori aplikasi

const corsOptions = {
  origin: "http://localhost:3000" // Mengizinkan akses dari origin tertentu (frontend pada localhost:3000)
};

app.use(cors(corsOptions)); // Menggunakan middleware CORS dengan opsi yang ditetapkan

app.use(express.json()); // Middleware untuk parsing request body berformat JSON
app.use(express.urlencoded({ extended: true })); // Middleware untuk parsing request body berformat URL-encoded

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend application." }); // Route untuk penanganan permintaan pada path root ('/')
});

const imageDirectoryPath = path.join(__dirname, '/images'); // Menetapkan path ke direktori tempat gambar user profile disimpan
const baseUrl = '/images'; // Base URL untuk akses ke gambar user profile

app.use(baseUrl, express.static(imageDirectoryPath)); // Menyediakan akses static untuk gambar melalui URL /images

require('./app/routes/user.routes')(app); // Mengimpor dan menggunakan rute dari user.routes.js
require("./app/routes/konsultasi.routes")(app); // Mengimpor dan menggunakan rute dari konsultasi.routes.js

const PORT = process.env.PORT || 8080; // Menetapkan port server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`); // Pesan log saat server berhasil berjalan di port yang ditetapkan
});