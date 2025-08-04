
<template>
  
  <router-link :to="`/pokemon/${pokemon.name}`" class="pokemon-card-link">
    <div class="pokemon-card">
      <h3 class="pokemon-name">{{ pokemon.name }}</h3>
      <img :src="pokemon.image" :alt="pokemon.name" />
      <p class="pokemon-description">{{ pokemon.description }}</p>
    </div>
  </router-link>
</template>


<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.pokemon-card {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.pokemon-card img {
  width: 120px;
  height: 120px;
}
.pokemon-name {
  font-family: 'PokemonSolid', sans-serif;
  font-size: 26px;
  color: yellow;
  -webkit-text-stroke: 1px blue;
  text-shadow: 1px 1px 0 blue;
}
.pokemon-description {
  margin-top: 10px;
  font-size: 14px;
  color: white;
}

.pokemon-details {
  color: white; /* ✅ This makes all text inside white */
  text-align: center;
  padding: 2rem;}

</style>