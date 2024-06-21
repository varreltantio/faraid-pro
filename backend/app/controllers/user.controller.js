const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const user = await User.create({
      Email: req.body.email,
      Password: bcrypt.hashSync(req.body.password, 8),
      Role: "user"
    });

    const token = jwt.sign({ id: user.Id, role: user.Role },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      });

    res.status(200).send({
      token: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        Email: req.body.email
      }
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.Password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.Id, role: user.Role },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      });

    res.status(200).send({
      token: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.status(200).send({
    status: null,
    message: "Logged out"
  });
};

exports.profile = async (req, res) => {
  const id = req.userId;

  try {
    const data = await User.findByPk(id);

    if (data) {
      res.send({
        email: data.Email,
        id: data.id,
      });
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  }
};

exports.checkRole = async (req, res) => {
  const id = req.userId;

  try {
    const data = await User.findByPk(id);

    if (data) {
      res.send({
        role: data.Role
      });
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  }
};
