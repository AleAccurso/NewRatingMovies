<template>
  <div class="text-center" v-if="buttonsLength > 1">
    <v-pagination
      v-model="page"
      :length="buttonsLength"
      @input="next"
      :total-visible="7"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      color="var(--color-fushia)"
      circle
    ></v-pagination>
  </div>
</template>
<script>
export default {
  props: ["perPage", "totalItems"],
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    buttonsLength() {
      return Math.ceil(this.totalItems / this.perPage);
    },
  },
  methods: {
    next(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>
