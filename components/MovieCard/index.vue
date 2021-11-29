<template>
  <div>
    <div class="mt-4">
      <v-container class="grey lighten-5">
        <v-row>
            <v-col
                v-for="movie in getResult" :key="movie.id"
                cols="12"
                sm="3"
            >
                <v-card
                    class="card mx-auto"
                    max-width="300"
                >
                <!-- Poster -->
                <button class="imgMovieCard" @click="getInfo(null,null,movie)">
                  <img v-if="movie.poster_path" :srcset="url+movie.poster_path" />
                  <img v-else class="defaultPic" src="../../assets/No-Image-Placeholder.png" />
                </button>
                <!-- Title -->
                <v-card-title class="text-title" v-if="movie.title.length > 25">{{ movie.title.substring(0,22) }}...</v-card-title>
                <v-card-title class="text-title" v-else>{{ movie.title }}</v-card-title>
                <!-- Year -->
                <div v-if="movie.release_date" class="text-subtitle-1 ms-1 mb-2">
                  {{ /[^-]*/.exec(movie.release_date)[0] }}
                </div>
                <div v-else class="mb-2"><br></div>
                <!-- Button -->
                <v-card-actions>
                  <button v-if="btnTxt==='add'" type="submit" @click="checkIsInDB(filePath, fileToModify, movie)" class="btn w-50 registerButton">Add</button>
                  <button v-else-if="btnTxt==='select'" type="submit" @click="getInfo(filePath, fileToModify, movie)" class="btn w-50 registerButton">Select</button>
                </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
      </v-container>
    </div>
    <MovieModal :revele="revele" :toggleModal="toggleModal" :movie="movieForModal" />
  </div>
</template>

<script>
  import axios from "axios";
  import MovieModal from "./movieModal";

  export default{
    props: ['btnTxt','fileToModify','filePath'],
    components: {
      MovieModal,
    },
    data(){
      return {
        movieDbId: 0,
        selectedMovie: '',
        title: '',
        genre: [],
        grade: 0,
        date: '',
        poster: '',
        director: '',
        overview: '',
        strGenre: '',
        url: 'http://image.tmdb.org/t/p/w500',
        defaultPicUrl: '../../assets/No_Picture.png',
        movieForModal:'',
        revele: false,
      }
    },
    computed :{
      getResult(){
          return this.$store.getters.getResult;
      },
    },
    methods:{
      checkIsInDB(filePath, fileToModify, movie){
        let inDb = this.$store.getters.idInDb(movie.id);
        if(inDb == "Add OK"){
          this.getInfo(filePath, fileToModify, movie);
        }else{
          alert("Already in your database.");
        }
      },

      getInfo(filePath, fileToModify, movie){
        console.log("getInfo path:" + process.env._AXIOS_BASE_URL_ + "/movies/" + movie.id + "/getInfo");
        axios
        .post(process.env._AXIOS_BASE_URL_ + "/movies/" + movie.id + "/getInfo")
        .then((response) => {
          this.selectedMovie = response.data;
          if(filePath === null){
            this.toggleModal(this.selectedMovie);
          }
          else if(this.btnTxt==='add'){
            console.log('getinfo - add - ok');
            this.addMovie();
          }
          else if(this.btnTxt==='select'){
            console.log('getinfo - select - ok');
            this.selectedMovie.poster = this.url + this.selectedMovie.poster;
            this.modifyMetaData(filePath, fileToModify);
          }
        });
      },

      modifyMetaData(filePath, fileToModify){

        let info = this.selectedMovie;

        if (confirm("Still OK to use the information about this movie?\n   " + info.title + " - " + info.release_date.substring(0, 4) +
            "\non\n   " + fileToModify.name)){

          //if the path doesn't end by a slash, add it
          if(filePath.slice(-1) !== '/') {
            filePath += '/';
          }

          axios
          .post(process.env._AXIOS_BASE_URL_ + "/movies/" + info.movieDbId + "/metadata", {
            'format': fileToModify.type,
            'path': filePath + fileToModify.name,
            'selectedMovie': info
          })
          .then(async(response) => {
            console.log(response.data);
            this.$router.go(0);
          });
        }
      },

      addMovie(){
        axios
        .post(process.env._AXIOS_BASE_URL_ + "/movies", this.selectedMovie)
        .then(async(response) => {
          await this.$store.commit('ADD_MOVIE', this.selectedMovie);
          alert ("Movie successfully added");
          this.$router.go(0);
        });
      },

      toggleModal(movie) {
        this.revele = !this.revele;
        this.movieForModal = movie;
      },
    },
  }
</script>
<style scoped>
.card{
  height: auto;
  margin: 0;
  border: 0;
  border-radius: 10px;
}
.imgMovieCard{
  object-fit: cover;
  overflow: hidden;
  margin: 0;
  text-align:center;
}
img{
  width: auto;
  height: 450px;
  -webkit-filter: sepia(0);
	filter: sepia(0);
	-webkit-transition: .6s ease-in-out;
	transition: .6s ease-in-out;
  cursor: pointer;
}
img:hover{
  -webkit-filter: sepia(100%);
	filter: sepia(100%);
}
.defaultPic{
  width:100%;
  height:auto;
}
button{
  margin: 0 auto;
}
.text-title{
  padding: 16;
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
</style>
