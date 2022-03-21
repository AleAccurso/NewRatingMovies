require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const serverErrorManager = require("./handlers/serverErrors");

// routes
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const movieRouter = require("./routes/movieRouter");
const theMovideDBRouter = require("./routes/theMovideDBRouter");
const httpHeaders = require("./config/httpHeaders");

// HTTP requests setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(httpHeaders);

// Routes
app.use("/api/auth/", authRouter);
app.use("/api/movies/", movieRouter);
app.use("/api/users/", userRouter);
app.use("/api/remote/", theMovideDBRouter);

//<---------></--------->
//Other Errors
app.use(serverErrorManager);

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
