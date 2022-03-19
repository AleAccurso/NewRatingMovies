<template>
  <div id="myprofile">
    <UIBigLogo />
    <div class="welcome">
      <span id="nickname">{{ $t("welcome") }} {{ loggedUser.nickname }}</span>
      <nuxt-link
        :to="{
          name: `myprofile-update-id___${locale}`,
          params: { id: loggedUser.id },
          hash: '#logo',
        }"
        class="ms-3"
      >
        <button>
          <svg
            style="width: 24px; height: 24px; color: #22d157"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z"
            />
          </svg>
        </button>
      </nuxt-link>
    </div>
    <div class="profileInfo">
      <img
        class="portrait"
        :src="gcsPicURL + loggedUser.profilePic"
        alt="Profile Pic"
        v-show="isLoaded"
        @load="loaded"
      />
      <v-card class="bussinessCard">
        <div id="infos">
          <div class="d-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="24"
              fill="currentColor"
              class="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
              />
            </svg>
            <span>{{ loggedUser.nickname }}</span>
          </div>
          <div class="d-flex mt-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              fill="currentColor"
              class="bi bi-envelope mt-1"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
              />
            </svg>
            <span>{{ loggedUser.email }}</span>
          </div>
          <div class="d-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              fill="currentColor"
              class="bi bi-flag mt-1"
              viewBox="0 0 16 16"
            >
              <path
                d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"
              />
            </svg>
            <span v-if="loggedUser.language === 'fr'">{{ $t("french") }}</span>
            <span v-if="loggedUser.language === 'en'">{{ $t("english") }}</span>
            <span v-if="loggedUser.language === 'nl'">{{ $t("dutch") }}</span>
            <span v-if="loggedUser.language === 'it'">{{ $t("italian") }}</span>
          </div>
        </div>
        <div class="miniLogo">
          <img class="picMiniLogo" src="~/assets/flavicon.png" alt="" />
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: "",
      gcsPicURL: process.env.gcsPicURL,
      loggedUser: "",
      isLoaded: false,
      isLoading: false,
    };
  },
  methods: {
    loaded() {
      this.isLoaded = true;
      this.isLoading = false;
    },
    toggleimg() {
      if (this.imgsrc == "") {
        this.isLoaded = false;
        this.isLoading = true;
        this.imgsrc = "https://images2.alphacoders.com/103/1039991.jpg";
        this.btntext = "Hide Image";
      } else {
        this.imgsrc = "";
        this.btntext = "Show Image";
      }
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    });
  },
  created() {
    this.loggedUser = this.$store.getters.getUserInfo;
    if (this.$cookiz.get("siteLang")) {
      this.locale = this.$cookiz.get("siteLang");
    } else {
      this.locale = "fr";
    }
    this.$i18n.setLocale(this.locale);
  },
};
</script>

<style scoped>
#myprofile {
  height: 100%;
  display: block;
}
.margin {
  margin-top: 32px;
}
.portrait {
  margin-top: 5px;
  width: 200px;
  height: auto;
  max-height: 200px;
  border-radius: 50%;
  object-fit: cover;
}
.profileInfo {
  display: flex;
  justify-content: center;
}
.v-card {
  height: 200px;
  width: 400px;
  margin-left: 50px;
  padding: 15px;
  background-color: #fefefe;
}
.welcome {
  font-size: 32px;
  color: #fefefe;
  text-align: center;
  margin: 30px 0 50px 0;
}
span {
  padding-left: 15px;
  color: #931d87;
}
.bussinessCard {
  display: flex;
  flex-flow: column;
  font-size: 18px;
}
.miniLogo {
  flex-grow: 1;
  position: relative;
}
.picMiniLogo {
  height: 35px;
  width: auto;
  position: absolute;
  bottom: 0;
  right: 0;
}

@media (max-width: 1024px) {
  .profileInfo {
    display: block;
    text-align: center;
  }
  .v-card {
    margin: auto;
  }
  .portrait {
    width: 40%;
    max-width: 200px;
    margin-bottom: 40px;
  }
}
</style>
