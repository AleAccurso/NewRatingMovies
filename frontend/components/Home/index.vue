<template>
  <div id="homeComp">
    <UIBigLogo />
    <MovieRateCard :movies="getMovies"/>
    <UIBtnTop :showAt="300" />
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    getMovies(){
      return this.$store.getters['moviesStore/getMovies'];
    }
  },
}
</script>

