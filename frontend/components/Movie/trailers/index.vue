<template>
  <div>
    <div class="movieTrailer" v-if="showTrailer">
      <iframe
        class="trailer"
        :src="baseVideoURL + videoKey"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; gyroscope"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
