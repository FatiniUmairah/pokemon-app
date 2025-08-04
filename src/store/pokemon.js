import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonList: []
  }),
  actions: {
    async fetchPokemon() {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')

      const detailsList = await Promise.all(
        res.data.results.map(async (p) => {
          const pokeDetails = await axios.get(p.url)
          
          // 👇 Fetch description from species endpoint
          const speciesDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${p.name}`)
          const flavorEntry = speciesDetails.data.flavor_text_entries.find(
            entry => entry.language.name === 'en'
          )

          return {
            name: pokeDetails.data.name,
            image: pokeDetails.data.sprites.front_default,
            height: pokeDetails.data.height,
            weight: pokeDetails.data.weight,
            description: flavorEntry ? flavorEntry.flavor_text.replace(/\n|\f/g, ' ') : 'No description found'
          }
        })
      )

      this.pokemonList = detailsList
    },

    // ✅ Add this
    updatePokemon(name, updatedData) {
      const index = this.pokemonList.findIndex(p => p.name === name)
      if (index !== -1) {
        this.pokemonList[index] = {
          ...this.pokemonList[index],
          ...updatedData
        }
      }
    }
  }
})
