<template>
  <div class="moviePage">
    <UIBigLogo />
    <MovieOverviewDesktop class="desktop" :siteLang="siteLang" />
    <MovieOverviewMobile class="mobile" :movie="movie" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      siteLang: "",
    };
  },
  methods: {
    getMovieFromStore() {
      this.movie = this.$store.getters["moviesStore/getMovieById"](
        this.$route.params.id
      );
    },
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
  async beforeCreate() {
    await this.$store.dispatch(
      "moviesStore/getMovieById",
      this.$route.params.id
    );
  },
};
</script>
<style scoped>
.desktop {
  display: flex;
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
    display: flex;
  }
}
</style>
