require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

// Manage HTTP requests
const serverErrorManager = require("./handlers/serverErrors");
const bodyParser = require("body-parser");
const httpHeaders = require("./config/httpHeaders");

// routes
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const movieRouter = require("./routes/movieRouter");
const theMovideDBRouter = require("./routes/theMovideDBRouter");

// HTTP requests setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(httpHeaders);
app.use(serverErrorManager);

// Routes
app.use("/api/auth/", authRouter);
app.use("/api/movies/", movieRouter);
app.use("/api/users/", userRouter);
app.use("/api/remote/", theMovideDBRouter);

// connect to db
mongoose
  .connect(process.env.MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(process.env.PORT, () => console.log("Server started."));
  })
  .catch((err) => console.log(err));
