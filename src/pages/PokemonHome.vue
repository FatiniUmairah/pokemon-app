<template>
  <div class="container py-4">
    <h1 class="pokemon-title">Pokémon List</h1>
    <SearchBar @search="onSearch" />

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <!-- Group by 3 Pokémon per row -->
    <div
      v-for="(group, groupIndex) in groupedPokemon"
      :key="groupIndex"
      :class="['row p-3 rounded mb-3', groupIndex % 2 === 0 ? 'bg-pink' : 'bg-yellow']"
    >
      <div
        v-for="pokemon in group"
        :key="pokemon.name"
        class="col-md-4"
      >
        <PokemonCard :pokemon="pokemon" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePokemonStore } from '../store/pokemon'
import PokemonCard from '../components/PokemonCard.vue'
import SearchBar from '../components/SearchBar.vue'

const store = usePokemonStore()
const loading = ref(true)
const searchQuery = ref("")

const onSearch = (query) => {
  searchQuery.value = query
}
const groupedPokemon = computed(() => {
  const groups = []
  for (let i = 0; i < filteredPokemon.value.length; i += 3) {
    groups.push(filteredPokemon.value.slice(i, i + 3))
  }
  return groups
})


const filteredPokemon = computed(() =>
  store.pokemonList.filter(p =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

onMounted(async () => {
  await store.fetchPokemon()
  loading.value = false
})
</script>
<style scoped>
@font-face {
  font-family: 'PokemonSolid';
  src: url('@/assets/fonts/pokemon/Pokemon\ Solid.ttf') format('truetype');
}

.pokemon-title {
  font-family: 'PokemonSolid', sans-serif;
  font-size: 60px;
  color: yellow;
  -webkit-text-stroke: 2px blue; /* for Chrome/Safari */
  text-shadow: 2px 2px 0 blue;   /* fallback stroke effect */
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>

