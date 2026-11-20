<template>
  <article class="movie-card">
    <RouterLink :to="`/filme/${filme.id}`" class="poster-link" :aria-label="`Ver detalhes de ${filme.titulo}`">
      <img :src="filme.poster" :alt="`Pôster do filme ${filme.titulo}`" loading="lazy" />
      <span class="poster-rating">★ {{ filme.nota }}</span>
    </RouterLink>
    <div class="movie-card-info">
      <div>
        <h3>{{ filme.titulo }}</h3>
        <p>{{ filme.ano }}
          <span>•</span> 
          {{ filme.genero }}
        </p>
      </div>
      <button class="favorite-button" :class="{ active: favorito }"
       @click="$emit('toggle-favorite', filme.id)" :aria-label="favorito 
       ? 'Remover dos favoritos' 
       : 'Adicionar aos favoritos'">
        {{ favorito ? '♥' : '♡' }}
      </button>
    </div>
  </article>
</template>
<script setup>
defineProps({ filme: { type: Object, required: true }, favorito: Boolean })
defineEmits(['toggle-favorite'])
</script>
