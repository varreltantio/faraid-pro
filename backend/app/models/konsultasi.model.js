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
    }
  }, {
    tableName: 'Konsultasi',
    timestamps: false
  });

  return Konsultasi;
};