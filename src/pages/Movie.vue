<template>
  <div class="flex flex-col min-h-screen">
    <!-- Konten utama -->
    <div class="flex-grow bg-page">
      <div class="h-[323px] w-full bg-[#FFFFFF0D] pl-[10%] pt-[5%]">
        <div class="w-[112px] h-1 bg-[#E74C3C]" />
        <p class="text-4xl font-semibold">{{ path === 'movie' ? 'Movies' : 'TV Show' }}</p>
      </div>

      <section class="py-10">
        <div class="flex flex-col xl:flex-row gap-6 xl:gap-10 xl:mt-[-10%] xl:ml-[10%] xl:mr-[10%]">
          <div class="w-full xl:w-[25%]">
            <div class="bg-gradient-to-b from-[#0E1723] to-transparent p-4 rounded-lg">
              <h2 class="text-lg font-medium mb-4 pb-4" style="border-bottom: 1px solid #FFFFFF12">Sort Result By</h2>
              <div class="mb-6">
                <select class="w-full bg-gray-700 text-white p-2 rounded" @change="sortingBy">
                  <option value="popularity.desc">Popularity Descending</option>
                  <option value="popularity.asc">Popularity Ascending</option>
                  <option value="first_air_date.asc">Release Date Ascending</option>
                  <option value="first_air_date.desc">Release Date Descending</option>
                  <option value="vote_count.asc">Rating Ascending</option>
                  <option value="vote_count.desc">Rating Descending</option>
                </select>
              </div>

              <h2 class="text-lg font-medium mb-4 py-4" style="border-bottom: 1px solid #FFFFFF12; border-top: 1px solid #FFFFFF12">Genres</h2>
              <div>
                <div class="space-y-2">
                  <label v-for="(genre, idx) in listGenre" :key="idx" class="flex items-center justify-between w-full">
                    <span>{{ genre.name }}</span>
                    <input type="checkbox" class="form-checkbox text-red-500" :value="genre.id" @change="toggleGenreSelection(genre.id, $event)">
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full xl:w-[75%] mb-[50px]">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div v-for="(item, idx) in movies" :key="idx" class="rounded-lg">
                <CardMovieVue :detail="item" :path="path" />
              </div>
            </div>
            <div class="flex justify-center mt-6 pointer">
              <button 
                @click="loadMoreMovies" 
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import CardMovieVue from '../components/CardMovie.vue'
import CardHeadingVue from '../components/CardHeading.vue'
import { getGenreList } from '../api/movie'



export default {
	components: {
		CardHeadingVue,
		CardMovieVue
	},
	data() {
		return {
			page: 1,
			listGenre: [],
			selectedGenres: [],
      path: this.$route.name,
      sortBy: 'popularity.desc'
		}
	},
	computed: {
    movies() {
      return this.$store.getters.getMovies
    },
  },
  watch: {
    '$route.name'(newRoute, oldRoute) {
      this.path = newRoute
      this.init()
    }
  },
  mounted() {
    this.init()
  },
	methods: {
    init() {
      this.$store.dispatch('fetchMovies', { page: this.page, genre: '', type: this.path, sort: this.sortBy })
      this.getApi()
    },
    sortingBy(e) {
      this.sortBy = e.target.value
      this.$store.dispatch('fetchMovies', { page: this.page, genre: '', type: this.path, sort: this.sortBy })
    },
		loadMoreMovies() {
			const genreIds = this.selectedGenres.join(',')
      this.page++
      this.$store.dispatch('fetchMovies', { page: this.page, genre: genreIds, type: this.path, sort: this.sortBy })
    },
		async getApi() {
		const data = await getGenreList(this.path)
		this.listGenre = data.genres
	  },
		async toggleGenreSelection(genreId, event) {
			if (event.target.checked) {
				this.selectedGenres.push(genreId)
			} else {
				this.selectedGenres = this.selectedGenres.filter(id => id !== genreId)
			}

			const genreIds = this.selectedGenres.join(',')

			this.$store.dispatch('fetchMovies', { page: this.page, genre: genreIds, type: this.path, sort: this.sortBy })
		}
	}
}
</script>