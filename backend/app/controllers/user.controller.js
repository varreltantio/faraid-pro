const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const baseUrl = "http://localhost:8080/images/";

exports.register = async (req, res) => {
  try {
    const user = await User.create({
      Username: req.body.username,
      FullName: req.body.fullName,
      Email: req.body.email,
      Password: bcrypt.hashSync(req.body.password, 8),
      Photo: baseUrl + 'default.jpg',
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
        id: data.id,
        username: data.Username,
        fullName: data.FullName,
        email: data.Email,
        photo: data.Photo,
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

exports.updateProfile = async (req, res) => {
  const id = req.userId;

  const updateFields = {};

  if (req.body.fullName) {
    updateFields.FullName = req.body.fullName;
  }

  if (req.body.username) {
    updateFields.Username = req.body.username;
  }

  try {
    const user = await User.findOne({
      where: {
        Id: id
      }
    });

    let fileName = "";
    if (req.file == undefined) {
      fileName = user.Photo;
    } else {
      const pathname = new URL(user.Photo).pathname;
      const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);

      const directoryPath = baseDirectory + "/images/";
      const filePath = directoryPath + lastSegment;

      if (lastSegment !== 'default.jpg' && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      fileName = baseUrl + req.file.filename;
    }

    updateFields.Photo = fileName;

    const num = await User.update(updateFields, {
      where: { Id: id }
    });

    if (num == 1) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: "Error updating profile with id=" + id
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
