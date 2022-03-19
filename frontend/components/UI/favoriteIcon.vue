<template>
  <div id="favoriteIcon">
    <button @click="toggleFavorite">
      <img
        v-if="favStatus"
        class="movieFavIcon"
        src="~/assets/favIcons/favMinus.png"
      />
      <img v-else class="movieFavIcon" src="~/assets/favIcons/favPlus.png" />
    </button>
  </div>
</template>
<script>
export default {
  props: ["myFavorites", "movieDbId"],
  data() {
    return {
      favStatus: false,
      baseURL: process.env.baseURL,
    };
  },
  methods: {
    toggleFavorite() {
      //Change value of the icon to make it full or empty
      if (this.favStatus === false) {
        this.favStatus = true;
      } else {
        this.favStatus = false;
      }

      //Add & remove the favorite
      let userId = this.$store.getters.getUserInfo.id;

      if (userId) {
        this.$store.dispatch("updateFavorite", [userId, this.movieDbId]);
      } else {
        this.$toast.error(this.$t("pleaseLogoutLogin"));
      }
    },
  },
  created() {
    if (this.myFavorites) {
      if (this.myFavorites.length > 0) {
        for (let i = 0; i < this.myFavorites.length; i++) {
          if (this.myFavorites[i] === this.movieDbId) {
            this.favStatus = 1;
            break;
          }
        }
      }
    }
  },
};
</script>
<style scoped>
.movieFavIcon {
  position: absolute;
  top: 15px;
  right: 15px;
  height: 30px;
}
</style>
