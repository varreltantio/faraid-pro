const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const bcrypt = require("bcryptjs");
const path = require('path');

const initializeDatabase = async () => {
  try {
    await db.sequelize.sync();
    console.log("Synced db.");

    const [user, created] = await db.user.findOrCreate({
      where: { Email: "pakar@gmail.com" },
      defaults: {
        Username: "pakar",
        FullName: "pakar",
        Password: bcrypt.hashSync("pakar123", 8),
        Photo: 'http://localhost:8080/images/default.jpg',
        Role: "pakar",
      }
    });

    if (created) {
      console.log("User created successfully:", user.get());
    } else {
      console.log("User with the same email already exists:", user.get());
    }
  } catch (error) {
    console.error("Failed to create/find user:", error.message);
  }
};

initializeDatabase();

const app = express();

global.baseDirectory = __dirname;

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend application." });
});

const imageDirectoryPath = path.join(__dirname, '/images');
const baseUrl = '/images';

app.use(baseUrl, express.static(imageDirectoryPath));

require('./app/routes/user.routes')(app);
require("./app/routes/konsultasi.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
