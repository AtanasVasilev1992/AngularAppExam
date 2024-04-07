const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { PORT } = require("./config");

const routes = require("./routes");
const { authMiddleware } = require("./middlewares/authMiddleware");

const app = express();
const cors = require("cors");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(authMiddleware);
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json())

app.use(routes);

mongoose.connect("mongodb://localhost:27017/explore-Bulgaria");

mongoose.connection.on("connected", () => console.log("DB connected!"));
mongoose.connection.on("disconnected", () => console.log("DB disconnected!"));
mongoose.connection.on("error", (err) => console.log(err));

app.listen(PORT, () =>
  console.log(`App is listenning on http://localhost:${PORT}`)
);
