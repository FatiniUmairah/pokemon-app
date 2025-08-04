import { createRouter, createWebHistory } from 'vue-router'
import PokemonHome from '../pages/PokemonHome.vue'
import PokemonDetails from '../pages/PokemonDetails.vue'

const routes = [
  { path: '/', component: PokemonHome },
  { path: '/pokemon/:name', component: PokemonDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
