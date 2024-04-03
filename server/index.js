const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();


app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Method', "GET", "PUT", "POST", "DELETE");
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

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
