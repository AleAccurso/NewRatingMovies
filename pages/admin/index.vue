<template>
  <div v-if="roleIsAdmin">
    <UIBigLogo />
    <v-card class="margin">
      <v-toolbar dark flat height="88">
        <div class="adminTitle">
          <svg style="width: 50px; height: 50px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1M16 14H8V15.5C8 15.77 8.19 15.96 8.47 16L8.57 16H15.43C15.74 16 15.95 15.84 16 15.59L16 15.5V14M17 8L17 8L14.33 10.67L12 8.34L9.67 10.67L7 8L7 8L8 13H16L17 8Z"
            />
          </svg>
          {{ $t("administration") }}
        </div>
        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="item in [$t('users'), $t('movies')]" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in [$t('users'), $t('movies')]" :key="item">
          <v-card v-if="item === $t('users')" class="tableMain">
            <AdminUsersDesktop :siteLang="language" />
            <AdminUsersMobile :siteLang="language" />
          </v-card>
          <v-card v-else class="tableMain">
            <AdminMoviesDesktop :siteLang="language" />
            <AdminMoviesMobile :siteLang="language" />
          </v-card>
        </v-tab-item>
        <UIBtnTop :showAt="300" />
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      language: "",
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
  created() {
    this.$i18n.setLocale(this.$cookiz.get("siteLang"));
    this.language = this.$store.getters.getSiteLang;
  },
};
</script>

<style scoped>
.v-toolbar {
  height: 150px;
}
.theme--dark.v-toolbar.v-sheet {
  background-color: var(--color-fushia);
}
.table {
  color: #fff;
}
.tableMain {
  padding: 40px;
}
.adminTitle {
  color: #ffffff79;
  font-family: "Ubuntu", sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: calc(
    40px + (60 - 40) * ((100vw - 1024px) / (4096 - 1024))
  ); /* font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))); */
}
.v-tabs:not(.v-tabs--vertical) .v-tab {
  white-space: normal;
}
.v-tabs {
  width: 100%;
  padding-left: 20px;
}
.margin {
  margin-top: 42px;
}
.desktop {
  display: block;
}
.mobile {
  display: none;
}

@media (max-width: 1024px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }
  .tableMain {
    margin-top: 10px;
    padding: 10px;
  }
  .adminTitle {
    font-size: calc(
      30px + (50 - 30) * ((100vw - 300px) / (620 - 300))
    ); /* font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))); */
  }
}
</style>
