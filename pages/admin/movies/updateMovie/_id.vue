<template>
      <v-form method="post" @submit.prevent="updateMovie()" >
        <v-container>
          <v-row>
            <v-col
              md="4"
            >
            <input type="hidden" v-model="poster">
            </v-col>
          </v-row>
          <v-row>
            <v-col
              md="4"
            >
              <v-text-field
                v-model="title"
                label="Title"
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              md="4"
            >
              <v-text-field
                v-model="genre"
                label="Genre"
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              md="4"
            >
              <v-text-field
                v-model="grade"
                label="Grade"
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              md="4"
            >
              <v-text-field
                v-model="date"
                label="Date"
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              md="4"
            >
              <v-text-field
                v-model="director"
                label="Director"
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              md="4"
            >
              <v-textarea
                v-model="overview"
                label="Overview"
                :rules="rules"
                hide-details="auto"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              md="4"
            >
              <v-btn
                type="submit"
                color="success"
                class="mr-4"
              >
              UPDATE
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    title: '',
    genre: '',
    grade: '',
    date: '',
    poster: '',
    overview: '',
    director: '',
    rules: [
        value => !!value || 'Required.',
    ],
    movie: [],
  }),
  methods:{
    getMovie(){
        axios
        .get(process.env.BASE_URL + this.$route.params.id)
        .then(async (response) => {
          this.movie = response.data;
        });
    },
   updateMovie(){
       axios
        .patch(process.env.BASE_URL + this.$route.params.id, {
          title: this.title,
          genre: this.genre,
          grade: this.grade,
          date: this.date,
          poster: this.poster,
          director: this.director,
          overview: this.overview
        })
        .then(async (response) => {
          this.$store.commit('UPDATE_MOVIE', response.data);
        });
    }
  },
  created(){
      let movieToUpdate = this.$store.getters.getMovieById(this.$route.params.id);
      this.title = movieToUpdate.title;
      this.genre = movieToUpdate.genre;
      this.grade = movieToUpdate.grade;
      this.date = movieToUpdate.date;
      this.poster = movieToUpdate.poster;
      this.overview = movieToUpdate.overview;
      this.director = movieToUpdate.director;
  }
}
</script>
