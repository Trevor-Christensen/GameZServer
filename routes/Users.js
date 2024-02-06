const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register endpoint
router.post("/RegisterForm", async (req, res) => {
  const { User_username, User_email, User_password } = req.body;
  if (!User_username || !User_email || !User_password) {
    return res.status(400).send("Please enter the required fields");
  }

  const hashedPassword = bcrypt.hashSync(User_password, 10); // Increase the salt rounds

  const newUser = {
    User_username,
    User_email,
    User_password: hashedPassword,
  };

  try {
    await knex("users").insert(newUser);
    res.status(201).send("Registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed registration");
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { User_email, User_password } = req.body;

  if (!User_email || !User_password) {
    return res.status(400).send("Please enter the required fields");
  }

  try {
    const user = await knex("users").where({ User_email }).first(); // Fixed reference to User_email
    if (!user) {
      return res.status(400).send("Invalid email");
    }

    const isPasswordCorrect = bcrypt.compareSync(
      User_password,
      user.user_password
    );

    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.User_email }, // Fixed reference to User_email
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed");
  }
});

module.exports = router;
