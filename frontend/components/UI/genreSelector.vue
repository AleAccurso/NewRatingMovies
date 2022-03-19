<template>
  <v-app>
    <v-container fluid>
      <v-col
        cols="12"
        sm="12"
      >
        <v-select
          v-model="newGenre"
          :items="localGenres"
          :value="movieGenre"
          chips
          multiple
          outlined
          class="form-control"
          @input="$emit('update:newGenre', $event);"
        ></v-select>
      </v-col>
    </v-container>
  </v-app>
</template>
<script>
export default {
  props:['movieGenre','allGenres'],
  data(){
    return {
      newGenre: this.movieGenre
    }
  },
  computed : {
    localGenres(genres){
      let localGenres = [];
      this.allGenres.forEach((genre) =>{
        localGenres.push({
          text: this.$t(genre),
          value: genre
        });
      });
      return localGenres;
    }
  },
  created(){
    let siteLang = '';

    if(this.$cookiz.get('siteLang')){
      siteLang = this.$cookiz.get('siteLang')
    }
    else{
      siteLang = 'fr'
    }
    this.$i18n.setLocale(siteLang);
  }
}
</script>
<style scoped>
#app{
  background: none;
  max-height: 250px;
  background-color: #fff;
  border: 0px;
  border-radius: 5px;
}
.container--fluid{
  padding:0;
}
.v-select-list{
  background-color: #2C1033;
}
::v-deep .v-application--wrap {
  min-height: fit-content;
}
</style>
