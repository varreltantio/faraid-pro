const db = require("../models");
const Konsultasi = db.konsultasi;

exports.findAllKonsultasi = async (req, res) => {
  try {
    const data = await Konsultasi.findAll({
      where: { status: "Belum Terjawab" }
    });

    const konsultasi = data.map(konsul => ({
      id: konsul.Id,
      pertanyaan: konsul.Pertanyaan,
      jawaban: konsul.Jawaban,
    }));

    res.send(konsultasi);
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: "Error retrieving konsultasi data",
    });
  }
};

exports.findDetailKonsultasi = async (req, res) => {
  try {
    const data = await Konsultasi.findAll({
      where: { userId: req.userId }
    });

    const konsultasi = data.map(konsul => ({
      id: konsul.Id,
      pertanyaan: konsul.Pertanyaan,
      jawaban: konsul.Jawaban,
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

exports.getUnansweredCount = async (req, res) => {
  try {
    const count = await Konsultasi.count({
      where: { Status: "Belum Terjawab" }
    });

    res.send({ count });
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: "Error retrieving unanswered questions count",
    });
  }
};

exports.getAnsweredNotifications = async (req, res) => {
  try {
    const data = await Konsultasi.findAll({
      where: {
        userId: req.userId,
        Status: "Terjawab"
      }
    });

    const notifications = data.map(konsul => ({
      id: konsul.Id,
      pertanyaan: konsul.Pertanyaan,
      jawaban: konsul.Jawaban,
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