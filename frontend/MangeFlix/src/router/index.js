import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Favoritos from '../views/Favoritos.vue'
import DetalhesFilme from '../views/DetalhesFilme.vue'
import { estaAutenticado } from '../services/auth'

const routes = [
    { path: '/', component: Home, meta: { requiresAuth: true } },
    { path: '/favoritos', component: Favoritos, meta: { requiresAuth: true } },
    { path: '/filme/:id', component: DetalhesFilme, meta: { requiresAuth: true } },
    { path: '/login', component: Login, meta: { guestOnly: true } },
    { path: '/cadastro', component: Cadastro, meta: { guestOnly: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to) => {
    const autenticado = estaAutenticado()

    if (to.meta.requiresAuth && !autenticado) {
        return '/login'
    }

    if (to.meta.guestOnly && autenticado) {
        return '/'
    }

    return true
})



export default router