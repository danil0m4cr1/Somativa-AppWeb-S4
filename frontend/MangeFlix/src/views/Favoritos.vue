<template>
  <div class="page-shell"><AppHeader /><main class="inner-page">
    <div class="section-heading"><div><span class="eyebrow">SEU ESPAÇO</span><h1>Minha lista<span>.</span></h1><p class="page-subtitle">Os títulos que você guardou para assistir depois.</p></div><span class="result-count">{{ lista.length }} títulos</span></div>
    <div v-if="lista.length" class="movie-grid"><MovieCard v-for="filme in lista" :key="filme.id" :filme="filme" :favorito="true" @toggle-favorite="remover" /></div>
    <div v-else class="empty-state large"><span>♡</span><h2>Sua lista está vazia</h2><p>Explore o catálogo e salve os filmes que chamarem sua atenção.</p><RouterLink to="/" class="primary-button">Explorar catálogo <span>→</span></RouterLink></div>
  </main></div>
</template>
<script setup>
import { computed, ref } from 'vue'
import AppHeader from '../components/appHeader.vue'
import MovieCard from '../components/movieCard.vue'
import { filmes } from '../data/filmes'
import { lerFavoritos, alternarFavorito } from '../services/storage'
const ids = ref(lerFavoritos())
const lista = computed(() => filmes.filter(f => ids.value.includes(f.id)))
function remover(id) { ids.value = alternarFavorito(id) }
</script>
