<template lang="">
  <div>
    <v-card-actions>
      <v-rating
        dense
        clearable
        half-increments
        :value="rate"
        hover
        size="18"
        @input="rateMovie($event)"
      ></v-rating>
    </v-card-actions>
  </div>
</template>
<script>
export default {
  props: ["movieDbId", "myRates"],
  data() {
    return {
      rate: 0,
      baseURL: process.env.baseURL,
    };
  },
  methods: {
    async rateMovie(rate) {
      let userId = this.$store.getters.getUserInfo.id;

      if (userId) {
        await this.$store.dispatch("rateMovie", [userId, this.movieDbId, rate]);
      } else {
        this.$toast.error(this.$t("pleaseLogoutLogin"));
      }
    },
  },
  created() {
    let found = false;

    if (this.myRates) {
      for (let i = 0; i < this.myRates.length; i++) {
        if (this.myRates[i].movieDbId === this.movieDbId) {
          this.rate = this.myRates[i].rate / 2;
          found = true;
          break;
        }
      }
      if (!found) {
        this.rate = 0;
      }
    }
  },
};
</script>
<style scoped>
.v-card__actions {
  padding: 0 0 5px 0;
  margin-left: 5px;
}
</style>
