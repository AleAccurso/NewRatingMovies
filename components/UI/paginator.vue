<template>
  <v-pagination
    id="paginator"
    v-if="buttonsLength > 1"
    v-model="page"
    :length="buttonsLength"
    @input="next"
    :total-visible="nbButtons"
    prev-icon="mdi-menu-left"
    next-icon="mdi-menu-right"
    color="var(--color-fushia)"
    circle
  ></v-pagination>
</template>
<script>
export default {
  props: ["perPage", "totalItems"],
  data() {
    return {
      page: 1,
      nbButtons: "",
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
  beforeMount() {
    // set number of visible buttons
    this.$screen.width <= 1024 ? (this.nbButtons = 3) : (this.buttons = 7);
  },
};
</script>
