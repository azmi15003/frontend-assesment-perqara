import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Movie from '@/pages/Movie.vue'
import TV from '@/pages/Movie.vue'
import DetailTVMovie from '@/pages/DetailTVMovie.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/movie', component: Movie, name: 'movie' },
  { path: '/tv', component: TV, name: 'tv' },
  { path: '/movie/:id', component: DetailTVMovie, name: 'detail-movie' },
  { path: '/tv/:id', component: DetailTVMovie, name: 'detail-tv' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
