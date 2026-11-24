
<template>
  <div class="page-shell min-h-screen w-full overflow-x-clip bg-[#080808] text-[#f5f5f5]">
    <AppHeader />

    <main>
      <!-- Carregamento -->
      <div
        v-if="carregando"
        class="flex min-h-[70vh] items-center justify-center px-4 text-center"
      >
        <div>
          <div class="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#333] border-t-[#e50914]"></div>
          <p class="text-sm text-[#999]">Carregando catálogo...</p>
        </div>
      </div>

      <!-- Erro -->
      <div
        v-else-if="erro"
        class="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center"
      >
        <h2 class="text-xl font-bold text-white">
          Não foi possível carregar o catálogo
        </h2>

        <p class="mt-3 text-sm text-[#999]">
          {{ erro }}
        </p>

        <button
          @click="carregarFilmes"
          class="mt-6 rounded-[5px] bg-[#e50914] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#bd0710]"
        >
          Tentar novamente
        </button>
      </div>

      <!-- Conteúdo -->
      <template v-else-if="filmes.length">
        <!-- Destaque principal -->
        <section
          v-if="destaque"
          class="relative mx-auto flex min-h-[560px] w-full max-w-[1600px] items-center overflow-hidden bg-cover bg-center px-5 py-16 sm:min-h-[590px] sm:px-8 md:px-[8.5%]"
          :style="{
            backgroundImage: `linear-gradient(90deg, #080808 0%, rgba(8,8,8,.88) 36%, rgba(8,8,8,.18) 100%), linear-gradient(0deg,#080808 0%,transparent 45%), url(${destaque.capa})`
          }"
        >
          <div class="relative z-10 w-full max-w-[590px]">
            <span class="text-[9px] font-extrabold tracking-[1.8px] text-[#e5e5e5] sm:text-[10px] sm:tracking-[2.3px]">
              DESTAQUE DA SEMANA
            </span>

            <h1 class="my-5 break-words text-[40px] font-extrabold leading-[1.02] tracking-[-2px] sm:text-[56px] md:text-[clamp(42px,6vw,76px)] md:tracking-[-3px]">
              {{ destaque.titulo }}
            </h1>

            <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#c5c5c5] sm:gap-[17px] sm:text-[13px]">
              <span>{{ destaque.ano }}</span>
              <span>{{ destaque.classificacao }}</span>
              <span>{{ destaque.duracao }}</span>
              <span class="text-[#ffc857]">★ {{ destaque.nota }}</span>
            </div>

            <p class="my-5 max-w-[510px] text-[12px] leading-[1.8] text-[#c2c2c2] sm:my-6 sm:text-sm">
              {{ destaque.descricao }}
            </p>

            <div class="flex flex-wrap gap-3">
              <RouterLink
                :to="`/filme/${destaque.id}`"
                class="inline-flex min-h-[44px] items-center justify-center gap-3 rounded-[5px] bg-[#e50914] px-5 text-center text-xs font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#bd0710] sm:text-[13px]"
              >
                Explorar filme
              </RouterLink>

              <button
                class="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-3 rounded-[5px] border border-white/30 bg-white/10 px-5 text-xs font-bold text-white transition duration-200 hover:bg-white/20 sm:text-[13px]"
                @click="toggle(destaque.id)"
              >
                {{ favoritos.includes(destaque.id) ? 'Na minha lista' : 'Minha lista' }}
              </button>
            </div>
          </div>
        </section>

        <!-- Catálogo -->
        <section class="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 md:px-[5.5%]">
          <!-- Cabeçalho -->
          <div class="mb-6 flex items-end justify-between gap-3 sm:mb-7">
            <div>
              <h2 class="text-[26px] font-bold tracking-[-1.2px] sm:text-[clamp(28px,4vw,38px)] sm:tracking-[-1.4px]">
                Explore o catálogo
              </h2>
            </div>

            <span class="shrink-0 pb-1 text-[11px] text-[#888] sm:text-sm">
              {{ filtrados.length }} títulos
            </span>
          </div>

          <!-- Pesquisa e filtros -->
          <div class="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
            <label class="flex h-[42px] w-full items-center rounded-[5px] border border-[#292929] bg-[#141414] px-[13px] text-[#888] transition-colors focus-within:border-[#e50914] lg:max-w-[300px]">
              <input
                v-model="busca"
                type="search"
                placeholder="Buscar por título..."
                aria-label="Buscar filmes"
                class="w-full min-w-0 border-0 bg-transparent text-xs text-white outline-none placeholder:text-[#777]"
              />
            </label>

            <div
              class="flex w-full flex-wrap items-center gap-2"
              aria-label="Filtrar por gênero"
            >
              <button
                v-for="g in generos"
                :key="g"
                :class="genero === g
                  ? 'border-[#e50914] bg-[#e50914] text-white'
                  : 'border-[#292929] bg-transparent text-[#aaa] hover:border-[#e50914] hover:text-white'"
                class="max-w-full cursor-pointer whitespace-normal break-words rounded-[4px] border px-3 py-2 text-center text-[10px] transition-colors sm:text-[11px]"
                @click="genero = g"
              >
                {{ g }}
              </button>
            </div>
          </div>

          <!-- Filmes -->
          <div
            v-if="filtrados.length"
            class="grid grid-cols-2 gap-x-[13px] gap-y-6 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-7 lg:grid-cols-4 lg:gap-x-[19px] lg:gap-y-8 xl:grid-cols-5"
          >
            <MovieCard
              v-for="filme in filtrados"
              :key="filme.id"
              :filme="filme"
              :favorito="favoritos.includes(filme.id)"
              @toggle-favorite="toggle"
            />
          </div>

          <!-- Nenhum resultado -->
          <div
            v-else
            class="flex min-h-[200px] flex-col items-center justify-center px-4 py-16 text-center"
          >
            <h3 class="text-base font-bold text-white sm:text-lg">
              Nenhum título encontrado
            </h3>

            <p class="mt-2 text-xs text-[#999] sm:text-sm">
              Tente alterar sua pesquisa ou selecionar outro gênero.
            </p>
          </div>
        </section>
      </template>

      <!-- API sem filmes -->
      <div
        v-else
        class="flex min-h-[70vh] items-center justify-center px-4 text-center"
      >
        <p class="text-sm text-[#999]">
          Nenhum filme disponível no momento.
        </p>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import AppHeader from '../components/appHeader.vue'
import MovieCard from '../components/movieCard.vue'
import Footer from '../components/footer.vue'

import { buscarFilmes } from '../services/filmes'
import { lerFavoritos, alternarFavorito } from '../services/storage'

const filmes = ref([])
const busca = ref('')
const genero = ref('Todos')
const favoritos = ref(lerFavoritos())

const carregando = ref(true)
const erro = ref('')

const destaque = computed(() => filmes.value[0] || null)

const generos = [
  'Todos',
  'Ação',
  'Aventura',
  'Animação',
  'Comédia',
  'Drama',
  'Fantasia',
  'Ficção científica',
  'Romance',
  'Suspense',
  'Terror'
]

const filtrados = computed(() =>
  filmes.value.filter(f =>
      (genero.value === 'Todos' || f.genero === genero.value) &&
      f.titulo.toLowerCase().includes(busca.value.toLowerCase())
  )
)

async function carregarFilmes() {
  carregando.value = true
  erro.value = ''

  try {
    filmes.value = await buscarFilmes()
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
    erro.value = 'Verifique sua conexão e tente novamente.'
  } finally {
    carregando.value = false
  }
}

function toggle(id) {
  favoritos.value = alternarFavorito(id)
}

onMounted(carregarFilmes)
</script>
