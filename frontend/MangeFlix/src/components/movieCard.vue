
<template>
  <article class="movie-card min-w-0">
    <!-- Pôster -->
    <RouterLink
      :to="`/filme/${filme.id}`"
      class="poster-link relative block aspect-[2/3] overflow-hidden rounded-md bg-[#191919]"
      :aria-label="`Ver detalhes de ${filme.titulo}`"
    >
      <img
        :src="filme.poster"
        :alt="`Pôster do filme ${filme.titulo}`"
        loading="lazy"
        class="block h-full w-full object-cover transition-transform duration-500 hover:scale-[1.045]"
      />

      <!-- Avaliação -->
      <span
        class="poster-rating absolute left-2 top-2 rounded bg-black/80 px-2 py-1.5 text-[10px] text-[#ffc857] sm:left-[10px] sm:top-[10px] sm:text-[11px]"
      >
        ★ {{ filme.nota }}
      </span>
    </RouterLink>

    <!-- Informações -->
    <div class="movie-card-info flex items-start justify-between gap-2 pt-3">
      <div class="min-w-0">
        <h3 class="m-0 break-words text-xs font-bold leading-snug sm:text-sm">
          {{ filme.titulo }}
        </h3>

        <p class="my-1.5 break-words text-[10px] text-[#888] sm:text-[11px]">
          {{ filme.ano }}
          <span class="px-1 text-[#555]">•</span>
          {{ filme.genero }}
        </p>
      </div>

      <!-- Favorito -->
      <button
        class="favorite-button flex h-[30px] w-[30px] shrink-0 flex-none cursor-pointer items-center justify-center rounded-full border border-[#343434] bg-[#171717] text-[17px] text-[#aaa] transition-colors hover:border-[#76232a] hover:text-[#ff3440]"
        :class="favorito ? 'active border-[#76232a] text-[#ff3440]' : ''"
        @click="$emit('toggle-favorite', filme.id)"
        :aria-label="
          favorito
            ? 'Remover dos favoritos'
            : 'Adicionar aos favoritos'
        "
      >
        {{ favorito ? '♥' : '♡' }}
      </button>
    </div>
  </article>
</template>

<script setup>
defineProps({
  filme: {
    type: Object,
    required: true
  },
  favorito: Boolean
})

defineEmits(['toggle-favorite'])
</script>
