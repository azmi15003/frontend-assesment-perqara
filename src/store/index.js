import { createStore } from 'vuex'

export default createStore({
  state: {
    movies: [],
  },
  mutations: {
    setMovies(state, { newMovies, genre, page }) {
      if (genre && page <= 1 || page === 1) {
        state.movies = newMovies
      } else {
        state.movies = [...state.movies, ...newMovies]
      }
    },
  },
  actions: {
    async fetchMovies({ commit }, { page = 1, genre = '', type = 'movie', sort = 'popularity.desc' } = {}) {
      const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sort}&with_genres=${genre}`
      try {
        const response = await fetch(url, {
          method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWZiNTgzNzYyNmQyYzRkMjJlMjNmNzE3YjM5YmUzMyIsIm5iZiI6MTczOTE5NzU3Ny4wMTgsInN1YiI6IjY3YWEwYzg5MmZiYWM0MGI5MDkzODA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvgEcOYVp_rI_GRdp2YJiPhH0LnOORb1wvDflDdAWrQ'
            }
        })
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
    
        const data = await response.json()
        commit('setMovies', { newMovies: data.results, genre, page })
        return data
      } catch (error) {
        console.error(error)
      }
    },
    async searchMovie({ commit }, search) {
      const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWZiNTgzNzYyNmQyYzRkMjJlMjNmNzE3YjM5YmUzMyIsIm5iZiI6MTczOTE5NzU3Ny4wMTgsInN1YiI6IjY3YWEwYzg5MmZiYWM0MGI5MDkzODA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvgEcOYVp_rI_GRdp2YJiPhH0LnOORb1wvDflDdAWrQ'
        }
      }

      try {
        const response = await fetch(url, options)

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }

        const data = await response.json()
        
        commit('setMovies', data.results)
      } catch (err) {
        console.error('Error fetching movie data:', err)
      }
    },
  },
  getters: {
    getMovies(state) {
      return state.movies
    },
  },
})
