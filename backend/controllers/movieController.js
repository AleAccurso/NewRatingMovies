require("dotenv").config();

const movieModel = require("../models/movieModel");

const { exec } = require("child_process");
const { Console } = require("console");

//get all movies
exports.getAllMovies = async (req, res, next) => {
  const movies = movieModel.find({}, (err, movies) => {
    if (err) {
      console.log("RETRIEVE error: " + err);
      res.status(500).send("Error");
    } else if (movies) {
      res.status(200).json(movies);
    }
  });
};

//Add a movie
exports.addMovie = async (req, res, next) => {
  let movie = new movieModel({
    ...req.body,
  });

  movie
    .save()
    .then(() => {
      res.status(201).json({ message: "Movie register sucessfull" });
      next();
    })
    .catch((error) => res.status(400).json({ error }));
};

//Get a specific movie by movieDbId
exports.getMovieByMovieDBId = async (req, res, next) => {
  const movies = movieModel.findOne(
    { movieDbId: req.params.id },
    (err, movies) => {
      if (err) {
        console.log("RETRIEVE error: " + err);
        res.status(500).send("Error");
      } else if (movies) {
        res.status(200).json(movies);
      }
    }
  );
};

//Update a movie
exports.updateMovie = async (req, res, next) => {
  const movie = movieModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      ...req.body,
    },
    (err) => {
      if (err) {
        res.status(500).send("Error");
      } else {
        res.status(200).json(req.body);
      }
    }
  );
};

//Delete movie from DB
exports.deleteMovie = async (req, res, next) => {
  movieModel.deleteOne({ id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      res.status(200).json("Movie deleted");
    }
  });
};

//Change metadata
exports.updateMetaData = async (req, res, next) => {
  const job = req.body;

  //Get file extension
  const format = job.format.substring(job.format.indexOf("/") + 1);

  //Change title in metadata
  if (format === "x-matroska") {
    console.log(
      `mkvpropedit "${job.path}" -e info -s title="${job.selectedMovie.title}"`
    );

    exec(
      `mkvpropedit "${job.path}" -e info -s title="${job.selectedMovie.title}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        if (stdout) {
          console.log(stdout);
          res.status(200).json("Metadata modified");
        }
      }
    );
  } else {
    res.status(200).json("Not a MKV movie");
  }
};
