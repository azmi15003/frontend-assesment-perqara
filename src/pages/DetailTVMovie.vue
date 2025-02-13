<template>
	<div class="bg-[#00000080]">
  <div class="h-[423px] w-full bg-[#FFFFFF0D] relative">
    <img 
      :src="`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`" 
      class="w-full h-full opacity-16 object-fill"
      alt="Movie Background"
    />
  </div>

  <div class="h-[80px] w-full bg-black">
    <div class="flex items-center justify-center h-full pl-4">
      <!-- CardMovieVue -->
      <div class="flex-shrink-0">
        <img alt="Poster of Wonder Woman 1984 movie" class="w-[220px] h-[330px] object-cover group-hover:opacity-50" height="330" :src="`https://image.tmdb.org/t/p/w500/${detail.poster_path}`" width="256"/>
      </div>

      <!-- Ikon bintang dan konten lainnya -->
      <div class="flex items-center gap-4 ml-4">
        <img class="h-15 w-15" src="@/assets/icon/star.svg" alt="Star Icon">
        <p class="text-4xl font-semibold">{{ detail.vote_average && detail.vote_average.toFixed(1) }}</p>
        <div class="border-r border-[#FFFFFF33] pr-5">
          <p class="text-xs text-[#FFFFFF80] font-medium">USER SCORE</p>
          <p class="text-white text-xs font-medium">{{ detail.vote_count }} VOTES</p>
        </div>
        <div class="border-r border-[#FFFFFF33] pr-5 pl-5">
          <p class="text-xs text-[#FFFFFF80] font-medium">STATUS</p>
          <p class="text-white text-xs font-medium">{{ detail.status }}</p>
        </div>
        <div class="border-r border-[#FFFFFF33] pr-5 pl-5">
          <p class="text-xs text-[#FFFFFF80] font-medium">LANGUAGE</p>
          <p class="text-white text-xs font-medium">{{ detail.spoken_languages && detail.spoken_languages[0].name }}</p>
        </div>
        <div class="border-r border-[#FFFFFF33] pr-5 pl-5">
          <p class="text-xs text-[#FFFFFF80] font-medium">BUDGET</p>
          <p class="text-white text-xs font-medium">{{ detail.budget ? formattedBudget(detail.budget) : '-' }}</p>
        </div>
        <div class="pr-5 pl-5">
          <p class="text-xs text-[#FFFFFF80] font-medium">PRODUCTION</p>
          <p class="text-white text-xs font-medium">{{ detail.production_companies && detail.production_companies[0].name }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Bagian Overview dan Reviews -->
  <div class="bg-[#ffffff] flex justify-center">
    <div class="flex flex-col w-full max-w-[1200px] px-4">
      <!-- Bagian Overview -->
      <div class="flex items-start mt-8 pl-[320px]"> <!-- pl-[220px] untuk sejajar dengan CardMovieVue -->
        <div class="flex flex-col gap-2">
          <p class="text-[#FF0000] text-sm font-semibold">OVERVIEW</p>
          <p class="font-normal text-sm leading-7 mb-3 tracking-normal text-black max-w-[526px]">
            {{ detail.overview }}
          </p>
        </div>
      </div>

      <!-- Bagian Reviews di bawah gambar -->
      <div class="mt-8 pl-[60px] mb-10">
        <p class="text-[#FF0000] text-sm font-semibold">REVIEWS</p>
        
        <div class="flex flex-wrap gap-6 h-[300px] overflow-y-auto">
          <div v-for="(review, idx) in listReview" 
            :key="idx" 
            class="mt-4 shadow-[0px_4px_4px_0px_#0000001A] bg-[#F9F9F9] rounded-xl p-5 w-[calc(50%-12px)]">
            
            <div class="flex justify-between items-center mb-5">
              <div class="flex items-center">
                <div class="bg-[#1E232B36] w-[48px] h-[48px] rounded-full" />
                <div class="ml-4">
                  <p class="text-black text-sm font-bold">{{ review.author }}</p>
                  <p class="text-xs text-[#666666]">{{ $moment(review.created_at).format('MMMM, DD, YYYY') }}</p>
                </div>
              </div>
              <div class="flex items-center justify-center p-1 bg-[#1E232B36] rounded-lg shadow-md w-[70px] h-[52px] relative">
                <img src="@/assets/icon/star.svg" alt="Star Icon" class="w-4 h-4 absolute left-2 top-2" />
                <p class="text-white text-xl md:text-2xl font-semibold ml-6">{{ review.author_details.rating }}</p>
              </div>
            </div>

            <div class="overflow-y-auto max-h-[200px] max-w-[582px] mb-5">
              <p class="font-normal text-sm leading-7 tracking-normal text-black">
                {{ review.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-[#1e232b] flex justify-center min-h-[512px] py-8">
    <div class="flex flex-col w-full max-w-[1200px] px-4">
      <p class="text-white mb-4 font-semibold mb-10">RECOMMENDATION MOVIES</p> <!-- Judul -->
      <div class="grid grid-cols-5 gap-5"> <!-- Container untuk CardMovieVue -->
        <div v-for="(recomend, idx) in listRecomendation" :key="idx">
          <CardMovieVue :detail="recomend" />
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import CardMovieVue from '../components/CardMovie.vue'
import { getDetailTVMovie, getReviewTVMovie, getRecomendationTVMovie } from '../api/movie'
import moment from 'moment'


export default {
  components: {
    CardMovieVue
  },
  data() {
    return {
      listReview: [],
      listRecomendation: [],
      detail: {},
      type: this.$route.name.split('-')[1],
      item: {
        original_title: "Sonic the Hedgehog 3",
        poster_path: 'https://image.tmdb.org/t/p/w500//zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg',
        vote_average: 7.771,
        release_date: "2024-12-19"
      }
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        this.getDetail()
        this.getReview()
        this.getRecomendation()
      },
    },
  },
  methods: {
    async getDetail() {
      const data = await getDetailTVMovie(this.$route.params.id, this.type)
      this.detail = data
    },
    formattedBudget(budget) {
      return budget.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })
    },
    async getRecomendation() {
      const data = await getRecomendationTVMovie(this.$route.params.id, this.type)

      this.listRecomendation = data.results
    },
    async getReview() {
      const data = await getReviewTVMovie(this.$route.params.id, this.type)

      this.listReview = data.results
    }
  }
}
</script>