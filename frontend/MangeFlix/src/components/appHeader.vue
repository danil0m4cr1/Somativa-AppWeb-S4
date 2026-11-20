<template>
  <header class="app-header">
    <div class="header-inner">
      <RouterLink to="/" class="brand" aria-label="MangeFlix - início">
        <img src="../assets/MangeFlix-claro.png" alt="MangeFlix" />
      </RouterLink>
      <button class="mobile-menu" type="button" aria-label="Abrir navegação" @click="menuAberto = !menuAberto">☰</button>
      <nav :class="{ 'nav-open': menuAberto }" aria-label="Navegação principal">
        <RouterLink to="/" @click="menuAberto = false">Catálogo</RouterLink>
        <RouterLink to="/favoritos" @click="menuAberto = false">Meus favoritos</RouterLink>
        <button class="logout-link" @click="sair">Sair <span aria-hidden="true">↗</span></button>
      </nav>
    </div>
  </header>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { encerrarSessao } from '../services/storage'
const router = useRouter()
const menuAberto = ref(false)
function sair() { encerrarSessao(); router.push('/login') }
</script>
