//State
const state = () => {
  return {
    movies: [], // For results coming from DB
    result: [], // For search results from API and getMovieById
    nbMoviesDB: 0, // Total number of movies in DB
  };
};

//Mutations
const mutations = {
  SET_MOVIES: (state, allMovies) => {
    state.movies = allMovies;
  },

  SET_MOVIE: (state, movie) => {
    let index = state.movies.findIndex((obj) => obj._id === movie._id);
    if (index >= 0) {
      state.movies[index] = movie;
    } else {
      state.movies.push(movie);
    }
  },

  SET_NB_TOTAL_MOVIES: (state, nb) => {
    state.nbMoviesDB = nb;
  },

  ADD_MOVIE: (state, movie) => {
    state.movies.push(movie);
  },

  UPDATE_MOVIE: (state, movieToUpdate) => {
    let index = state.movies.findIndex((obj) => obj._id === movieToUpdate.id);
    Object.keys(movieToUpdate.newInfo).forEach((key) => {
      state.movies[index][key] = movieToUpdate.newInfo[key];
    });
  },

  DELETE_MOVIE: (state, idToRemove) => {
    state.movies.splice(
      state.movies
        .map(function (movie) {
          return movie._id;
        })
        .indexOf(idToRemove),
      1
    );
    state.nbMoviesDB = state.nbMoviesDB - 1;
  },

  SET_RESULT: (state, result) => {
    state.result = [];
    state.result.push(result);
  },
};

//Actions
const actions = {
  async getMovies({ commit }, [page, size, data]) {
    const response = await this.$axios
      .get(
        process.env.baseURL + `/movies?page=${page}&size=${size}&data=${data}`
      )
      .then((response) => {
        commit("SET_MOVIES", response.data.movies);
        commit("SET_NB_TOTAL_MOVIES", response.data.nbMovies);
      });
  },

  async getMovieById({ commit }, id) {
    await this.$axios
      .get(process.env.baseURL + "/movies/" + id)
      .then((response) => {
        commit("SET_RESULT", response.data);
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },

  async addMovie({ commit }, data) {
    const response = await this.$axios
      .post(process.env.baseURL + "/movies", data)
      .then((response) => {
        commit("ADD_MOVIE", data);
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },

  async updateMovie({ commit }, data) {
    const response = await this.$axios
      .patch(process.env.baseURL + "/movies/" + data.id, data.newInfo)
      .then((response) => {
        commit("UPDATE_MOVIE", data);
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },

  async deleteMovie({ commit }, id) {
    const response = await this.$axios
      .delete(process.env.baseURL + "/movies/" + id)
      .then((response) => {
        commit("DELETE_MOVIE", id);
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },

  //Get search results from API
  async getSearchResults({ commit }, [title, language]) {
    const response = await this.$axios
      .post(
        process.env.baseURL + "/the-movie-db/search/" + title + "/" + language
      )
      .then((response) => {
        commit("SET_RESULT", response.data);
      });
  },
};

//Getters
const getters = {
  getMovies(state) {
    return state.movies;
  },
  getNbMovies(state) {
    return state.nbMoviesDB;
  },
  getResult(state) {
    return state.result[0];
  },
  getMovieById: (state) => (id) => {
    let index = state.movies.findIndex((obj) => obj._id == id);
    return state.movies[index];
  },
  idInDb: (state) => (id) => {
    let index = state.movies.findIndex((obj) => obj.movieDbId == id);
    if (index == -1) {
      return "Add OK";
    } else {
      return "Already in DB";
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
