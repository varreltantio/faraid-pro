const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    Id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    Email: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [1],
          msg: 'Email must have a minimum length of 1 character.',
        },
      }
    },
    Password: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'Password must have a minimum length of 6 character.',
        },
      },
    },
    Role: {
      type: Sequelize.ENUM('pakar', 'user')
    },
  }, {
    tableName: 'User',
    timestamps: false
  });

  return User;
};