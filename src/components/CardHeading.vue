<template>
  <div class="flex items-center">
    <div class="h-[364px] w-[243px]">
      <img class="h-full object-cover" :src="`https://image.tmdb.org/t/p/w500/${detail.poster_path}`" />
    </div>
    <div class="h-[324px] w-[313px] bg-black p-5">
      <div class="flex items-center">
        <img class="h-4 w-4 mr-2" src="@/assets/icon/star.svg">
        <p class="text-lg font-bold">{{ detail.vote_average }}</p>
      </div>
      <p class="text-[24px] font-medium">{{ detail.title }}</p>
      <div class="flex items-center">
        <p>{{ detail.release_date && detail.release_date.slice(0, 4) }}</p>
        <div class="w-[6px] h-[6px] background-dot rounded-full mx-1"></div>
        <p>Sci-Fi</p>
      </div>
      <p class="text-xs">When the crew of a space junk collector ship called The Victory discovers a humanoid robot named Dorothy that's known to be a weapon of mass destruction, they get involved in a risky business deal which puts their lives at stake.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  }
}
</script>