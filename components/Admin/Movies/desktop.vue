<template>
  <div v-if="roleIsAdmin" id="adminMoviesDesktop">
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
    <table class="table table-striped borderless">
      <thead>
        <tr>
          <th class="text-left">
            {{ $t("title") }}
          </th>
          <th class="text-left">
            {{ $t("vote") }}
          </th>
          <th class="text-left">
            {{ $t("releaseDate") }}
          </th>
          <th class="text-left">
            {{ $t("director") }}
          </th>
          <th class="text-left ps-4">
            {{ $t("overview") }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="movies.length > 0">
        <tr v-for="movie in movies" :key="movie._id">
          <td>{{ movie[siteLang].title }}</td>
          <td>{{ movie.vote_average }}</td>
          <td class="noWrap">{{ movie.release_date }}</td>
          <td class="noWrap">{{ movie.director }}</td>
          <td class="overview">
            <span class="overviewTxt">{{ movie[siteLang].overview }}</span>
          </td>
          <td>
            <div class="d-flex">
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
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td align="center" colspan="6">{{ $t("noMovieCatalog") }}</td>
        </tr>
      </tbody>
    </table>
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
  async created() {
    await this.$store.dispatch("moviesStore/getMovies", [
      0,
      this.perPage,
      "admin",
    ]);
  },
};
</script>
<style scoped>
#adminMoviesDesktop {
  display: block;
}
.overview {
  padding: 15px;
}
.overviewTxt {
  display: flex;
  width: 300px;
  max-height: 225px;
  overflow: auto;
  text-align: justify;
  padding: 0 8px;
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
th {
  padding: 15px;
}
tr {
  font-family: "Lato", sans-serif;
  font-weight: 600;
  color: var(--color-fushia);
  font-size: 17px;
}
td {
  color: #fff;
  padding: 15px;
}
.noWrap {
  white-space: nowrap;
}

@media (max-width: 1024px) {
  #adminMoviesDesktop {
    display: none;
  }
}
</style>
