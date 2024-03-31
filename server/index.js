const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors());

app.use(express.json());

app.use(authMiddleware);

app.use(routes);


app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/explore-Bulgaria');

mongoose.connection.on('connected', ()=> console.log('DB connected!'));
mongoose.connection.on('disconnected', ()=> console.log('DB disconnected!'));
mongoose.connection.on('error', (err)=> console.log(err));

const PORT = 3030;
app.listen(PORT, () => {

  console.log(`Server is listenning to http://localhost:${PORT}...`)
});
