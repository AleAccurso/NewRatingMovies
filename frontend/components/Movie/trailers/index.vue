<template>
  <div ref="movieTrailers" v-if="trailers.length > 0">
    <h3 class="ms-3 my-4">{{ $t("trailers") }}</h3>
    <div class="trailers" id="trailers" v-for="trailer in trailers">
      <iframe
        class="trailer"
        :src="baseVideoURL + trailer.key"
        :width="width"
        :height="height"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {
  props: ["trailers"],
  data() {
    return {
      baseVideoURL: process.env.VIDEO_URL,
      width: "",
      height: "",
    };
  },
  async mounted() {
    this.$nextTick(() => {
      let elem = this.$refs.movieTrailers;
      if (typeof elem != "undefined") {
        let totalWidth = elem.getBoundingClientRect().width;
        if (totalWidth < 500) {
          this.width = totalWidth;
          this.height = (this.width * 9) / 16;
        } else if (totalWidth >= 500 && totalWidth < 1024) {
          this.width = totalWidth / 2;
          this.height = (this.width * 9) / 16;
        } else {
          this.width = totalWidth / 3;
          this.height = (this.width * 9) / 16;
        }
      }
    });
  },
};
</script>
<style>
h3 {
  color: var(--color-fushia);
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
  font-size: 30px;
}
.trailers {
  display: inline-block;
}
.trailer {
  padding: 10px;
  border-radius: 20px;
  overflow: hidden;
}
</style>
