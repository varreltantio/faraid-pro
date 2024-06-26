const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
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
          msg: 'Username must have a minimum length of 1 character.',
        },
      }
    },
    FullName: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [1],
          msg: 'Full name must have a minimum length of 1 character.',
        },
      }
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
    Photo: {
      type: Sequelize.STRING
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