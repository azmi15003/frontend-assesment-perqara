<template>
    <div class="bg-[#1e232b] text-white overflow-hidden w-full h-full group">
        <div class="relative">
            <img alt="Poster of Wonder Woman 1984 movie" class="w-full h-[330px] object-cover group-hover:opacity-50" height="330" :src="`https://image.tmdb.org/t/p/w500/${detail.poster_path}`" width="256"/>
            <div class="absolute top-0 right-0 bg-[#1E232BCC] bg-opacity-75 text-white text-lg font-bold px-2 py-1">
                {{ detail.vote_average && detail.vote_average.toFixed(1) }}
            </div>
            <div class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer">
                <div class="flex items-center text-yellow-400 text-2xl">
                    <img class="h-8 w-8 mr-2" src="@/assets/icon/star.svg">
                    <span class="ml-1 text-2xl font-semibold">{{ detail.vote_average && detail.vote_average.toFixed(1) }}</span>
                </div>
                <div class="text-xl mt-2">Action</div>
                <button class="mt-4 bg-red-500 text-white text-lg font-semibold px-6 py-2 rounded-full cursor-pointer" @click="goDetail(detail.id)">VIEW</button>
            </div>
        </div>
        <div class="p-4">
            <p class="text-base font-semibold">{{ detail.original_title }}</p>
            <div class="text-gray-400">{{ detail.release_date && detail.release_date.slice(0, 4) }}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({})
    },
    path: {
      type: String,
      default: 'movie'
    }
  },
  data() {
    return {

    }
  },
  methods: {
    goDetail(id) {
        this.$router.push(`/${this.path}/${id}`)
    }
  }
}
</script>