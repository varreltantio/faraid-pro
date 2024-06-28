module.exports = (sequelize, Sequelize) => {
  const Konsultasi = sequelize.define("konsultasi", {
    Id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Pertanyaan: {
      type: Sequelize.TEXT
    },
    Jawaban: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    Status: {
      type: Sequelize.ENUM('Terjawab', 'Belum Terjawab')
    },
    TanggalPertanyaan: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    TanggalJawaban: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    NotifikasiUser: {
      type: Sequelize.BOOLEAN
    },
    NotifikasiPakar: {
      type: Sequelize.BOOLEAN
    }
  }, {
    tableName: 'Konsultasi',
    timestamps: false
  });

  return Konsultasi;
};