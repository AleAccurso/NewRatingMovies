<template>
  <div>
    <MovieOverviewMobile class="mobile" />
    <MovieOverviewDesktop class="desktop" />
  </div>
</template>
<style scoped>
.desktop {
  display: flex;
}
.mobile {
  display: none;
}
@media (max-width: 1024px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: flex;
  }
}
</style>
