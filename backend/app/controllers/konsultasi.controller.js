// Mengimpor model Konsultasi dari file "../models"
const db = require("../models");
const Konsultasi = db.konsultasi;

// Mengimpor objek Sequelize dari paket 'sequelize'
const { Sequelize } = require('sequelize');

// Menginisialisasi objek sequelize dengan koneksi database yang ada
const sequelize = db.sequelize;

// fungsi untuk mencari konsultasi yang belum terjawab
exports.findKonsultasiUnanswered = async (req, res) => {
  try {
    // Mengambil semua data konsultasi dengan status "Belum Terjawab"
    // dan memasukkan data user yang menanyakan pertanyaan tersebut sebagai relasi
    const data = await Konsultasi.findAll({
      where: { status: "Belum Terjawab" },
      include: [
        {
          model: db.user, // Menggunakan model user dari objek db
          as: "user",    // Alias untuk memuat user yang menjadi pembuat pertanyaan
          where: {
            id: { [db.Sequelize.Op.not]: null } // Menyaring user yang memiliki ID tidak null
          },
        }
      ]
    });

    // Mengubah hasil query ke bentuk yang diinginkan sebelum dikirimkan sebagai respons
    const konsultasi = data.map(konsul => ({
      id: konsul.Id,
      pertanyaan: konsul.Pertanyaan,
      jawaban: konsul.Jawaban,
      tanggalPertanyaan: konsul.TanggalPertanyaan,
      user: konsul.user // Memasukkan data user yang menanyakan pertanyaan
    }));

    // Mengirimkan respons dengan data konsultasi yang telah diformat
    res.send(konsultasi);
  } catch (err) {
    // Mengirimkan respons dengan status 500 dan pesan error jika terjadi kesalahan
    res.status(500).send({
      status: "Error",
      message: "Error retrieving konsultasi data",
    });
  }
};

// Fungsi untuk mencari konsultasi yang sudah terjawab
exports.findKonsultasiAnswered = async (req, res) => {
  try {
    // Mengambil semua data konsultasi dengan status "Terjawab"
    // dan memuat data user yang menanyakan pertanyaan serta pakar yang menjawab sebagai relasi
    const data = await Konsultasi.findAll({
      where: { status: "Terjawab" },
      include: [
        {
          model: db.user,   // Menggunakan model user dari objek db untuk user yang menanyakan pertanyaan
          as: "user",       // Alias untuk memuat user yang menjadi pembuat pertanyaan
          where: {
            id: { [db.Sequelize.Op.not]: null } // Menyaring user yang memiliki ID tidak null
          },
        },
        {
          model: db.user,   // Menggunakan model user dari objek db untuk pakar yang menjawab
          as: "pakar",      // Alias untuk memuat pakar yang menjawab pertanyaan
          where: {
            id: { [db.Sequelize.Op.not]: null } // Menyaring pakar yang memiliki ID tidak null
          },
        },
      ]
    });

    // Mengubah hasil query ke bentuk yang diinginkan sebelum dikirimkan sebagai respons
    const konsultasi = data.map(konsul => ({
      id: konsul.Id,
      pertanyaan: konsul.Pertanyaan,
      jawaban: konsul.Jawaban,
      tanggalPertanyaan: konsul.TanggalPertanyaan,
      tanggalJawaban: konsul.TanggalJawaban,
      user: konsul.user, // Memasukkan data user yang menanyakan pertanyaan
      pakar: konsul.pakar, // Memasukkan data pakar yang menjawab pertanyaan
    }));

    // Mengirimkan respons dengan data konsultasi yang telah diformat
    res.send(konsultasi);
  } catch (err) {
    // Mengirimkan respons dengan status 500 dan pesan error jika terjadi kesalahan
    res.status(500).send({
      status: "Error",
      message: "Error retrieving konsultasi data",
    });
  }
};

// Fungsi untuk menambahkan pertanyaan baru dalam konsultasi
exports.tambahPertanyaan = async (req, res) => {
  try {
    // Membuat objek konsultasi dengan data pertanyaan yang dikirimkan dari body request
    const konsultasi = {
      Pertanyaan: req.body.pertanyaan,  // Mengambil pertanyaan dari body request
      Status: "Belum Terjawab",         // Menandai status pertanyaan sebagai "Belum Terjawab"
      NotifikasiUser: 0,                // Inisialisasi notifikasi untuk user menjadi 0 (belum terbaca)
      NotifikasiPakar: 0,               // Inisialisasi notifikasi untuk pakar menjadi 0 (belum terbaca)
      userId: req.userId                // Menyimpan ID user yang membuat pertanyaan dari req.userId
    };

    // Menyimpan konsultasi baru ke dalam database menggunakan model Konsultasi, dengan opsi returning true untuk mengembalikan data yang disimpan
    const createdKonsultasi = await Konsultasi.create(konsultasi, { returning: true });

    // Mengirimkan respons dengan data konsultasi yang baru saja dibuat
    res.send(createdKonsultasi);
  } catch (err) {
    // Mengirimkan respons dengan status 500 dan pesan error jika terjadi kesalahan dalam proses pembuatan konsultasi
    res.status(500).send({
      status: "Error",
      message: "Error creating konsultasi."
    });
  }
};

// Fungsi untuk menjawab pertanyaan dalam konsultasi
exports.jawabPertanyaan = async (req, res) => {
  const id = req.params.id;             // Mengambil ID pertanyaan dari parameter request
  const jawaban = req.body.jawaban;     // Mengambil jawaban dari body request
  const waktuSekarang = await sequelize.query("SELECT NOW()", { type: Sequelize.QueryTypes.SELECT });
  const formattedWaktuSekarang = waktuSekarang[0]['NOW()'];  // Mengambil waktu sekarang dari database

  try {
    const konsultasi = await Konsultasi.findByPk(id);  // Mencari konsultasi berdasarkan ID

    if (!konsultasi) {  // Jika konsultasi tidak ditemukan
      return res.status(404).send({
        status: "Error",
        message: `Konsultasi dengan ID ${id} tidak ditemukan.`
      });
    }

    // Menyimpan jawaban ke dalam objek konsultasi
    konsultasi.Jawaban = jawaban;                  // Menyimpan jawaban yang diambil dari body request
    konsultasi.Status = "Terjawab";                // Menandai status konsultasi sebagai "Terjawab"
    konsultasi.TanggalJawaban = formattedWaktuSekarang;  // Menyimpan waktu jawaban
    konsultasi.pakarId = req.userId;               // Menyimpan ID pakar yang menjawab pertanyaan
    await konsultasi.save();                       // Menyimpan perubahan ke database

    // Mengirimkan respons dengan status sukses dan data konsultasi yang sudah dijawab
    res.send({
      status: "Success",
      message: `Pertanyaan dengan ID ${id} berhasil dijawab.`,
      data: konsultasi
    });
  } catch (err) {
    // Mengirimkan respons dengan status 500 dan pesan error jika terjadi kesalahan dalam proses menjawab pertanyaan
    res.status(500).send({
      status: "Error",
      message: `Error saat menjawab pertanyaan dengan ID ${id}.`
    });
  }
};

// Fungsi untuk mendapatkan notifikasi konsultasi yang belum terjawab
exports.getUnansweredNotifications = async (req, res) => {
  try {
    // Mengambil data konsultasi dengan status belum terjawab, diurutkan berdasarkan tanggal pertanyaan secara descending
    // Serta menyertakan data pengguna yang mengajukan pertanyaan tersebut
    const data = await Konsultasi.findAll({
      where: {
        Status: "Belum Terjawab"  // Filter konsultasi dengan status "Belum Terjawab"
      },
      order: [['TanggalPertanyaan', 'DESC']],  // Urutkan berdasarkan tanggal pertanyaan dari yang terbaru
      include: [
        {
          model: db.user,  // Mengambil model user dari database
          as: "user",      // Aliasan untuk model user
          where: {
            id: { [db.Sequelize.Op.not]: null }  // Filter untuk memastikan ID pengguna tidak null
          },
        }
      ]
    });

    // Mapping data konsultasi yang belum terjawab ke dalam format notifikasi yang diinginkan
    const notifications = data.map(konsul => ({
      id: konsul.Id,                          // ID konsultasi
      tanggalPertanyaan: konsul.TanggalPertanyaan,  // Tanggal pertanyaan
      notifikasiPakar: konsul.NotifikasiPakar,  // Status notifikasi pakar
      message: `Pertanyaan dari "${konsul.user.FullName}" belum terjawab.`  // Pesan notifikasi
    }));

    // Mengirimkan respons dengan data notifikasi yang berhasil diambil
    res.send({ notifications });
  } catch (err) {
    // Mengirimkan respons dengan status 500 dan pesan error jika terjadi kesalahan saat mengambil notifikasi
    res.status(500).send({
      status: "Error",
      message: "Error retrieving unanswered notifications",
    });
  }
};

// Fungsi untuk mendapatkan notifikasi konsultasi yang sudah terjawab
exports.getAnsweredNotifications = async (req, res) => {
  try {
    // Mengambil data konsultasi yang sudah terjawab untuk pengguna dengan ID yang sesuai
    const data = await Konsultasi.findAll({
      where: {
        userId: req.userId,  // Filter berdasarkan ID pengguna yang mengakses
        Status: "Terjawab"   // Filter konsultasi dengan status "Terjawab"
      },
      order: [['TanggalJawaban', 'DESC']]  // Mengurutkan hasil berdasarkan tanggal jawaban dari yang terbaru
    });

    // Mapping data konsultasi yang sudah terjawab ke dalam format notifikasi yang diinginkan
    const notifications = data.map(konsul => ({
      id: konsul.Id,                            // ID konsultasi
      tanggalJawaban: konsul.TanggalJawaban,    // Tanggal jawaban
      notifikasiUser: konsul.NotifikasiUser,    // Status notifikasi pengguna
      message: `Pertanyaan Anda "${konsul.Pertanyaan}" telah dijawab.`  // Pesan notifikasi
    }));

    // Mengirimkan respons dengan data notifikasi yang berhasil diambil
    res.send({ notifications });
  } catch (err) {
    // Mengirimkan respons dengan status 500 dan pesan error jika terjadi kesalahan saat mengambil notifikasi
    res.status(500).send({
      status: "Error",
      message: "Error retrieving answered notifications",
    });
  }
};

// Fungsi untuk memperbarui notifikasi pengguna dalam konsultasi
exports.updateNotificationUser = async (req, res) => {
  const id = req.params.id;  // Mendapatkan ID konsultasi dari parameter permintaan

  try {
    const konsultasi = await Konsultasi.findByPk(id);  // Mencari konsultasi berdasarkan ID

    if (!konsultasi) {
      // Jika konsultasi tidak ditemukan, kirim respons dengan status 404
      return res.status(404).send({
        status: "Error",
        message: `Konsultasi dengan ID ${id} tidak ditemukan.`
      });
    }

    // Mengubah status notifikasi pengguna menjadi 1 (telah diperbarui)
    konsultasi.NotifikasiUser = 1;
    await konsultasi.save();  // Menyimpan perubahan ke dalam database

    // Mengirim respons sukses dengan data konsultasi yang telah diperbarui
    res.send({
      status: "Success",
      message: `Notifikasi konsultasi ${id} berhasil diperbarui.`,
      data: konsultasi
    });
  } catch (err) {
    // Jika terjadi kesalahan saat memperbarui notifikasi, kirim respons dengan status 500
    res.status(500).send({
      status: "Error",
      message: `Error saat memperbarui notifikasi dengan ID ${id}.`
    });
  }
};

// Fungsi untuk memperbarui notifikasi pakar dalam konsultasi
exports.updateNotificationPakar = async (req, res) => {
  const id = req.params.id;  // Mendapatkan ID konsultasi dari parameter permintaan

  try {
    const konsultasi = await Konsultasi.findByPk(id);  // Mencari konsultasi berdasarkan ID

    if (!konsultasi) {
      // Jika konsultasi tidak ditemukan, kirim respons dengan status 404
      return res.status(404).send({
        status: "Error",
        message: `Konsultasi dengan ID ${id} tidak ditemukan.`
      });
    }

    // Mengubah status notifikasi pakar menjadi 1 (telah diperbarui)
    konsultasi.NotifikasiPakar = 1;
    await konsultasi.save();  // Menyimpan perubahan ke dalam database

    // Mengirim respons sukses dengan data konsultasi yang telah diperbarui
    res.send({
      status: "Success",
      message: `Notifikasi konsultasi ${id} berhasil diperbarui.`,
      data: konsultasi
    });
  } catch (err) {
    // Jika terjadi kesalahan saat memperbarui notifikasi, kirim respons dengan status 500
    res.status(500).send({
      status: "Error",
      message: `Error saat memperbarui notifikasi dengan ID ${id}.`
    });
  }
};