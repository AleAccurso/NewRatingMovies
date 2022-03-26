<template>
  <div>
    <div>
      <UIBigLogo />
    </div>
    <div class="formTopMargin">
      <v-container class="grey lighten-5 square">
        <div class="loginTitle">
          <svg style="width: 65px; height: 65px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M21.7 14.4L20.7 15.4L18.6 13.3L19.6 12.3C19.8 12.1 20.2 12.1 20.4 12.3L21.7 13.6C21.9 13.8 21.9 14.1 21.7 14.4M12 19.9L18.1 13.8L20.2 15.9L14.1 22H12V19.9M10 19.1L21 8.1V5L12 1L3 5V11C3 15.8 5.9 20.3 10 22.3V19.1Z"
            /></svg
          ><br />
          {{ $t("register") }}
        </div>
        <form @submit.prevent="register" class="mt-3">
          <input
            type="text"
            :placeholder="$t('nickname')"
            v-model="registerData.nickname"
            class="fields form-control"
            id="nickname"
          />
          <input
            type="email"
            :placeholder="$t('emailAddress')"
            class="fields form-control my-2"
            id="email"
            v-model="registerData.email"
            aria-describedby="emailHelp"
          />
          <input
            type="password"
            :placeholder="$t('password')"
            v-model="registerData.password"
            class="fields form-control mb-2"
            id="password"
            autocomplete="on"
          />
          <select
            class="form-select"
            aria-label="Prefered language"
            v-model="registerData.language"
            required
            :class="registerData.language === '' ? 'language' : 'fields'"
          >
            <option selected value="" class="language">
              {{ $t("language") }}
            </option>
            <option
              v-for="locale in this.$i18n.locales"
              v-bind:value="locale.code"
              class="fields"
            >
              {{ $t(locale.name) }}
            </option>
          </select>
          <button type="submit" class="btn w-100 registerButton mt-3">
            {{ $t("toRegister") }}
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
      registerData: {
        nickname: "",
        email: "",
        password: "",
        language: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        const user = await this.$axios.$post("/auth/register", {
          name: this.registerData.nickname,
          email: this.registerData.email,
          password: this.registerData.password,
          language: this.registerData.language,
        });
      } catch (err) {
        this.$toast.error(err);
      }
      this.$router.push("/auth/login");
    },
  },
  created() {
    let siteLang = "";

    if (this.$cookiz.get("siteLang")) {
      siteLang = this.$cookiz.get("siteLang");
    } else {
      siteLang = "fr";
    }

    this.$i18n.setLocale(siteLang);
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
.loginTitle {
  color: #ffffff79;
  font-family: "Ubuntu", sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 50px;
}
.registerButton {
  color: #fff;
  background-color: var(--color-rose);
  font-family: "Lato", sans-serif;
  font-weight: 500;
  font-size: 17px;
}
.fields {
  color: var(--color-rose);
  font-family: "Lato", sans-serif;
  font-weight: 500;
  font-size: 17px;
}
.language {
  color: #6c757d;
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
