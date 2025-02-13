<template>
  <div class="min-h-screen flex flex-col">
    <div>
      <Carousel v-bind="config" class="relative">
        <Slide v-for="image in movies" :key="image.id" class="carousel-item">
          <CardHeading :detail="image" />
        </Slide>

        <template #addons>
          <Navigation />
					<Pagination :paginateByItemsToShow="true" />
        </template>

      </Carousel>
    </div>

    <div class="flex-grow bg-page">
      <div class="h-[323px] w-full bg-[#292e36] pl-[10%] pt-[5%]">
        <div class="w-[112px] h-1 bg-[#E74C3C]" />
        <p class="text-4xl font-semibold">Discover Movies</p>
      </div>

      <section class="py-10">
        <div class="flex flex-col xl:flex-row gap-6 xl:gap-10 xl:mt-[-10%] xl:ml-[10%] xl:mr-[10%] justify-center items-center">
          <div class="w-full mb-[50px]">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[20px] justify-center">
              <div v-for="(item, idx) in movies" :key="idx" class="rounded-lg">
                <CardMovieVue :detail="item" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import CardHeading from '../components/CardHeading.vue'
import CardMovieVue from '../components/CardMovie.vue'

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    CardHeading,
    Navigation,
    CardMovieVue
  },
  data() {
    return {
      images: Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        url: `https://picsum.photos/800/600?random=${index + 1}`,
      })),
      config: {
        height: 484,
        itemsToShow: 3,
        gap: 280,
        wrapAround: true,
      }
    }
  },
  computed: {
    movies() {
      return this.$store.getters.getMovies
    },
  },
  mounted() {
  	this.$store.dispatch('fetchMovies')
	}
}
</script>

<style>
.carousel__pagination-button {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: white;
}
.carousel__pagination-button--active {
  background-color: red;
}
</style>