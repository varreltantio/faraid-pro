const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  // Konfigurasi pool koneksi database
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize; // Menyimpan instance Sequelize
db.sequelize = sequelize; // Menyimpan instance koneksi Sequelize

// Mengimpor model-model yang diperlukan
db.user = require("./user.model.js")(sequelize, Sequelize); // Mengimpor model User
db.konsultasi = require("./konsultasi.model.js")(sequelize, Sequelize); // Mengimpor model Konsultasi

// Definisi relasi antara model User dan Konsultasi
db.user.hasMany(db.konsultasi, { as: "konsultasi" }); // Satu User dapat memiliki banyak Konsultasi
db.konsultasi.belongsTo(db.user, { foreignKey: "userId", as: "user" }); // Konsultasi dimiliki oleh User (sebagai pengguna yang bertanya)
db.konsultasi.belongsTo(db.user, { foreignKey: "pakarId", as: "pakar" }); // Konsultasi juga dimiliki oleh User (sebagai pakar yang menjawab)

module.exports = db; // Mengekspor objek db yang berisi instance Sequelize dan model-model yang sudah didefinisikan