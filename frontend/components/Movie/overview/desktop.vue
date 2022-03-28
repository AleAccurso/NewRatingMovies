<template>
  <div class="movieDesktop">
    <div class="movieDescription">
      <!-- Poster -->
      <div id="poster">
        <figure>
          <img
            v-if="result[0][siteLang].poster_path"
            :srcset="url + result[0][siteLang].poster_path"
          />
          <div v-else class="defaultPicContainer">
            <img
              class="defaultPic"
              src="~/assets/no_picture.png"
              alt="default picture"
            />
          </div>
        </figure>
      </div>
      <div class="movieText">
        <div class="movieDesc">
          <div class="d-flex justify-content-between align-items-center">
            <!-- Title -->
            <div id="title">
              <span
                v-if="result[0][siteLang].title.length <= 33"
                class="bigTitle"
                >{{ result[0][siteLang].title }}</span
              >
              <span v-else class="smallTitle">{{
                result[0][siteLang].title
              }}</span>
            </div>
            <div id="vote">
              <!-- Vote -->
              <span v-if="result[0].vote_average" class="vote">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-heart-fill voteIcon"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
                {{ result[0].vote_average }}
              </span>
            </div>
          </div>
          <!-- Movie details -->
          <div class="movieData">
            <!-- Year -->
            <div v-if="result[0].release_date" class="year">
              {{ result[0].release_date.substring(0, 4) }}
            </div>
            <!-- Genres -->
            <div>
              <span
                class="genre"
                v-if="result[0].genre"
                v-for="movieGenre in result[0].genre"
                >{{ $t(movieGenre) }}</span
              >
            </div>

            <!-- People -->
            <div class="people">
              <table>
                <tr v-show="result[0].director">
                  <td>
                    <span>{{ $t("director") }}</span>
                  </td>
                  <td>
                    <!-- Director -->
                    <div class="casting">{{ result[0].director }}</div>
                  </td>
                </tr>
                <tr v-if="result[0].casting">
                  <td>
                    <span>{{ $t("casting") }}</span>
                  </td>
                  <td>
                    <!-- Actors -->
                    <div class="casting">{{ result[0].casting }}</div>
                  </td>
                </tr>
              </table>
            </div>
            <!-- Overview -->
            <div v-if="result[0][siteLang].overview" class="overview">
              {{ result[0][siteLang].overview }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <MovieTrailers :trailers="result[0][siteLang].trailers" />
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "MovieOverview",
  props: ["siteLang"],
  data() {
    return {
      url: process.env.apiPicURL,
      baseVideoURL: process.env.VIDEO_URL,
      noPic: "~/assets/no_picture.png",
    };
  },
  computed: {
    ...mapState("moviesStore", ["result"]),
  },
  async created() {
    await this.$store.dispatch(
      "moviesStore/getMovieById",
      this.$route.params.id
    );
  },
};
</script>
<style scoped>
.movieDesktop {
  display: block;
}
.movieDescription {
  width: 70%;
  min-width: 800px;
  height: auto;
  display: flex;
  background-color: var(--color-purple);
  padding: 20px;
  border-radius: 10px;
  border: 0;
  margin: 0 auto;
}
.genre + .genre::before {
  content: ", ";
}
img {
  float: left;
  width: auto;
  max-width: 300px;
  height: 450px;
  border: 0;
  border-radius: 10px;
  background-color: whitesmoke;
}
.defaultPicContainer {
  width: 300px;
  height: 450px;
  background-color: whitesmoke;
  border: 0;
  border-radius: 10px;
}
.defaultPic {
  width: 300px;
  height: auto;
}
.movieText {
  display: flex;
  padding-left: 20px;
}
.movieDesc {
  display: block;
}
.bigTitle {
  color: var(--color-fushia);
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
  font-size: 30px;
}
.smallTitle {
  color: var(--color-fushia);
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
  font-size: 20px;
}
.vote {
  font-size: 20px;
  font-weight: normal;
  color: #f2c43c;
  float: right;
}
.voteIcon {
  margin-bottom: 3px;
  margin-right: 5px;
}
.movieData {
  color: white;
}
.year {
  font-family: "Lato", sans-serif;
  font-weight: 600;
  font-size: 18px;
}
.genres {
  font-size: 14px;
}
.people {
  margin: 25px 0;
}
.people .casting {
  padding-left: 10px;
  font-weight: 400;
}
table {
  font-size: 15px;
}
table span {
  color: var(--color-fushia);
}
.overview {
  height: 260px;
  overflow: auto;
  text-align: justify;
  padding: 0 10px 0 0;
}
.overview::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
}

.overview::-webkit-scrollbar {
  width: 8px;
}

.overview::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* background-color: rgba(82,15,73,1); */
  background-color: var(--color-fushia);
}

@media (max-width: 1024px) {
  .movieDesktop {
    display: none;
  }
}
</style>
