require("./routes/Users");
require("dotenv").config();
const userRoute = require("./routes/Users");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/users", userRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
