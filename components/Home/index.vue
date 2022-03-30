<template>
  <div id="home">
    <UIBigLogo />
    <MovieRateCards :siteLang="siteLang" />
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
  async created() {
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
