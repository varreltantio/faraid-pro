const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const bcrypt = require("bcryptjs");

const initializeDatabase = async () => {
  try {
    await db.sequelize.sync();
    console.log("Synced db.");

    const [user, created] = await db.user.findOrCreate({
      where: { Email: "pakar@gmail.com" },
      defaults: {
        Password: bcrypt.hashSync("pakar123", 8),
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

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend application." });
});

require('./app/routes/user.routes')(app);
require("./app/routes/konsultasi.routes")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
