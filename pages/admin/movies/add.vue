<template>
  <div v-if="roleIsAdmin">
    <UIBigLogo />
    <v-container class="grey lighten-5 square">
      <!-- Back button -->
      <UIBackBtn :path="'admin'" />
      <!-- Page logo and title -->
      <div class="pageLogoTitle">
        <svg style="width: 65px; height: 65px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z"
          /></svg
        ><br />
        {{ $t("addMovie") }}
      </div>
      <!-- Form -->
      <v-form method="post" @submit.prevent="getSearchResult()" class="form">
        <input
          type="title"
          :placeholder="$t('titleMovie')"
          v-model="title"
          class="form-control"
          id="title"
        />
        <button type="submit" class="searchBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
        </button>
      </v-form>
    </v-container>
    <div v-if="this.results !== ''">
      <MovieBtnCards :btnTxt="this.btnTxt" />
    </div>
    <UIBtnTop :showAt="300" />
  </div>
</template>

<script>
export default {
  data: () => ({
    btnTxt: "add",
    title: "",
    results: "",
    rules: [(value) => !!value || "Required."],
    baseURL: process.env.baseURL,
    siteLang: "",
  }),
  methods: {
    async getSearchResult() {
      if (this.title !== "") {
        await this.$store.dispatch("moviesStore/getSearchResults", [
          this.title.replace(" ", "+"),
          this.siteLang,
        ]);
        this.results = "OK";
      } else {
        this.$toast.info(this.$t("enterTitle"));
      }
    },
  },
  computed: {
    roleIsAdmin() {
      if (this.$store.getters.roleIsAdmin === true) {
        return true;
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
.square {
  width: 600px;
  padding: 30px;
  background-color: #ffffff20;
  border-radius: 14px;
  margin-top: 20px;
}
.pageLogoTitle {
  color: #ffffff79;
  font-family: "Ubuntu", sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 50px;
}
.form {
  display: flex;
  margin-top: 20px;
}
.searchBtn {
  margin: auto 0 auto 20px;
  color: white;
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
