<template>
  <div>
    <div v-if="movies.length > 0">
      <v-container class="d-flex grey lighten-5">
        <v-row no-gutters>
          <v-col v-for="movie in movies" :key="movie._id" cols="12" sm="3">
            <nuxt-link
              class="nav-link active"
              aria-current="page"
              :to="{
                name: `movies-id___${siteLang}`,
                params: { id: movie._id },
                hash: '#logo',
              }"
            >
              <div class="card">
                <v-card>
                  <div class="hover10">
                    <figure>
                      <img
                        class="imgMovieCard"
                        :srcset="url + movie[siteLang].poster_path"
                      />
                      <UIFavoriteIcon
                        v-if="isAuthenticated"
                        :myFavorites="myFavorites"
                        :movieDbId="movie.movieDbId"
                      />
                    </figure>
                  </div>
                  <div class="cardInfos">
                    <v-card-title v-if="movie[siteLang].title.length > 22"
                      >{{
                        movie[siteLang].title.substring(0, 22)
                      }}...</v-card-title
                    >
                    <v-card-title v-else>{{
                      movie[siteLang].title
                    }}</v-card-title>
                    <div v-if="isAuthenticated" class="text-subtitle-1">
                      {{ movie.release_date.substring(0, 4) }}
                    </div>
                    <div v-else class="text-subtitle-1">
                      {{ movie.release_date.substring(0, 4) }}
                    </div>
                    <div v-if="isAuthenticated">
                      <UIRatingStars
                        :myRates="myRates"
                        :movieDbId="movie.movieDbId"
                      />
                    </div>
                  </div>
                </v-card>
              </div>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
      <UIPaginator
        :perPage="perPage"
        :totalItems="nbMoviesDB"
        @changePage="changePageContent"
      />
    </div>
    <div v-else class="noMovieInDB">
      <img src="~/assets/No-Movie.png" alt="no-movie.png" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: ["siteLang"],
  data() {
    return {
      title: "",
      url: process.env.apiPicURL,
      emptyIcon: "mdi-heart-outline",
      fullIcon: "mdi-heart",
      sortBy: "title",
      sortDirection: "asc",
      myRates: [],
      myFavorites: [],
      perPage: 8,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState("moviesStore", ["movies", "nbMoviesDB"]),
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // it check if user isAuthenticated
    },
  },
  methods: {
    async changePageContent(page) {
      this.currentPage = page;
      await this.$store.dispatch("moviesStore/getMovies", [
        page - 1,
        this.perPage,
        "min",
      ]);
      window.scrollTo({ top: 400 });
    },
  },
  async created() {
    await this.$store.dispatch("moviesStore/getMovies", [0, 8, "min"]);

    if (this.$store.getters.getUserInfo) {
      this.myRates = this.$store.getters.getUserInfo.myRates;
    }

    if (this.$store.getters.getUserInfo) {
      this.myFavorites = this.$store.getters.getUserInfo.myFavorites;
    }
  },
};
</script>
<style scoped>
.card {
  margin: 5px;
  border: 0px;
  border-radius: 10px;
  overflow: hidden;
  min-width: 270px;
  max-width: 315px;
  width: 100%;
}
.imgMovieCard {
  object-fit: cover;
  width: 100%;
  height: auto;
  max-width: 315px;
}
.v-card__text {
  max-height: 200px;
  font-family: "Lato", sans-serif;
  font-size: 18px;
}
.v-card__title {
  padding: 10px 10px 0 10px;
  color: var(--color-fushia);
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
}
.text-subtitle-1 {
  padding-left: 10px;
  font-family: "Lato", sans-serif;
  font-weight: 600;
  color: var(--color-fushia);
  font-size: 17px;
}
.cardInfos {
  background-color: #d29eeb31;
}
.v-card__actions {
  padding: 0;
}
.v-rating {
  padding-bottom: 5px;
}
.v-icon {
}
figure {
  display: flex;
  margin: 0;
}
.v-icon.v-icon.v-icon--link {
  cursor: pointer;
  outline: none;
}
/* Blur + Gray Scale */
.hover10 figure img {
  -webkit-filter: sepia(0);
  filter: sepia(0);
  -webkit-transition: 0.6s ease-in-out;
  transition: 0.6s ease-in-out;
  cursor: pointer;
}
.hover10 figure:hover img {
  -webkit-filter: sepia(100%);
  filter: sepia(100%);
}
.noMovieInDB {
  text-align: center;
}

@media (min-width: 1251px) {
  .imgMovieCard {
    min-height: 412px;
  }
}
</style>
