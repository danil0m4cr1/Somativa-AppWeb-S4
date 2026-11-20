<template>
  <div class="page-shell">
    <AppHeader />
    <main>
      <section class="hero"
        :style="{ backgroundImage: `linear-gradient(90deg, #080808 0%, rgba(8,8,8,.88) 36%, rgba(8,8,8,.18) 100%), linear-gradient(0deg,#080808 0%,transparent 45%), url(${destaque.capa})` }">
        <div class="hero-content">
          <span class="eyebrow">
            <i></i> DESTAQUE DA SEMANA
          </span>
          <h1>
            {{ destaque.titulo }}
          </h1>
          <div class="hero-meta">
            <span>
              {{ destaque.ano }}
            </span>
            <span>
              {{ destaque.classificacao }}
            </span>
            <span>
              {{ destaque.duracao }}
            </span>
            <span class="rating">
              ★ {{ destaque.nota }}
            </span>
          </div>
          <p>{{ destaque.descricao }}</p>
          <div class="hero-actions">
            <RouterLink :to="`/filme/${destaque.id}`" class="primary-button">
              Explorar filme
            </RouterLink>
            <button class="outline-button" @click="toggle(destaque.id)">
              {{ favoritos.includes(destaque.id) ? '♥ Na minha lista' : '♡ Minha lista' }}
            </button>
          </div>
        </div>
        <div class="hero-index">
          <strong>01</strong>
          <span> / 08</span>
        </div>
      </section>
      <section class="catalog-section">
        <div class="section-heading">
          <div>
            <span class="eyebrow">
              ESCOLHA O QUE ASSISTIR
            </span>
            <h2>
              Explore o catálogo
            </h2>
          </div>
          <span class="result-count">
            {{ filtrados.length }} títulos
          </span>
        </div>
        <div class="catalog-tools">
          <label class="search-box">
            <span>⌕</span>
            <input v-model="busca" type="search" placeholder="Buscar por título..." aria-label="Buscar filmes" />
          </label>
          <div class="filter-list" aria-label="Filtrar por gênero">
            <button v-for="g in generos" :key="g" :class="{ selected: genero === g }" @click="genero = g">
              {{ g }}
            </button>
          </div>
        </div>
        <div v-if="filtrados.length" class="movie-grid">
          <MovieCard v-for="filme in filtrados" :key="filme.id" :filme="filme" :favorito="favoritos.includes(filme.id)"
            @toggle-favorite="toggle" />
        </div>
        <div v-else class="empty-state">
          <span>⌕</span>
          <h3>Nenhum título encontrado</h3>
          <p>Tente buscar por outro nome ou gênero.</p>
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <img src="../assets/MangeFlix-claro.png" alt="MangeFlix" />
      <span>
        Uma experiência para quem ama histórias.
      </span>
      <small>© {{ new Date().getFullYear() }} MangeFlix</small>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppHeader from '../components/appHeader.vue'
import MovieCard from '../components/movieCard.vue'
import { filmes } from '../data/filmes'
import { lerFavoritos, alternarFavorito } from '../services/storage'

const destaque = filmes[0]
const busca = ref('')
const genero = ref('Todos')
const favoritos = ref(lerFavoritos())
const generos = ['Todos', ...new Set(filmes.map(f => f.genero))]

const filtrados = computed(() => filmes.filter(
  f => (genero.value === 'Todos' || 
  f.genero === genero.value) && 
  f.titulo.toLowerCase().includes(busca.value.toLowerCase())))

function toggle(id) { favoritos.value = alternarFavorito(id) }
</script>
