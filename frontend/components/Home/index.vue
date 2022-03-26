<template>
  <div id="homeComp">
    <UIBigLogo />
    <MovieRateCards :movies="getMovies" />
    <UIBtnTop :showAt="300" />
  </div>
</template>
<script>
export default {
  computed: {
    getMovies() {
      return this.$store.getters["moviesStore/getMovies"];
    },
  },
};
</script>
