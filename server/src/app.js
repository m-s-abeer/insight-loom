const express = require("express");
const routes = require("./routes/index");

const multer = require("multer");
const forms = multer();

const port = process.env.PORT || 5000;

const mongoURL =
  process.env.MONGO_URL || "mongodb://il-mongo:27017/insight-loom";

const mongoose = require("mongoose");

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to DB"))
  .catch((error) => {
    console.log("Error connecting to DB");
    console.log(error);
  });

const app = express();

app.use(express.json());
app.use(forms.array());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
