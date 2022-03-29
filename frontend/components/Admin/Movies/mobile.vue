<template>
  <div id="adminMoviesMobile" v-if="roleIsAdmin">
    <div>
      <nuxt-link
        :to="{ name: `admin-movies-add___${siteLang}`, hash: '#logo' }"
        class="btn btn-success mb-2 me-2"
      >
        {{ $t("add") }}
      </nuxt-link>
      <nuxt-link
        :to="{ name: `admin-movies-metadata___${siteLang}`, hash: '#logo' }"
        class="btn btn-success mb-2"
      >
        {{ $t("modifyMetadata") }}
      </nuxt-link>
    </div>
    <div v-if="movies.length > 0">
      <v-card v-for="movie in movies" :key="movie._id">
        <table>
          <tr>
            <td class="infoTitle">{{ $t("title") }}</td>
          </tr>
          <tr>
            <td class="infoText">{{ movie[siteLang].title }}</td>
          </tr>
          <tr>
            <td class="infoTitle">{{ $t("vote") }}</td>
          </tr>
          <tr>
            <td class="infoText">{{ movie.vote_average }}</td>
          </tr>
          <tr>
            <td class="infoTitle">{{ $t("releaseDate") }}</td>
          </tr>
          <tr>
            <td class="infoText">{{ movie.release_date }}</td>
          </tr>
          <tr>
            <td class="infoTitle">{{ $t("director") }}</td>
          </tr>
          <tr>
            <td class="infoText">{{ movie.director }}</td>
          </tr>
        </table>
        <span class="infoTitle">{{ $t("overview") }}</span
        ><br />
        <span class="overviewTxt">{{ movie[siteLang].overview }}</span>
        <div class="d-flex justify-content-evenly">
          <nuxt-link
            class="me-2"
            :to="{
              name: `admin-movies-update-id___${siteLang}`,
              params: { id: movie._id },
              hash: '#logo',
            }"
          >
            <svg
              style="width: 24px; height: 24px; color: #22d157"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z"
              />
            </svg>
          </nuxt-link>
          <button @click="deleteMovie(movie._id, movies.length)">
            <svg
              style="width: 24px; height: 24px; color: #ad0545"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
              />
            </svg>
          </button>
        </div>
      </v-card>
    </div>
    <div v-else align="center">{{ $t("noMovieCatalog") }}</div>
    <UIPaginator
      :perPage="perPage"
      :totalItems="nbMoviesDB"
      @changePage="changePageContent"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: ["siteLang"],
  data() {
    return {
      baseURL: process.env.baseURL,
      perPage: 5,
      currentPage: 1,
    };
  },
  methods: {
    async deleteMovie(id, displayedMovies) {
      if (confirm(this.$t("deleteMovieOK"))) {
        await this.$store.dispatch("moviesStore/deleteMovie", id);
        if (displayedMovies === 1 && this.currentPage > 1) {
          await this.$store.dispatch("moviesStore/getMovies", [
            this.currentPage - 1,
            this.perPage,
            "admin",
          ]);
        } else {
          this.changePageContent(this.currentPage);
        }
        this.$toast.success(this.$t("deleteDone"));
      }
    },
    async changePageContent(page) {
      this.currentPage = page;
      await this.$store.dispatch("moviesStore/getMovies", [
        page - 1,
        this.perPage,
        "admin",
      ]);
      window.scrollTo({ top: 400 });
    },
  },
  computed: {
    ...mapState("moviesStore", ["movies", "nbMoviesDB"]),
    roleIsAdmin() {
      if (this.$store.getters.roleIsAdmin === true) {
        return true;
      } else {
        this.$router.push("/");
      }
    },
  },
  created() {
    if (this.$cookiz.get("siteLang")) {
      this.siteLang = this.$cookiz.get("siteLang");
    } else {
      this.siteLang = "fr";
    }
    this.$i18n.setLocale(this.siteLang);
  },
};
</script>
<style scoped>
#adminMoviesMobile {
  display: block;
}
.v-card {
  border: 1px white solid;
  margin: 10px 0;
  padding: 10px;
}
.overviewTxt {
  display: flex;
  max-height: 150px;
  overflow: auto;
  text-align: justify;
  padding: 0 8px 0 15px;
  margin-bottom: 15px;
}
.overviewTxt::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
}

.overviewTxt::-webkit-scrollbar {
  width: 8px;
}

.overviewTxt::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* background-color: rgba(82,15,73,1); */
  background-color: var(--color-fushia);
}
.infoTitle {
  font-family: "Lato", sans-serif;
  font-weight: 600;
  color: var(--color-fushia);
  font-size: 17px;
}
.infoText {
  color: #fff;
  padding-left: 15px;
}
.noWrap {
  white-space: nowrap;
}

@media (min-width: 1025px) {
  #adminMoviesMobile {
    display: none;
  }
}
</style>
