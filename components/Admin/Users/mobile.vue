<template>
  <div v-if="roleIsAdmin" id="adminUsersMobile">
    <div v-if="allUsers.length > 0">
      <v-card v-for="user in allUsers" :key="user._id">
        <table>
          <tr>
            <td class="infoTitle">#</td>
          </tr>
          <tr>
            <td class="infoText">{{ user._id }}</td>
          </tr>
          <tr>
            <td class="infoTitle">{{ $t("nickname") }}</td>
          </tr>
          <tr>
            <td class="infoText">{{ user.nickname }}</td>
          </tr>
          <tr>
            <td class="infoTitle">{{ $t("emailAddress") }}</td>
          </tr>
          <tr>
            <td class="infoText">{{ user.email }}</td>
          </tr>
          <tr>
            <td class="infoTitle">{{ $t("language") }}</td>
          </tr>
          <tr v-if="user.language === 'fr'">
            <td class="infoText">{{ $t("french") }}</td>
          </tr>
          <tr v-if="user.language === 'en'">
            <td class="infoText">{{ $t("english") }}</td>
          </tr>
          <tr v-if="user.language === 'nl'">
            <td class="infoText">{{ $t("dutch") }}</td>
          </tr>
          <tr v-if="user.language === 'it'">
            <td class="infoText">{{ $t("italian") }}</td>
          </tr>
          <tr>
            <td class="infoTitle">{{ $t("admin") }}</td>
          </tr>
          <tr v-if="user.isAdmin">
            <td><img class="true" src="@/assets/true.png" alt="true.png" /></td>
          </tr>
          <tr v-else>
            <td>
              <img class="false" src="@/assets/false.png" alt="true.png" />
            </td>
          </tr>
        </table>
        <div class="d-flex justify-content-evenly">
          <nuxt-link
            :to="{
              name: `admin-users-update-id___${locale}`,
              params: { id: user._id },
              hash: '#logo',
            }"
          >
            <svg
              style="width: 24px; height: 24px; color: #22d157"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z"
              />
            </svg>
          </nuxt-link>
          <button @click="deleteUser(user._id)">
            <svg
              style="width: 24px; height: 24px; color: #ad0545"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
              />
            </svg>
          </button>
        </div>
      </v-card>
    </div>
    <div v-else>
      <span>{{ $t("noUserInDB") }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: "",
    };
  },
  methods: {
    async deleteUser(_id) {
      if (confirm(this.$t("deleteUserOK"))) {
        await this.$store.dispatch("usersStore/deleteUser", _id);
        this.$toast.success(this.$t("deleteDone"));
      }
    },
  },
  computed: {
    allUsers() {
      return this.$store.getters["usersStore/getUsers"];
    },
    roleIsAdmin() {
      if (this.$store.getters.roleIsAdmin === true) {
        return true;
      } else {
        this.$router.push("/");
      }
    },
  },
  created() {
    this.locale = this.$cookiz.get("siteLang");
    this.$i18n.setLocale(this.locale);
  },
  async beforeCreate() {
    await this.$store.dispatch("usersStore/setUsers");
  },
};
</script>

<style scoped>
#adminUsersMobile {
  display: block;
}
.v-card {
  border: 1px white solid;
  margin: 10px 0;
  padding: 10px;
}
.infoTitle {
  font-family: "Lato", sans-serif;
  font-weight: 600;
  color: var(--color-fushia);
  font-size: 17px;
}
.infoText {
  color: #fff;
  padding-left: 15px;
}
.true {
  height: 20px;
  width: auto;
  margin-left: 20px;
}
.false {
  height: 18px;
  width: auto;
  margin-left: 20px;
}

@media (min-width: 1025px) {
  #adminUsersMobile {
    display: none;
  }
}
</style>
