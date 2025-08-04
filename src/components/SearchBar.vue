<template>
  <div class="input-group mb-4">
    <input
      v-model="searchQuery"
      type="text"
      class="form-control"
      placeholder="Search Pokémon..."
      @input="emitSearch"
    />
    <button class="btn btn-primary" @click="emitSearch">
      Search
    </button>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref } from 'vue'

const searchQuery = ref('')
const emit = defineEmits(['search'])

const emitSearch = () => {
  emit('search', searchQuery.value)
}
</script>
