<template>
  <div id="changeAvatar">
    <div class="d-flex justify-content-center" v-if="show">
      <div class="d-block">
        <div class="d-flex justify-content-between my-2">
          <label>
            <div>
              <span>Zoom : {{ scale }}x</span>
            </div>
            <input type="range" min="1" max="3" step="0.02" v-model="scale" />
          </label>
          <label class="ms-3">
            <div>
              <span>Rotation : {{ rotation }}°</span>
            </div>
            <input type="range" min="0" max="360" step="1" v-model="rotation" />
          </label>
        </div>
        <div>
          <vue-avatar
            :width="250"
            :height="250"
            :rotation="parseInt(rotation)"
            :borderRadius="parseInt(borderRadius)"
            :scale="parseFloat(scale)"
            ref="vueavatar"
            v-model="newProfilePic"
            @vue-avatar-editor:image-ready="onImageReady"
          ></vue-avatar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      rotation: 0,
      scale: 1,
      borderRadius: 0,
      newProfilePic: "",
    };
  },
  methods: {
    onImageReady() {
      this.scale = 1;
      this.rotation = 0;
      this.borderRadius = 200;
      this.$emit("newPicLoaded");
    },
    getPic() {
      return this.$refs.vueavatar;
    },
  },
};
</script>
<style scoped>
.clickButton {
  color: #fff;
  border: 1px solid var(--color-rose);
  font-family: "Lato", sans-serif;
  margin-top: 10px;
  font-weight: 500;
  font-size: 17px;
}
label {
  display: block;
  color: white;
}
span {
  color: white;
}
</style>
