<template>
  <div class="background">
    <router-view />
  </div>
</template>

<script setup>
// No script needed here unless you add a layout later
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* Fullscreen GIF background */
.background {
  background-image: url('bg.gif'); /* from public folder */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
}
@font-face {
  font-family: 'PokemonSolid';
  src: url('@/assets/fonts/pokemon/Pokemon Solid.ttf') format('truetype');
}

@font-face {
  font-family: 'PokemonHollow';
  src: url('@/assets/fonts/pokemon/Pokemon Hollow.ttf') format('truetype');
}

</style>
