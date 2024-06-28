const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  // Mendefinisikan model User dengan Sequelize
  const User = sequelize.define("user", {
    Id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    Username: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [1],
          msg: 'Username harus memiliki panjang minimal 1 karakter.',
        },
      }
    },
    FullName: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [1],
          msg: 'Nama lengkap harus memiliki panjang minimal 1 karakter.',
        },
      }
    },
    Email: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [1],
          msg: 'Email harus memiliki panjang minimal 1 karakter.',
        },
      }
    },
    Password: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'Password harus memiliki panjang minimal 6 karakter.',
        },
      },
    },
    Photo: {
      type: Sequelize.STRING
    },
    Role: {
      type: Sequelize.ENUM('pakar', 'user')  // Role hanya boleh 'pakar' atau 'user'
    },
  }, {
    tableName: 'User',    // Nama tabel yang digunakan di database
    timestamps: false     // Tidak menggunakan kolom createdAt dan updatedAt
  });

  return User;
};