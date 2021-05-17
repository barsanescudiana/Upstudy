const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const verify = require('./middleware/verifyToken')
const passport = require('passport')
require('dotenv').config()

const routes = require('./routes')

const app = express()
const server = require('http').createServer(app)
const port = 8080

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(cors({ credentials: true }, "http://localhost:3000"));

app.use('/api', routes)
app.get("/", (req, res) => res.send({ message: "Server is running" }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header("origin"));
  next();
});

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once("open", () => {
    console.log("MongoDB connected!")
})

app.get("/session/", verify, (req, res) => {
  if (req.token) {
    res.status(200).send({ user: req.user });
  } else {
    res.status(200).send({ message: "No valid session" });
  }
})

server.listen(port, () => {
  console.log(`Server is running on ` + port);
})