import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Favoritos from '../views/Favoritos.vue'
import DetalhesFilme from '../views/DetalhesFilme.vue'
import { obterUsuario } from '../services/storage'

const routes = [
  { path: '/', component: Home},
  { path: '/favoritos', component: Favoritos, meta: { requiresAuth: true } },
  { path: '/filme/:id', component: DetalhesFilme, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/cadastro', component: Cadastro },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]
const router = createRouter({ history: createWebHistory(), routes, scrollBehavior: () => ({ top: 0 }) })
router.beforeEach(to => { if (to.meta.requiresAuth && !obterUsuario()) return '/login' })
export default router
