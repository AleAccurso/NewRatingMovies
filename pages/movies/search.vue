<template>
  <div>
    <v-container class="grey lighten-5 mainLogo">
      <img src="../../assets/logo_big.png">
    </v-container>
    <v-container class="grey lighten-5 loginForm">
      <nuxt-link :to="{ name: 'admin',hash:'#logo'}" class="btn btn-outline-light ms-2 mb-2">
        Back
      </nuxt-link>
      <div class="loginTitle">
        <svg style="width:65px;height:65px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z" />
        </svg><br>
        Search for a movie</div>
      <v-form method="post" @submit.prevent="getSearchResult()" >
        <v-container data-app>
          <div class="mb-3">
            <label for="password" class="form-label"></label>
            <input
              type="title"
              placeholder="Title of the movie"
              v-model="title"
              class="form-control"
              id="title"
            />
          </div>
          <button type="submit" class="btn w-100 registerButton">Search</button>
        </v-container>
      </v-form>
      </v-container>
    <div v-if="this.results !== ''">
      <MovieCard :btnTxt="this.btnTxt" />
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapState } from 'vuex';
  import axios from "axios";
  import MovieCard from '@/components/MovieCard/index';

  export default {
    components:{
        MovieCard
    },
    data: () => ({
      btnTxt:'add',
      title: '',
      results: '',
      rules: [
        value => !!value || 'Required.',
      ],
    }),
    methods:{
      getSearchResult(){
        if (this.title !== ''){
          axios
            .post(
                process.env.BASE_URL +
                "/movies/search/" +
                this.title.replace(" ", "+")
            )
            .then(async (response) => {
              await this.$store.commit('SET_RESULT',response.data);
              this.results = "OK";
            });
        }else{
          alert('Please enter a title.');
        }
      }
    },
  }
</script>
