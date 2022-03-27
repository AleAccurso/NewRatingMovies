<template>
  <div class="text-center">
    <v-pagination
      v-model="pagination.page"
      @input="next"
      :length="pagination.total / pagination.perPage"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      color="var(--color-fushia)"
    ></v-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagination: {
        page: 1,
        total: 20,
        perPage: 5,
      },
    };
  },
  methods: {
    next(page) {
      console.log(page);
    },
  },
};
</script>
