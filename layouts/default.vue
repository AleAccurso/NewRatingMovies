<template>
  <div>
    <layouts-header />
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<style>
* {
    box-sizing: border-box;
}
html{
  min-width: 100%;
  min-height: 150%;
}
body
{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background: -moz-linear-gradient(270deg, rgba(7,17,29,1) 0%, rgba(82,15,73,1) 48%, rgba(7,17,29,1) 100%);
    background: -webkit-linear-gradient(270deg, rgba(7,17,29,1) 0%, rgba(82,15,73,1) 48%, rgba(7,17,29,1) 100%);
    background: linear-gradient(270deg, rgba(7,17,29,1) 0%, rgba(82,15,73,1) 48%, rgba(7,17,29,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#07111d",endColorstr="#07111d",GradientType=1);
}
</style>
