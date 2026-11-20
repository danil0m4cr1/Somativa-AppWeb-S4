<template>
  <div class="page-shell"><AppHeader />
    <main v-if="filme" class="detail-page">
      <div class="detail-backdrop" :style="{ backgroundImage: `linear-gradient(90deg,#080808 0%,rgba(8,8,8,.8) 55%,rgba(8,8,8,.45)),linear-gradient(0deg,#080808,transparent 65%),url(${filme.capa})` }"></div>
      <RouterLink to="/" class="back-link">← Voltar ao catálogo</RouterLink>
      <section class="detail-content">
        <img class="detail-poster" :src="filme.poster" :alt="`Pôster de ${filme.titulo}`" />
        <div class="detail-copy"><span class="eyebrow">MANGEFLIX • DETALHES</span><h1>{{ filme.titulo }}</h1>
          <div class="hero-meta"><span>{{ filme.ano }}</span><span>{{ filme.classificacao }}</span><span>{{ filme.duracao }}</span><span class="rating">★ {{ filme.nota }}</span></div>
          <p class="detail-description">{{ filme.descricao }}</p>
          <div class="detail-facts"><div><small>GÊNERO</small><strong>{{ filme.genero }}</strong></div><div><small>LANÇAMENTO</small><strong>{{ filme.ano }}</strong></div><div><small>CLASSIFICAÇÃO</small><strong>{{ filme.classificacao }}</strong></div></div>
          <button class="primary-button" @click="toggle">{{ favorito ? '♥ Remover da minha lista' : '♡ Adicionar à minha lista' }}</button>
        </div>
      </section>
    </main>
    <main v-else class="empty-state large"><h2>Filme não encontrado</h2><RouterLink to="/" class="primary-button">Voltar ao catálogo</RouterLink></main>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/appHeader.vue'
import { filmes } from '../data/filmes'
import { lerFavoritos, alternarFavorito } from '../services/storage'
const route = useRoute()
const filme = computed(() => filmes.find(f => f.id === Number(route.params.id)))
const ids = ref(lerFavoritos())
const favorito = computed(() => filme.value && ids.value.includes(filme.value.id))
function toggle() { ids.value = alternarFavorito(filme.value.id) }
</script>
