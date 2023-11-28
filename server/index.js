require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/form", contactRoutes);

// ? HEALTH CHECK
app.get("/ok", (_, res) => {
  res.status(200).send("ok");
});

app.use(errorMiddleware);
const PORT = 4545;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
