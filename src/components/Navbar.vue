<template>
  <nav class="bg-[#292e36] text-white py-4 z-20 w-full top-0 relative">
		<div class="container mx-auto flex items-center justify-between px-4">
      <router-link to="/">
        <div class="flex items-center" @click="goDefault">
          <img src="@/assets/logo/logo.svg" alt="Logo" class="h-8 md:h-10">
        </div>
      </router-link>

			<div class="hidden md:flex items-center bg-[#00000021] rounded-lg overflow-hidden w-[571px] h-[36px]">
				<div class="p-2">
					<img src="@/assets/icon/clip.svg" alt="Clip Icon">
				</div>

				<input
					v-model="search"
					@input="searchKeywords"
					class="bg-[#00000021] text-white focus:outline-none w-full"
					:placeholder="`Find ${$route.name ? route.name : 'Movie'}`"
					type="text"
				/>
				<button class="p-2">
					<img src="@/assets/icon/search.svg" alt="Search Icon">
				</button>
			</div>

			<div class="hidden md:flex items-center space-x-6">
				<a class="text-white flex items-center" href="#">
					<i class="fas fa-th-large mr-2"></i> CATEGORIES
				</a>
				<router-link to="/movie">MOVIES</router-link>
				<router-link to="/tv">TV SHOWS</router-link>
				<a class="text-white" href="#">LOGIN</a>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      search: null,
      suggestions: []
    }
  },
  methods: {
    searchMovies() {
      if (this.search.trim()) {
        this.$store.dispatch('searchMovie', this.search)
      }
    },
    searchKeywords() {
      if (this.search.trim().length > 2) {
        this.fetchSuggestions(this.search)
      } else {
        this.suggestions = []
				this.searchMovies()
      }
    },
    async fetchSuggestions(query) {
      const url = `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1`
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWZiNTgzNzYyNmQyYzRkMjJlMjNmNzE3YjM5YmUzMyIsIm5iZiI6MTczOTE5NzU3Ny4wMTgsInN1YiI6IjY3YWEwYzg5MmZiYWM0MGI5MDkzODA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvgEcOYVp_rI_GRdp2YJiPhH0LnOORb1wvDflDdAWrQ'
        }
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()
        
        if (data && data.results) {
          this.suggestions = data.results
        } else {
          console.error('No results found in API response.')
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error)
      }
    },

    selectSuggestion(suggestion) {
      this.search = suggestion.name
			this.searchMovies()
      this.suggestions = []
    }
  },
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: #292e36;
    z-index: 1000;
  }
}
</style>