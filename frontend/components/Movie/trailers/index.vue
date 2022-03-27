<template>
  <div id="movieTrailers" v-if="trailers.length > 0">
    <h3 class="mt-3">Trailers</h3>
    <div class="trailers" id="trailers" v-for="trailer in trailers">
      <iframe
        class="p-3 rounded"
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
  mounted() {
    let totalWidth = document
      .getElementById("movieTrailers")
      .getBoundingClientRect().width;

    this.width = totalWidth / 2;
    this.height = (this.width * 9) / 16;
  },
};
</script>
<style>
h3 {
  color: var(--color-fushia);
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
  font-size: 25px;
}
.trailers {
  display: inline-block;
}
</style>
