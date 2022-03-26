<template>
  <div v-if="isAuthenticated">
    <UIBigLogo />
    <v-container class="grey lighten-5 square">
      <!-- Back button -->
      <UIBackBtn :path="'index'" />
      <!-- Page logo and title -->
      <div class="pageLogoTitle">
        <img class="favLogo" src="~/assets/favIcons/favorites.png" />
        <br />
        {{ $t("myFavorites") }}
      </div>
    </v-container>
    <!-- Movies cards -->
    <div class="my-5">
      <MovieRateCards :movies="getUserFavorites" />
    </div>
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
    getUserFavorites() {
      if (this.$store.getters.getUserInfo) {
        return this.$store.getters.getUserFavorites;
      } else {
        this.$router.push("/");
      }
    },
    isAuthenticated() {
      if (this.$store.getters.isAuthenticated) {
        return this.$store.getters.isAuthenticated; // check if there is an authenticated user
      } else {
        this.$router.push("/");
      }
    },
  },
  created() {
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
.favs {
  color: #fff;
}
.square {
  width: 600px;
  padding: 30px;
  background-color: #ffffff20;
  border-radius: 14px;
  margin-top: 32px;
}
.pageLogoTitle {
  color: #ffffff79;
  font-family: "Ubuntu", sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 50px;
}
.favLogo {
  height: 65px;
  width: auto;
}
.mobile {
  display: none;
}

@media (max-width: 620px) {
  .square {
    width: 92%;
  }
  .pageLogoTitle {
    font-size: calc(
      24px + (50 - 24) * ((100vw - 300px) / (620 - 300))
    ); /* font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))); */
    white-space: nowrap;
  }
}
</style>
