<template>
  <div class="container">

 

<div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 50vh;">
  <div class="spinner-border text-light" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>



    <div v-else>
      <h1 class="pokemon-title">{{ pokemon.name }}</h1>
      <img :src="pokemon.image" :alt="pokemon.name" class="img-fluid mb-4 float-animation" />
      <p><strong>Height:</strong> {{ pokemon.height }}</p>
      <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
      <p><strong>Description:</strong> {{ pokemon.description }}</p>

     <div class="d-flex justify-content-center gap-3 mt-4">
  <router-link to="/" class="btn btn-primary">Back to list</router-link>

  <button class="btn btn-warning" @click="isEditing = !isEditing">
    {{ isEditing ? 'Cancel Edit' : 'Edit Info' }}
  </button>
</div>


      <!-- Edit Form -->
      <div v-if="isEditing" class="mt-4 text-start">
        <form @submit.prevent="saveChanges">
          <div class="mb-2">
            <label>Name:</label>
            <input v-model="edited.name" class="form-control" required />
          </div>
          <div class="mb-2">
            <label>Height:</label>
            <input v-model="edited.height" type="number" class="form-control" />
          </div>
          <div class="mb-2">
            <label>Weight:</label>
            <input v-model="edited.weight" type="number" class="form-control" />
          </div>
          <div class="mb-2">
            <label>Description:</label>
            <textarea v-model="edited.description" class="form-control" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-success">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '../store/pokemon'
import axios from 'axios'

const route = useRoute()
const store = usePokemonStore()
const loading = ref(true)
const pokemon = ref({})
const isEditing = ref(false)
const edited = ref({})

onMounted(async () => {
  const name = route.params.name

  const detailsRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)

  const descriptionEntry = speciesRes.data.flavor_text_entries.find(
    entry => entry.language.name === 'en'
  )

  pokemon.value = {
    name: detailsRes.data.name,
    image: detailsRes.data.sprites.other['official-artwork'].front_default,
    height: detailsRes.data.height,
    weight: detailsRes.data.weight,
    description: descriptionEntry
      ? descriptionEntry.flavor_text.replace(/\n|\f/g, ' ')
      : 'No description available.'
  }

  edited.value = { ...pokemon.value }
  loading.value = false
})

function saveChanges() {
  pokemon.value = { ...edited.value }
  store.updatePokemon(pokemon.value.name, edited.value)
  isEditing.value = false
}
</script>

<style scoped>
.pokemon-title {
  font-family: 'PokemonSolid', sans-serif;
  font-size: 48px;
  color: yellow;
  -webkit-text-stroke: 2px blue;
  text-shadow: 2px 2px 0 blue;
}
.container {
  color: white;
  text-align: center;
  padding: 2rem;
}
.spinner-border {
  width: 3rem;
  height: 3rem;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.float-animation {
  animation: float 1.0s ease-in-out infinite;
}

</style>
