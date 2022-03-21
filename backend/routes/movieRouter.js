const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");

const isAdmin = require("../middleware/isAdmin");

router
  .route("/")
  .get(movieController.getAllMovies) // Get all movies
  .post(isAdmin, movieController.addMovie); // Add a movie

router
  .route("/:id")
  .get(isAdmin, movieController.getMovieByMovieDBId) // Get a specific movie by movieDbId
  .patch(isAdmin, movieController.updateMovie) // Update a movie
  .delete(isAdmin, movieController.deleteMovie); // Delete movie

router.post("/:id/metadata", isAdmin, movieController.updateMetaData); //Change metadata a MKV file on the hard drive

module.exports = router;
