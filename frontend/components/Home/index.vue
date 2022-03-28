<template>
  <div id="home">
    <UIBigLogo />
    <MovieRateCards :movies="getMovies" />
    <UIBtnTop :showAt="300" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      siteLang: "",
    };
  },
  computed: {
    getMovies() {
      return this.$store.getters["moviesStore/getMovies"];
    },
  },
  async created() {
    await this.$store.dispatch("moviesStore/getMovies", [0, 8, "min"]);

    // Get siteLang
    if (this.$cookiz.get("siteLang")) {
      this.siteLang = this.$cookiz.get("siteLang");
    } else {
      this.siteLang = "fr";
    }
    this.$i18n.setLocale(this.siteLang);
  },
};
</script>
