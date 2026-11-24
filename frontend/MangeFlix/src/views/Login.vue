
<template>
    <main class="min-h-screen w-full bg-gray-950">
        <section class="flex min-h-screen w-full">

            <div
                class="hidden w-1/2 items-center justify-center bg-white p-10 md:flex"
            >
                <img
                    src="../assets/MangeFlix.png"
                    alt="Logo MangeFlix"
                    class="w-full max-w-[500px] object-contain"
                />
            </div>

            <div
                class="flex w-full items-center justify-center px-6 py-12 md:w-1/2 md:px-12"
            >
                <div class="w-full max-w-md">

                    <div class="mb-10 flex justify-center md:hidden">
                        <img
                            src="../assets/MangeFlix-claro.png"
                            alt="Logo MangeFlix"
                            class="w-64 object-contain"
                        />
                    </div>

                    <div class="mb-10">
                        <h1 class="text-3xl font-bold text-white">
                            Login
                        </h1>
                    </div>

                    <form @submit.prevent="fazerLogin" class="space-y-6">

                        <div>
                            <label
                                for="email"
                                class="mb-2 block text-sm font-medium text-gray-200"
                            >
                                E-mail
                            </label>

                            <input
                                id="email"
                                v-model.trim="form.email"
                                type="email"
                                placeholder="seuemail@exemplo.com"
                                autocomplete="email"
                                @blur="validarEmail"
                                :class="[
                                    'w-full rounded-lg border bg-gray-900 px-4 py-3 text-white outline-none transition',
                                    erros.email
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
                                        : 'border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                ]"
                            />

                            <p
                                v-if="erros.email"
                                class="mt-2 text-sm text-red-400"
                            >
                                {{ erros.email }}
                            </p>
                        </div>

                        <!-- Senha -->
                        <div>
                            <label
                                for="senha"
                                class="mb-2 block text-sm font-medium text-gray-200"
                            >
                                Senha
                            </label>

                            <div class="relative">
                                <input
                                    id="senha"
                                    v-model="form.senha"
                                    :type="mostrarSenha ? 'text' : 'password'"
                                    placeholder="Digite sua senha"
                                    autocomplete="current-password"
                                    @blur="validarSenha"
                                    :class="[
                                        'w-full rounded-lg border bg-gray-900 px-4 py-3 pr-16 text-white outline-none transition',
                                        erros.senha
                                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
                                            : 'border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                    ]"
                                />

                                <button
                                    type="button"
                                    @click="mostrarSenha = !mostrarSenha"
                                    class="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    <img v-if="mostrarSenha" src="../assets/ocultar.png" alt="icone para ocultar a senha" class="w-[20px] cursor-pointer">
                                    <img v-else src="../assets/visivel.png" alt="icone para visibilidade da senha" class="w-[20px] cursor-pointer">
                                </button>
                            </div>

                            <p
                                v-if="erros.senha"
                                class="mt-2 text-sm text-red-400"
                            >
                                {{ erros.senha }}
                            </p>
                        </div>

                        <!-- Erro geral -->
                        <div
                            v-if="erroGeral"
                            class="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
                        >
                            {{ erroGeral }}
                        </div>

                        <!-- Botão de login -->
                        <button
                            type="submit"
                            :disabled="carregando"
                            class="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {{ carregando ? 'Entrando...' : 'Entrar' }}
                        </button>

                    </form>

                    <!-- Cadastro -->
                    <div class="mt-8 text-center text-sm text-gray-400">
                        Ainda não possui uma conta?

                        <RouterLink
                            to="/cadastro"
                            class="ml-1 font-semibold text-red-500 transition hover:text-red-400"
                        >
                            Cadastre-se
                        </RouterLink>
                    </div>

                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { autenticarUsuario } from '../services/auth'

const router = useRouter()

const form = reactive({
    email: '',
    senha: ''
})

const erros = reactive({
    email: '',
    senha: ''
})

const mostrarSenha = ref(false)
const carregando = ref(false)
const erroGeral = ref('')

// Validação do e-mail
function validarEmail() {
    erros.email = ''
    if (!form.email) {
        erros.email = 'O e-mail é obrigatório.'
        return false
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regexEmail.test(form.email)) {
        erros.email = 'Informe um e-mail válido.'
        return false
    }
    return true
}

// Validação da senha
function validarSenha() {
    erros.senha = ''
    if (!form.senha) {
        erros.senha = 'A senha é obrigatória.'
        return false
    }
    return true
}

// Valida as credenciais cadastradas no armazenamento local.
async function fazerLogin() {
    erroGeral.value = ''

    const emailValido = validarEmail()
    const senhaValida = validarSenha()

    if (!emailValido || !senhaValida) {
        return
    }

    carregando.value = true

    try {
        await autenticarUsuario({
            email: form.email,
            password: form.senha
        })

        router.push('/')
    } catch (error) {
        const dados = error.response?.data

        erroGeral.value =
            dados?.detail ||
            'E-mail ou senha inválidos.'

    } finally {
        carregando.value = false
    }
}
</script>
