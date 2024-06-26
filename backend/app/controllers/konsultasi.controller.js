const db = require("../models");
const Konsultasi = db.konsultasi;
const { Sequelize } = require('sequelize');

const sequelize = db.sequelize;

exports.findKonsultasiUnanswered = async (req, res) => {
  try {
    const data = await Konsultasi.findAll({
      where: { status: "Belum Terjawab" },
      include: [
        {
          model: db.user,
          as: "user",
          where: {
            id: { [db.Sequelize.Op.not]: null }
          },
        }
      ]
    });

    const konsultasi = data.map(konsul => ({
      id: konsul.Id,
      pertanyaan: konsul.Pertanyaan,
      jawaban: konsul.Jawaban,
      tanggalPertanyaan: konsul.TanggalPertanyaan,
      user: konsul.user
    }));

    res.send(konsultasi);
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: "Error retrieving konsultasi data",
    });
  }
};

exports.findKonsultasiAnswered = async (req, res) => {
  try {
    const data = await Konsultasi.findAll({
      where: { status: "Terjawab" },
      include: [
        {
          model: db.user,
          as: "user",
          where: {
            id: { [db.Sequelize.Op.not]: null }
          },
        },
        {
          model: db.user,
          as: "pakar",
          where: {
            id: { [db.Sequelize.Op.not]: null }
          },
        },
      ]
    });

    const konsultasi = data.map(konsul => ({
      id: konsul.Id,
      pertanyaan: konsul.Pertanyaan,
      jawaban: konsul.Jawaban,
      tanggalPertanyaan: konsul.TanggalPertanyaan,
      tanggalJawaban: konsul.TanggalJawaban,
      user: konsul.user,
      pakar: konsul.pakar,
    }));

    res.send(konsultasi);
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: "Error retrieving konsultasi data",
    });
  }
};

exports.tambahPertanyaan = async (req, res) => {
  try {
    const konsultasi = {
      Pertanyaan: req.body.pertanyaan,
      Status: "Belum Terjawab",
      userId: req.userId
    };

    const createdKonsultasi = await Konsultasi.create(konsultasi, { returning: true });

    res.send(createdKonsultasi);
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: "Error creating konsultasi."
    });
  }
};

exports.jawabPertanyaan = async (req, res) => {
  const id = req.params.id;
  const jawaban = req.body.jawaban;
  const waktuSekarang = await sequelize.query("SELECT NOW()", { type: Sequelize.QueryTypes.SELECT });
  const formattedWaktuSekarang = waktuSekarang[0]['NOW()'];

  try {
    const konsultasi = await Konsultasi.findByPk(id);

    if (!konsultasi) {
      return res.status(404).send({
        status: "Error",
        message: `Konsultasi dengan ID ${id} tidak ditemukan.`
      });
    }

    konsultasi.Jawaban = jawaban;
    konsultasi.Status = "Terjawab";
    konsultasi.TanggalJawaban = formattedWaktuSekarang;
    konsultasi.pakarId = req.userId;
    await konsultasi.save();

    res.send({
      status: "Success",
      message: `Pertanyaan dengan ID ${id} berhasil dijawab.`,
      data: konsultasi
    });
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: `Error saat menjawab pertanyaan dengan ID ${id}.`
    });
  }
};

exports.getUnansweredNotifications = async (req, res) => {
  try {
    const data = await Konsultasi.findAll({
      where: {
        Status: "Belum Terjawab"
      },
      order: [['TanggalPertanyaan', 'DESC']],
      include: [
        {
          model: db.user,
          as: "user",
          where: {
            id: { [db.Sequelize.Op.not]: null }
          },
        }
      ]
    });

    const notifications = data.map(konsul => ({
      id: konsul.Id,
      pertanyaan: konsul.Pertanyaan,
      tanggalPertanyaan: konsul.TanggalPertanyaan,
      user: konsul.user,
    }));

    res.send({ notifications });
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: "Error retrieving unanswered notifications",
    });
  }
};

exports.getAnsweredNotifications = async (req, res) => {
  try {
    const data = await Konsultasi.findAll({
      where: {
        userId: req.userId,
        Status: "Terjawab"
      },
      order: [['TanggalJawaban', 'DESC']]
    });

    const notifications = data.map(konsul => ({
      id: konsul.Id,
      pertanyaan: konsul.Pertanyaan,
      jawaban: konsul.Jawaban,
      tanggalJawaban: konsul.TanggalJawaban,
      message: `Pertanyaan Anda "${konsul.Pertanyaan}" telah dijawab.`
    }));

    res.send({ notifications });
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: "Error retrieving answered notifications",
    });
  }
};