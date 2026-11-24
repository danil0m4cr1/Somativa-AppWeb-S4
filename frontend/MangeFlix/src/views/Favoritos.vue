
<template>
  <div class="page-shell min-h-screen w-full overflow-x-clip bg-[#080808] text-[#f5f5f5]">
    <AppHeader />

    <main
      class="mx-auto min-h-[calc(100vh-68px)] w-full max-w-[1440px] px-3 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 md:min-h-[calc(100vh-82px)] md:px-[5.5%]"
    >
      <!-- Cabeçalho -->
      <div
        class="mb-7 flex items-end justify-between gap-3 sm:mb-8"
      >
        <div>
          <h1 class="mt-2 text-[28px] font-bold tracking-[-1.4px] sm:text-4xl">
            Minha lista
          </h1>
        </div>

        <span class="shrink-0 pb-1 text-xs text-[#888] sm:text-sm">
          {{ lista.length }} títulos
        </span>
      </div>

      <!-- Lista de favoritos -->
      <div
        v-if="lista.length"
        class="movie-grid grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-7 lg:grid-cols-4 lg:gap-x-[19px] lg:gap-y-8"
      >
        <MovieCard
          v-for="filme in lista"
          :key="filme.id"
          :filme="filme"
          :favorito="true"
          @toggle-favorite="remover"
        />
      </div>

      <!-- Lista vazia -->
      <div
        v-else
        class="flex min-h-[350px] flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[450px]"
      >
        <h2 class="my-3 text-lg font-bold text-white sm:text-xl">
          Sua lista está vazia
        </h2>

        <p class="mb-6 max-w-sm text-xs leading-relaxed text-[#999] sm:text-sm">
          Explore nosso catálogo e adicione seus filmes favoritos à sua lista.
        </p>

        <RouterLink
          to="/"
          class="inline-flex min-h-[44px] items-center justify-center gap-3 rounded-[5px] bg-[#e50914] px-5 text-center text-xs font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#bd0710] sm:text-[13px]"
        >
          Explorar catálogo
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppHeader from '../components/appHeader.vue'
import MovieCard from '../components/movieCard.vue'
import { filmes } from '../data/filmes'
import { lerFavoritos, alternarFavorito } from '../services/storage'

const ids = ref(lerFavoritos())

const lista = computed(() =>
  filmes.filter(f => ids.value.includes(f.id))
)

function remover(id) {
  ids.value = alternarFavorito(id)
}
</script>
