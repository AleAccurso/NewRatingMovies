<template>
  <v-container class="grey lighten-5 mainLogo" id="logo">
    <img id= "bigLogo" :src="require(`~/assets/ratingMoviesLogo.png`)" alt="Rating Movies Logo" />
  </v-container>
</template>

<style scoped>
#logo{
    display:block;
    margin: 30px 0;
    padding: 0;
    text-align: center;
}

#logo img{
  width: auto;
  max-height: 150px;
}

@media (max-width: 1024px) {
  #logo img{
    max-height: 100px;
    width: auto;
  }
}
</style>
