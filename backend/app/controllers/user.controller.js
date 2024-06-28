const db = require("../models");  // Mengimpor model dari file models
const config = require("../config/auth.config");  // Mengimpor konfigurasi auth dari file config
const User = db.user;  // Menggunakan model user dari database

const jwt = require("jsonwebtoken");  // Mengimpor library JWT untuk autentikasi
const bcrypt = require("bcryptjs");  // Mengimpor library bcrypt untuk hashing password
const fs = require("fs");  // Mengimpor library fs untuk operasi file

const baseUrl = "http://localhost:8080/images/";  // Untuk lokasi gambar

exports.register = async (req, res) => {
  try {
    // Membuat pengguna baru dengan menggunakan data yang diterima dari body request
    const user = await User.create({
      Username: req.body.username,
      FullName: req.body.fullName,
      Email: req.body.email,
      Password: bcrypt.hashSync(req.body.password, 8), // Meng-hash password sebelum disimpan
      Photo: baseUrl + 'default.jpg', // Menyertakan URL default untuk foto profil
      Role: "user" // Mengatur peran pengguna sebagai "user"
    });

    // Membuat token JWT untuk autentikasi pengguna yang baru terdaftar
    const token = jwt.sign({ id: user.Id, role: user.Role },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // Token berlaku selama 24 jam (dalam detik)
      });

    // Mengirimkan token JWT sebagai respons jika registrasi berhasil
    res.status(200).send({
      token: token
    });
  } catch (err) {
    // Mengirimkan pesan error jika terjadi kesalahan dalam proses registrasi
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    // Mencari pengguna berdasarkan alamat email yang diinputkan
    const user = await User.findOne({
      where: {
        Email: req.body.email
      }
    });

    // Jika pengguna tidak ditemukan, kirimkan respons dengan pesan "User Not found."
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Memeriksa validitas password yang diinputkan dengan password yang tersimpan di database
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.Password
    );

    // Jika password tidak valid, kirimkan respons dengan accessToken null dan pesan "Invalid Password!"
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    // Membuat token JWT untuk autentikasi pengguna yang berhasil login
    const token = jwt.sign({ id: user.Id, role: user.Role },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // Token berlaku selama 24 jam (dalam detik)
      });

    // Mengirimkan token JWT sebagai respons jika login berhasil
    res.status(200).send({
      token: token
    });
  } catch (err) {
    // Mengirimkan pesan error jika terjadi kesalahan dalam proses login
    res.status(500).send({ message: err.message });
  }
};

exports.logout = (req, res) => {
  // Mengirimkan respons dengan status 200 yang menandakan logout berhasil
  res.status(200).send({
    status: null, // Menghapus status session jika ada
    message: "Logged out" // Pesan yang menandakan pengguna berhasil logout
  });
};

exports.profile = async (req, res) => {
  const id = req.userId; // Mendapatkan ID pengguna dari permintaan (request)

  try {
    const data = await User.findByPk(id); // Mengambil data pengguna berdasarkan ID

    if (data) {
      // Jika data ditemukan, kirim respons dengan detail profil pengguna
      res.send({
        id: data.id,
        username: data.Username,
        fullName: data.FullName,
        email: data.Email,
        photo: data.Photo,
      });
    } else {
      // Jika data tidak ditemukan, kirim respons dengan status 404 (Not Found)
      res.status(404).send();
    }
  } catch (err) {
    // Jika terjadi kesalahan dalam pengambilan data, kirim respons dengan status 500 (Internal Server Error)
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  }
};

exports.updateProfile = async (req, res) => {
  const id = req.userId; // Mendapatkan ID pengguna dari permintaan (request)

  const updateFields = {}; // Objek untuk menyimpan bidang yang akan diperbarui

  // Memeriksa dan menyiapkan data yang akan diperbarui
  if (req.body.fullName) {
    updateFields.FullName = req.body.fullName; // Mengupdate nama lengkap jika tersedia dalam permintaan
  }

  if (req.body.username) {
    updateFields.Username = req.body.username; // Mengupdate username jika tersedia dalam permintaan
  }

  try {
    // Mengambil data pengguna berdasarkan ID
    const user = await User.findOne({
      where: {
        Id: id
      }
    });

    let fileName = ""; // Variabel untuk menyimpan nama file foto profil

    // Memproses foto profil jika diunggah dalam permintaan
    if (req.file == undefined) {
      fileName = user.Photo; // Menggunakan foto profil yang ada jika tidak ada file yang diunggah
    } else {
      // Mendapatkan nama file terakhir dari URL foto profil yang ada
      const pathname = new URL(user.Photo).pathname;
      const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);

      // Mendefinisikan direktori dan path file yang akan dihapus jika bukan foto profil default
      const directoryPath = baseDirectory + "/images/";
      const filePath = directoryPath + lastSegment;

      // Menghapus file foto profil yang lama jika bukan foto profil default
      if (lastSegment !== 'default.jpg' && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      fileName = baseUrl + req.file.filename; // Mendapatkan URL baru untuk foto profil yang diunggah
    }

    updateFields.Photo = fileName; // Menyimpan URL foto profil yang akan diupdate

    // Melakukan update data pengguna dengan bidang yang sudah disiapkan
    const num = await User.update(updateFields, {
      where: { Id: id }
    });

    // Memberikan respons berdasarkan hasil dari proses update
    if (num == 1) {
      res.status(200).send(); // Memberikan status 200 jika update berhasil
    } else {
      res.status(400).send(); // Memberikan status 400 jika update gagal
    }
  } catch (err) {
    // Cek apakah file gambar lebih besar dari 2mb
    if (err.code == "LIMIT_FILE_SIZE") {
      // Kirim pesan error dengan status 500
      return res.status(500).send({
        message: "Ukuran file tidak boleh lebih besar dari 2MB!",
      });
    }

    // Kirim pesan error dengan status 500
    res.status(500).send({
      message: "Error updating profile with id=" + id
    });
  }
};

exports.checkRole = async (req, res) => {
  const id = req.userId; // Mendapatkan ID pengguna dari permintaan (request)

  try {
    // Mencari data pengguna berdasarkan ID
    const data = await User.findByPk(id);

    if (data) {
      // Mengirimkan respons berisi peran (role) pengguna
      res.send({
        role: data.Role
      });
    } else {
      res.status(404).send(); // Memberikan respons status 404 jika pengguna tidak ditemukan
    }
  } catch (err) {
    // Kirim pesan error dengan status 500
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  }
};
