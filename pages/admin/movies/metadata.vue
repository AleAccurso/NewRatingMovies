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
        {{ $t("modifyMKV") }}
      </div>
      <!-- Form -->
      <v-container data-app>
        <span class="pageDesc">{{ $t("modifyTitleMetadata") }}</span>
        <div>
          <label for="path">{{ $t("firstFolderPath") }}</label>
          <input name="path" type="path" v-model="path" class="form-control" />
          <label for="file">{{ $t("thenChooseConcernedFile") }}</label>
          <input
            name="file"
            type="file"
            class="form-control"
            @change="getSearchResult($event)"
            accept="video/*,.mkv"
          />
        </div>
      </v-container>
    </v-container>
    <div v-if="this.results !== ''">
      <MovieBtnCards
        :btnTxt="this.btnTxt"
        :fileToModify="this.file"
        :filePath="this.path"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    path: "/mnt/Seagate-4To/__Videos/Films",
    btnTxt: "select",
    search: "",
    file: "",
    results: "",
    rules: [(value) => !!value || "Required."],
    baseURL: process.env.baseURL,
  }),
  methods: {
    getSearchResult(event) {
      this.file = event.target.files[0];
      let path = this.file.value;
      this.search = this.file.name;
      this.search = this.search.substring(0, this.search.indexOf(".")); //removes the extention of the filename

      // if the filename starts with year, remove it
      let theYear = this.search.substring(0, 4);
      if (!isNaN(parseInt(theYear))) {
        this.search = this.search.replace(theYear + " - ", "");
      }

      // remove everything after a dash
      if (this.search.indexOf("-") !== -1) {
        this.search = this.search.substring(0, this.search.indexOf("-"));
      }

      //get results from api
      this.$store.dispatch("moviesStore/getSearchResults", [
        this.search.replaceAll(" ", "+"),
        this.$cookiz.get("siteLang"),
      ]);
      this.results = "OK";
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
    this.$i18n.setLocale(this.$cookiz.get("siteLang"));
  },
};
</script>
<style scoped>
label {
  color: #fff;
  margin-top: 15px;
}
.backBtn {
  padding: 0;
  color: white;
}
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
  margin-left: 20px;
  color: white;
}
.pageDesc {
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
