<template>
  <div class="moviePage">
    <UIBigLogo />
    <MovieOverviewDesktop class="desktop" :siteLang="siteLang" :movie="movie" />
    <MovieOverviewMobile class="mobile" :siteLang="siteLang" :movie="movie" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      siteLang: "",
      movie: "",
    };
  },
  async beforeCreate() {
    console.log("requesting data");
    let getMovie = await this.$store.dispatch(
      "moviesStore/getMovieById",
      this.$route.params.id
    );
  },
  async create() {
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
<style scoped>
.desktop {
  display: block;
}
.mobile {
  display: none;
}

.movieData {
  color: white;
}

@media (max-width: 1024px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }
}
</style>
