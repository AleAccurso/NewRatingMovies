<template>
  <div>
    <div>
      <UIBigLogo />
    </div>
    <div class="formTopMargin">
      <v-container class="grey lighten-5 square">
        <div class="pageLogoTitle">
          <svg style="width: 65px; height: 65px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z"
            /></svg
          ><br />
          {{ $t("login") }}
        </div>
        <form @submit.prevent="login">
          <div class="mt-4">
            <input
              type="email"
              :placeholder="$t('emailAddress')"
              class="fields form-control mb-2"
              id="email"
              v-model="loginData.email"
              aria-describedby="emailHelp"
            />
            <input
              type="password"
              :placeholder="$t('password')"
              v-model="loginData.password"
              class="fields form-control"
              id="password"
              autocomplete="on"
            />
          </div>
          <button type="submit" class="btn w-100 confirmButton mt-3">
            {{ $t("toLogIn") }}
          </button>
        </form>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.loginData,
        });
        const userLang = response.data.language;
        this.$store.commit("SET_LANG", userLang);
        this.$cookiz.set("siteLang", userLang);
        this.$router.push("/");
      } catch (err) {
        this.$toast.error(err);
      }
    },
  },
  created() {
    this.$i18n.setLocale(this.$cookiz.get("siteLang"));
  },
};
</script>
<style scoped>
.formTopMargin {
  display: block;
  padding-top: 17px;
}
.square {
  width: 600px;
  padding: 30px;
  background-color: #ffffff20;
  border-radius: 14px;
}
.pageLogoTitle {
  color: #ffffff79;
  font-family: "Ubuntu", sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 50px;
}
.confirmButton {
  color: #fff;
  background-color: var(--color-rose);
  font-family: "Lato", sans-serif;
  margin-top: 10px;
  font-weight: 500;
  font-size: 17px;
}
.fields {
  color: var(--color-rose);
  font-family: "Lato", sans-serif;
  font-weight: 500;
  font-size: 17px;
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
