const util = require("util");
const multer = require("multer");

// Batasan ukuran file yang diizinkan (2MB)
const maxSize = 2 * 1024 * 1024;

// Konfigurasi penyimpanan untuk multer
let storage = multer.diskStorage({
  // Menentukan direktori penyimpanan file yang diunggah
  destination: (req, file, cb) => {
    cb(null, baseDirectory + "/images/");
  },
  // Menentukan nama file yang diunggah (dalam hal ini berdasarkan timestamp)
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const name = file.originalname;
    const format = name.split('.').pop(); // Mendapatkan ekstensi file

    // Menghasilkan nama baru untuk file yang diunggah
    const newName = `${timestamp}.${format}`;
    cb(null, newName);
  },
});

// Menginisialisasi multer dengan konfigurasi penyimpanan dan batasan ukuran file
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize }, // Menentukan batasan ukuran file
}).single("photo"); // Menentukan nama field pada form untuk file yang diunggah

// Mengonversi fungsi uploadFile menjadi promise dengan menggunakan util.promisify
const upload = util.promisify(uploadFile);

// Mengekspor fungsi upload agar dapat digunakan di tempat lain dalam aplikasi
module.exports = upload;
