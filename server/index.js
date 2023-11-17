require("dotenv").config();
const express = require("express");
const router = require("./routes/authRoutes");
const connectDB = require("./utils/db");

const app = express();
app.use(express.json());
app.use("/api/auth", router);

// ? HEALTH CHECK
app.get("/ok", (_, res) => {
  res.status(200).send("ok");
});

const PORT = 4545;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
