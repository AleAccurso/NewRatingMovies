const store = {
  state() {
    return {
      movies: [],
      result: [],
      users: [],
      user: [],
    };
  },
  getters: {
    isAuthenticated(state) {
      return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
    },
    getUserInfo(state) {
      return state.auth.user;
    },
    getUserInfoById: (state) => {
      return state.auth.user;
    },
    getterUsers(state) {
      return state.users;
    },
    getUserById: (state) => (id) => {
      let index = state.users.findIndex((obj) => obj._id == id);
      return state.users[index];
    },
    getMovies(state) {
      return state.movies;
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
  },
  mutations: {
    //Movie
    GET_MOVIES: (state, allMovies) => {
      state.movies = allMovies;
    },
    ADD_MOVIE: (state, movie) => {
      state.movies.push(movie);
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
    },
    UPDATE_MOVIE: (state, movieToUpdate) => {
      let index = state.movies.findIndex(
        (obj) => obj.id == movieToUpdate["id"]
      );
      state.movies[index] = movieToUpdate;
    },
    SET_RESULT: (state, result) => {
      state.result = [];
      state.result.push(result);
    },

    //user
    GET_USERS: (state, users) => {
      state.users = users;
    },

    UPDATE_USER: (state, data) => {
      let index = state.users.findIndex((obj) => obj.id == data["id"]);
      state.users[index] = data;
    },

    DELETE_USER: (state, idToRemove) => {
      state.users.splice(
        state.users
          .map(function (user) {
            return user.id;
          })
          .indexOf(idToRemove),
        1
      );
    },
  },
  actions: {
    async nuxtServerInit({ commit }) {
      const response = await this.$axios
        .get(process.env.BASE_URL + "/movies")
        .then((response) => {
          commit("GET_MOVIES", response.data);
        });
    },

    //user
    getUsers({ commit }) {
      this.$axios
        .get(process.env.BASE_URL + "/users")
        .then((response) => {
          commit("GET_USERS", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteUser({ commit }, _id) {
      this.$axios
        .delete(process.env.BASE_URL + "/user/delete/" + _id)
        .then((response) => {
          commit("DELETE_USER", response.data);
        });
    },
  },
};

export default store;
