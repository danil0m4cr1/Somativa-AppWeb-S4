
<template>
  <header
    class="sticky top-0 z-20 h-[68px] border-b border-white/[0.07] bg-[#080808]/95 backdrop-blur-[18px] sm:h-[82px]"
  >
    <div
      class="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-[5.5%]"
    >
      <RouterLink
        to="/"
        aria-label="MangeFlix - início"
        class="shrink-0"
        @click="menuAberto = false"
      >
        <img
          src="../assets/MangeFlix-claro.png"
          alt="MangeFlix"
          class="h-[42px] w-[125px] object-contain object-left sm:h-[52px] sm:w-[158px]"
        />
      </RouterLink>

      <button
        type="button"
        aria-label="Abrir navegação"
        :aria-expanded="menuAberto"
        class="block border-0 bg-transparent text-2xl text-white transition-colors hover:text-[#e50914] md:hidden"
        @click="menuAberto = !menuAberto"
      >
        {{ menuAberto ? '✕' : '☰' }}
      </button>

      <nav
        :class="[
          menuAberto ? 'flex' : 'hidden',
          'absolute left-0 right-0 top-full flex-col items-start gap-5 border-b border-[#292929] bg-[#101010] px-5 py-6 text-sm text-[#bcbcbc] md:static md:flex md:flex-row md:items-center md:gap-[42px] md:border-0 md:bg-transparent md:p-0'
        ]"
        aria-label="Navegação principal"
      >
        <RouterLink
          to="/"
          class="transition-colors duration-200 hover:text-white [&.router-link-active]:text-white"
          @click="menuAberto = false"
        >
          Catálogo
        </RouterLink>

        <RouterLink
          to="/favoritos"
          class="transition-colors duration-200 hover:text-white [&.router-link-active]:text-white"
          @click="menuAberto = false"
        >
          Meus favoritos
        </RouterLink>

        <button
          class="cursor-pointer border-0 bg-transparent text-[#aaa] transition-colors hover:text-white"
          @click="sair"
        >
          Sair
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { encerrarSessao } from '../services/auth'

const router = useRouter()
const menuAberto = ref(false)

function sair() {
  encerrarSessao()
  menuAberto.value = false
  router.push('/login')
}
</script>
