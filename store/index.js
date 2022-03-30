import usersStore from "./modules/users.js";
import moviesStore from "./modules/movies.js";

const store = {
  state() {
    return {
      siteLang: "fr",
    };
  },

  mutations: {
    SET_LANG: (state, langCode) => {
      state.siteLang = langCode;
    },

    RATE_MOVIE: (state, myRate) => {
      let index = state.auth.user.myRates.findIndex(
        (rate) => rate.movieDbId === myRate.movieDbId
      );

      if (index > -1) {
        state.auth.user.myRates[index].movieDbId = myRate.rate;
      } else {
        state.auth.user.myRates.push({
          movieDbId: myRate.movieDbId,
          rate: myRate.rate,
        });
      }
    },

    UPDATE_FAVORITE: (state, movieDbId) => {
      let index = state.auth.user.myFavorites.indexOf(movieDbId);

      if (index >= 0) {
        state.auth.user.myFavorites.splice(index, 1);
      } else {
        state.auth.user.myFavorites.push(movieDbId);
      }
    },

    UPDATE_LOGGED_USER: (state, data) => {
      if (data.nickname) state.auth.user["nickname"] = data.nickname;
      if (data.email) state.auth.user["email"] = data.email;
      if (data.language) state.auth.user["language"] = data.language;
      if (data.profilePic) state.auth.user["profilePic"] = data.profilePic;
    },
  },

  actions: {
    async nuxtServerInit({ dispatch, commit }) {
      await dispatch("moviesStore/getMovies", [0, 8, "min"]);

      // Site language
      if (this.$cookiz.get("siteLang")) {
        commit("SET_LANG", this.$cookiz.get("siteLang"));
      }
    },

    //Rate movies
    async rateMovie({ commit }, [userId, movieDbId, rate]) {
      const response = await this.$axios
        .patch(
          process.env.baseURL +
            "/users/" +
            userId +
            "/" +
            movieDbId +
            "/" +
            rate
        )
        .then((response) => {
          commit("RATE_MOVIE", response.data);
        });
    },

    //Update logged user
    async updateLoggedUser({ commit }, [id, formData]) {
      let config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const response = await this.$axios({
        method: "post",
        url: process.env.baseURL + "/users/" + id,
        data: formData,
        config: config,
      })
        .then(async (response) => {
          await commit("usersStore/UPDATE_USER", {
            _id: id,
            ...response.data,
          });
          await commit("UPDATE_LOGGED_USER", response.data);
          commit("SET_LANG", formData.get("language"));
        })
        .catch((err) => {
          this.$toast.error(err);
        });
    },

    //Update favorite
    async updateFavorite({ commit }, [userId, movieDbId]) {
      const response = await this.$axios
        .patch(process.env.baseURL + "/users/" + userId + "/" + movieDbId)
        .then((response) => {
          commit("UPDATE_FAVORITE", response.data);
        });
    },

    // Logout
    async logout() {
      if (this.$cookiz.get("siteLang")) {
        this.$cookiz.remove("siteLang");
      }
      const response = await this.$axios
        .delete(process.env.baseURL + "/auth/logout")
        .then(async (response) => {
          await this.$auth.logout(); // this method will logout the user and make token to false on the local storage of the user browser
        });
    },
  },

  getters: {
    //Check if a user is authenticated
    isAuthenticated(state) {
      return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
    },

    //Check if role is admin
    roleIsAdmin(state) {
      if (state.auth.user?.isAdmin === true) {
        return true;
      } else {
        return "NotAnAdmin";
      }
    },

    //Logged User
    getUserInfo(state) {
      return state.auth.user;
    },

    // get movie information of logged favorites
    getUserFavorites(state) {
      let userFavorites = [];

      if (state.auth.user) {
        let userFav = state.auth.user.myFavorites;
        userFav.forEach((movieDbId) => {
          state.moviesStore.movies.forEach((movie) => {
            if (movie.movieDbId === movieDbId) {
              userFavorites.push(movie);
            }
          });
        });
      }
      return userFavorites;
    },

    // get the current language of the webpage
    getSiteLang(state) {
      return state.siteLang;
    },
  },

  modules: {
    usersStore,
    moviesStore,
  },
};

export default store;
