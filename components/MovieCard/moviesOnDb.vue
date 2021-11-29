<template>
  <div>
    <v-container class="grey lighten-5 mainLogo">
      <img src="../../assets/logo_big.png">
    </v-container>
    <v-container class="grey lighten-5 mainContainer">
        <v-row no-gutters>
            <v-col
                v-for="movie in movies" :key="movie.id"
                cols="12"
                sm="3"
            >
              <div class="card">
                <v-card>
                    <div class="hover10">
                        <figure>
                            <img  @click="getInfo(null,null,movie)" class="imgMovieCard" :srcset="url+movie.poster_path" >
                            <v-rating v-if="isAuthenticated"
                                class="favoriteMovie"
                                hover
                                length="1"
                                size="54"
                                :empty-icon="emptyIcon"
                                :full-icon="fullIcon"
                                color="yellow darken-3"
                                background-color="grey darken-1"
                            ></v-rating>
                        </figure>
                    </div>
                    <div class="cardInfos">
                    <v-card-title v-if="movie.title.length > 25">{{ movie.title.substring(0,22) }}...</v-card-title>
                    <v-card-title v-else>{{ movie.title }}</v-card-title>
                    <div class="text-subtitle-1">
                        {{ movie.release_date.substring(0,4) }}
                    </div>
                    <v-card-actions class="pa-4">
                        <v-rating v-if="isAuthenticated"
                        background-color="red lighten-3"
                        color="red"
                        hover
                        length="5"
                        size="18"
                        :value= "movie.grade/2"
                        @input="rateMovie($event, movie._id)"
                    ></v-rating>
                    <v-rating v-else
                        background-color="red lighten-3"
                        color="red"
                        hover
                        length="5"
                        size="18"
                        :value= "movie.grade/2"
                        readonly
                    ></v-rating>
                    </v-card-actions>
                  </div>
                </v-card>
              </div>
            </v-col>
    </v-row>
    </v-container>
    <MovieModal :revele="revele" :toggleModal="toggleModal" :movie="movieForModal" />
  </div>
</template>
<script>
  import axios from "axios";
  import MovieModal from "./movieModal";


  export default{
    data(){
      return {
        title: '',
        grade: 0,
        url: 'http://image.tmdb.org/t/p/w500',
        movies: [],
        emptyIcon: 'mdi-heart-outline',
        fullIcon: 'mdi-heart',
        sortBy: 'title',
        sortDirection: 'asc',
        movieForModal:'',
        revele: false,
      }
    },
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated; // it check if user isAuthenticated
      },
    },
    methods: {
        rateMovie(value, id){
            axios
            .patch(
                process.env.BASE_URL +
                "/movies/" +
                id, {
                grade: value*2
            })
            .then(async (response) => {
                this.$store.commit('UPDATE_MOVIE',response.data);
            });
        },
        getInfo(filePath, fileToModify, movie){
          axios
          .post(process.env.BASE_URL + "/movies/" + movie.movieDbId + "/getInfo")
          .then((response) => {
            this.toggleModal(response.data);
          });
        },
        toggleModal(movie) {
          this.revele = !this.revele;
          this.movieForModal = movie;
        },
    },
    created() {
        this.movies = this.$store.getters.getMovies;
    }
  }
</script>
<style>
.mainContainer{
    margin-top: 30px;
}
.mainLogo{
    margin-left:0;
    margin-right:0;
    text-align: center;
}
.mx-auto{
    margin-bottom: 17px;
}
.card{
  margin: 10px;
  border: 0px;
  border-radius: 10px;
  overflow: hidden;
}
.v-card__text{
    max-height: 200px;
    overflow: scroll;
    font-family: 'Lato', sans-serif;
    font-size: 18px;
}
.v-card__title{
    padding: 16px 16px 0 16px;
    color: #9042b4;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 600;
}
.text-subtitle-1{
    padding: 0 0 0 14px;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    color: #9042b4;
    font-size: 17px;
}
.cardInfos{
    background-color: #d29eeb31;
}
.mx-auto{
    min-height: 580px;
}
.v-card__actions{
    padding: 0 0 0 7px;
}
.v-sheet.v-card.v-sheet--shaped {
    border: 0px black solid;
}
.v-rating{
  padding-bottom: 5px;
}
.imgMovieCard{
    min-height: 450px;
    width: 100%;
    height: auto;
}
figure{
    margin: 0;
}
.favoriteMovie{
    font-size: 64px;
    position: absolute;
    top: -15px;
    right: 5px;
    color: #ffffff;
}
.v-icon.v-icon.v-icon--link {
    cursor: pointer;
    outline: none;
    color: #9042b4;
}

/* Blur + Gray Scale */
.hover10 figure img {
	-webkit-filter: sepia(0);
	filter: sepia(0);
	-webkit-transition: .6s ease-in-out;
	transition: .6s ease-in-out;
  cursor: pointer;
}
.hover10 figure:hover img {
	-webkit-filter: sepia(100%);
	filter: sepia(100%);
}
.text-overview{
  overflow:auto;
  height: 120px;
}
</style>
