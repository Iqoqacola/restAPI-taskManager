require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user")

const cors = require('cors')
//Express APP
const app = express();

//Middleware
app.use(cors({ origin: true, credentials: true, methods: 'GET,PUT,POST,OPTIONS', allowedHeaders: 'Content-Type,Authorization' }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, ": ", req.method);
  next();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next();
})

//Routes
app.use("/api/task/", taskRoutes);
app.use("/api/user/", userRoutes)

//404 Page
app.use((req, res, next) => {
  res.status(400).send("404 NOT FOUND");
});

//Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //Listen for request
    app.listen(process.env.PORT, () => {
      console.log(`Conected to DB & Listening on port ${process.env.PORT} !!!`);
    });
  })
  .catch((err) => console.log(err));