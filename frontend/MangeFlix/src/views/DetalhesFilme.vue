
<template>
  <div class="page-shell min-h-screen w-full overflow-x-clip bg-[#080808] text-[#f5f5f5]">
    <AppHeader />

    <!-- Filme encontrado -->
    <main
      v-if="filme"
      class="relative mx-auto min-h-[calc(100vh-68px)] w-full max-w-[1600px] overflow-hidden px-4 pb-16 pt-7 sm:px-8 sm:pt-9 md:min-h-[calc(100vh-82px)] md:px-[8.5%] md:pb-[90px]"
    >
      <!-- Imagem de fundo -->
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-[470px] bg-cover bg-center opacity-75 sm:h-[520px] md:h-[590px]"
        :style="{
          backgroundImage: `linear-gradient(90deg,#080808 0%,rgba(8,8,8,.8) 55%,rgba(8,8,8,.45)),linear-gradient(0deg,#080808,transparent 65%),url(${filme.capa})`
        }"
      ></div>

      <!-- Voltar -->
      <RouterLink
        to="/"
        class="relative mb-9 inline-block text-xs text-[#bbb] transition-colors hover:text-white sm:mb-12"
      >
        ← Voltar ao catálogo
      </RouterLink>

      <!-- Conteúdo -->
      <section
        class="relative mx-auto grid w-full max-w-[1000px] grid-cols-1 items-start gap-7 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-7 md:grid-cols-[minmax(190px,290px)_minmax(0,1fr)] md:items-center md:gap-[55px]"
      >
        <!-- Poster -->
        <div class="flex justify-start sm:block">
          <img
            class="w-[125px] rounded-[7px] object-cover shadow-[0_20px_70px_#0009] sm:w-full"
            :src="filme.poster"
            :alt="`Pôster de ${filme.titulo}`"
          />
        </div>

        <!-- Informações -->
        <div class="detail-copy min-w-0 w-full">
          <span
            class="inline-flex items-center text-[9px] font-extrabold tracking-[1.5px] text-[#e5e5e5] sm:text-[10px] sm:tracking-[2.3px]"
          >
            DETALHES
          </span>

          <h1
            class="my-3 break-words text-[34px] font-extrabold leading-[1.05] tracking-[-1px] sm:my-4 sm:text-[42px] md:text-[clamp(36px,5vw,62px)] md:tracking-[-2px]"
          >
            {{ filme.titulo }}
          </h1>

          <!-- Metadados -->
          <div
            class="hero-meta flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#c5c5c5] sm:text-[13px]"
          >
            <span>{{ filme.ano }}</span>
            <span>{{ filme.classificacao }}</span>
            <span>{{ filme.duracao }}</span>
            <span class="text-[#ffc857]">★ {{ filme.nota }}</span>
          </div>

          <!-- Descrição -->
          <p
            class="my-5 max-w-[650px] text-[13px] leading-[1.8] text-[#c2c2c2] sm:my-7 sm:text-sm sm:leading-[1.9]"
          >
            {{ filme.descricao }}
          </p>

          <!-- Informações adicionais -->
          <div
            class="mb-6 flex flex-wrap gap-x-7 gap-y-5 sm:mb-[30px] sm:gap-x-10"
          >
            <div class="grid min-w-0 gap-2">
              <small class="text-[9px] tracking-[1.5px] text-[#888]">
                GÊNERO
              </small>
              <strong class="break-words text-xs">
                {{ filme.genero }}
              </strong>
            </div>

            <div class="grid gap-2">
              <small class="text-[9px] tracking-[1.5px] text-[#888]">
                LANÇAMENTO
              </small>
              <strong class="text-xs">
                {{ filme.ano }}
              </strong>
            </div>

            <div class="grid gap-2">
              <small class="text-[9px] tracking-[1.5px] text-[#888]">
                CLASSIFICAÇÃO
              </small>
              <strong class="text-xs">
                {{ filme.classificacao }}
              </strong>
            </div>
          </div>

          <!-- Favoritos -->
          <button
            class="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-3 rounded-[5px] border border-transparent bg-[#e50914] px-5 text-center text-xs font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#bd0710] sm:w-auto sm:text-[13px]"
            @click="toggle"
          >
            {{ favorito ? 'Remover da minha lista' : 'Adicionar à minha lista' }}
          </button>
        </div>
      </section>
    </main>

    <!-- Filme não encontrado -->
    <main
      v-else
      class="flex min-h-[calc(100vh-68px)] flex-col items-center justify-center gap-5 px-4 text-center md:min-h-[calc(100vh-82px)]"
    >
      <h2 class="text-xl font-bold text-white sm:text-2xl">
        Filme não encontrado
      </h2>

      <RouterLink
        to="/"
        class="inline-flex min-h-[44px] items-center justify-center rounded-[5px] bg-[#e50914] px-5 text-sm font-bold text-white transition hover:bg-[#bd0710]"
      >
        Voltar ao catálogo
      </RouterLink>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/appHeader.vue'
import { filmes } from '../data/filmes'
import { lerFavoritos, alternarFavorito } from '../services/storage'

const route = useRoute()

const filme = computed(() =>
  filmes.find(f => f.id === Number(route.params.id))
)

const ids = ref(lerFavoritos())

const favorito = computed(() =>
  filme.value && ids.value.includes(filme.value.id)
)

function toggle() {
  ids.value = alternarFavorito(filme.value.id)
}
</script>
