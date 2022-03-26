require("dotenv").config();

const movieModel = require("../models/movieModel");
const { msg } = require("../constants/response_messages");
const { exec } = require("child_process");
const { Console } = require("console");

//get movies
exports.getMovies = async (req, res, next) => {
  pageInt = parseInt(req.query.page);
  sizeInt = parseInt(req.query.size);

  const movies = movieModel
    .find()
    .skip(pageInt * sizeInt)
    .limit(sizeInt)
    .exec((err, movies) => {
      if (err) {
        res.status(500).send({ message: msg.SERVER_ERROR });
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
      res.status(201).json({ message: msg.SUCCESS_ACTION + "add_movie" });
      next();
    })
    .catch((error) => res.status(400).json({ message: error }));
};

//Get a specific movie by movieDbId
exports.getMovieByMovieDBId = async (req, res, next) => {
  const movies = movieModel.findOne(
    { movieDbId: req.params.id },
    (err, movies) => {
      if (err) {
        res.status(500).send({ message: msg.SERVER_ERROR });
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
        res.status(500).send({ message: msg.SERVER_ERROR });
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
      res.status(500).send({ message: msg.SERVER_ERROR });
    } else {
      res.status(200).json({ message: msg.SUCCESS_ACTION + "delete_movie" });
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
          // console.log(`error: ${error.message}`);
          // return;
          res.status(500).json({ message: error.message });
        }
        if (stderr) {
          // console.log(`stderr: ${stderr}`);
          // return;
          res.status(400).json({ message: stderr });
        }
        if (stdout) {
          console.log(stdout);
          res
            .status(200)
            .json({ message: msg.SUCCESS_ACTION + "update_metadata" });
        }
      }
    );
  } else {
    res.status(400).json({ message: msg.BAD_DATA + "mkv_required" });
  }
};
