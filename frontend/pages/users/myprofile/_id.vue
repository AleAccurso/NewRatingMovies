<template>
  <div v-if="isAuthenticated">
    <UIBigLogo />
    <v-container class="grey lighten-5 square">
      <!-- Back button -->
      <UIBackBtn :path="'users-myprofile'" />
      <!-- Page logo and title -->
      <div class="pageLogoTitle">
        <svg style="width: 65px; height: 65px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z"
          /></svg
        ><br />
        {{ $t("modifyMyProfile") }}
      </div>
      <!-- Form -->
      <v-container data-app>
        <form
          @submit.prevent="updateUserLoaded"
          enctype="multipart/form-data"
          method="post"
        >
          <div class="mb-3">
            <label for="nickname" class="form-label">{{
              $t("nickname")
            }}</label>
            <input
              type="text"
              class="form-control"
              name="nickname"
              aria-describedby="nickname"
              v-model="nickname"
            />
          </div>
          <div>
            <label for="email" class="form-label">{{
              $t("emailAddress")
            }}</label>
          </div>
          <div :class="['input-group', isEmailValid()]">
            <input
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              v-model="email"
            />
          </div>
          <div class="my-3">
            <label for="myLanguage" class="form-label">{{
              $t("language")
            }}</label>
            <select
              class="form-select langField"
              name="myLanguage"
              aria-label="Prefered language"
              v-model="userLang"
              required
            >
              <option
                v-for="locale in this.$i18n.locales"
                v-bind:value="locale.code"
              >
                {{ $t(locale.name) }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="avatar">{{ $t("profilePic") }}</label>
            <button @click="showPicUpload = true" v-if="!showPicUpload">
              <svg
                style="width: 20px; height: 20px; color: #22d157"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z"
                />
              </svg>
            </button>
            <UIPicUpload
              v-if="showPicUpload"
              :newProfilePic.sync="profilePic"
              :newPicLoaded="(newPicLoaded = true)"
              ref="picUpload"
            />
          </div>
          <button type="submit" class="btn confirmButton">
            {{ $t("modify") }}
          </button>
        </form>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPicUpload: false,
      newPicLoaded: false,
      baseURL: process.env.baseURL,
      nickname: "",
      email: "",
      userLang: "",
      profilePic: null,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // it check if user isAuthenticated
    },
  },
  methods: {
    isEmailValid: function () {
      return this.email == ""
        ? ""
        : this.reg.test(this.email)
        ? "has-success"
        : "has-error";
    },
    dataURLtoBlob(dataURL) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURLs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURL.split(",")[1]);

      // separate out the mime component
      var mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], { type: mimeString });
      return blob;
    },

    async updateUserLoaded() {
      let formData = new FormData();

      formData.append("nickname", this.nickname);
      formData.append("email", this.email);
      formData.append("userLang", this.userLang);
      formData.append("profilePic", this.profilePic);

      if (this.showPicUpload && this.newPicLoaded) {
        // Retrieve canvas info
        var MIME_TYPE = "image/png";
        let canvas = this.$refs.picUpload
          .getPic() // Get content of ref vueavatar in child component
          .getImageScaled(); // get picture with canvas size

        // Get the 2D context
        // let context = canvas.getContext("2d");

        // convert canvas into data for a PNG file
        let dataURL = canvas.toDataURL(MIME_TYPE);

        // Convert dataURL to blob
        var blob = this.dataURLtoBlob(dataURL);

        // Create new PNG file
        var newPNGFromCanvas = new File([blob], "newprofilePic.png", {
          type: MIME_TYPE,
        });

        // Append picture to formData
        formData.append("avatar", newPNGFromCanvas);
      }

      await this.$store.dispatch("updateLoggedUser", [
        this.$route.params.id,
        formData,
      ]);
      await this.$cookiz.set("siteLang", this.userLang);
      await this.$toast.success(this.$t("updateDone"));
      if (this.showPicUpload && this.newPicLoaded) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      this.$router.push("/myprofile");
    },
  },
  created() {
    let userLoadedUpdate = this.$store.getters.getUserInfo;

    this.nickname = userLoadedUpdate.nickname;
    this.email = userLoadedUpdate.email;
    this.userLang = userLoadedUpdate.language;
    this.profilePic = userLoadedUpdate.profilePic;

    let language = "";
    if (this.$cookiz.get("siteLang")) {
      language = this.$cookiz.get("siteLang");
    } else {
      language = "fr";
    }
    this.$i18n.setLocale(language);
  },
};
</script>

<style scoped>
.square {
  width: 700px;
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
.confirmButton {
  color: #fff;
  background-color: var(--color-rose);
  font-family: "Lato", sans-serif;
  margin-top: 10px;
  font-weight: 500;
  font-size: 17px;
  width: 100%;
}
label {
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
