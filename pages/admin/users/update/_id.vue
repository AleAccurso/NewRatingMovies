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
            d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z"
          /></svg
        ><br />
        {{ $t("modifyUser") }}
      </div>
      <!-- Form -->
      <form @submit.prevent="updateUser">
        <div class="mt-3">
          <label for="nickname" class="form-label">{{ $t("nickname") }}</label>
          <input
            type="text"
            class="form-control"
            id="nickname"
            aria-describedby="nickname"
            v-model="nickname"
          />
        </div>
        <div class="my-2">
          <label for="exampleInputEmail1" class="form-label">{{
            $t("emailAddress")
          }}</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="email"
          />
        </div>
        <div>
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
        <div class="mt-2">
          <label for="flexCheckDefault" class="form-check-label">Admin?</label>
          <div class="form-check mt-1">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              v-model="isAdmin"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary confirmButton mt-4">
          {{ $t("modify") }}
        </button>
      </form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      user: [],
      nickname: "",
      email: "",
      userLang: "",
      isAdmin: "",
      baseURL: process.env.baseURL,
    };
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
  methods: {
    async updateUser() {
      await this.$store.dispatch("usersStore/updateUser", {
        _id: this.$route.params.id,
        nickname: this.nickname,
        email: this.email,
        language: this.userLang,
        isAdmin: this.isAdmin,
      });
      this.$toast.success(this.$t("updateDone"));
      this.$router.push("/admin");
    },
  },
  created() {
    let userUpdate = this.$store.getters["usersStore/getUserById"](
      this.$route.params.id
    );
    if (userUpdate) {
      this.nickname = userUpdate.nickname;
      this.email = userUpdate.email;
      this.userLang = userUpdate.language;
      this.isAdmin = userUpdate.isAdmin;
    } else {
      this.$router.push("/admin");
    }

    if (this.$cookiz.get("siteLang")) {
      this.$i18n.setLocale(this.$cookiz.get("siteLang"));
    } else {
      this.$i18n.setLocale("fr");
    }
  },
};
</script>

<style scoped>
.backBtn {
  padding: 0;
  color: var(--color-rose);
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
  font-size: calc(40px + (60 - 40) * ((100vw - 1024px) / (4096 - 1024)));
  white-space: nowrap;
}
.confirmButton {
  color: #fff;
  background-color: var(--color-rose);
  font-family: "Lato", sans-serif;
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
      14px + (50 - 14) * ((100vw - 300px) / (620 - 300))
    ); /* font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))); */
    white-space: nowrap;
    margin-bottom: 30px;
  }
}
</style>
