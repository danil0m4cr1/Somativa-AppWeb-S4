
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
                class="flex w-full items-center justify-center px-6 py-4 md:w-1/2 md:px-12"
            >
                <div class="w-full max-w-md">

                    <!-- Logo mobile -->
                    <div class="mb-8 flex justify-center md:hidden">
                        <img
                            src="../assets/MangeFlix-claro.png"
                            alt="Logo MangeFlix"
                            class="w-64 object-contain"
                        />
                    </div>

                    <!-- Cabeçalho -->
                    <div class="mb-8">
                        <h1 class="text-3xl font-bold text-white">
                            Criar conta
                        </h1>
                    </div>

                    <!-- Formulário -->
                    <form @submit.prevent="fazerCadastro" class="space-y-5">

                        <!-- Nome -->
                        <div>
                            <label
                                for="nome"
                                class="mb-2 block text-sm font-medium text-gray-200"
                            >
                                Nome
                            </label>

                            <input
                                id="nome"
                                v-model.trim="form.nome"
                                type="text"
                                placeholder="Digite seu nome"
                                autocomplete="name"
                                @blur="validarNome"
                                :class="[
                                    'w-full rounded-lg border bg-gray-900 px-4 py-3 text-white outline-none transition',
                                    erros.nome
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
                                        : 'border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                ]"
                            />

                            <p
                                v-if="erros.nome"
                                class="mt-2 text-sm text-red-400"
                            >
                                {{ erros.nome }}
                            </p>
                        </div>

                        <!-- E-mail -->
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
                                    autocomplete="new-password"
                                    @blur="validarSenha"
                                    :class="[
                                        'w-full rounded-lg border bg-gray-900 px-4 py-3 pr-20 text-white outline-none transition',
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

                            <p
                                v-else
                                class="mt-2 text-xs text-gray-500"
                            >
                                A senha deve conter pelo menos 6 caracteres.
                            </p>
                        </div>

                        <!-- Confirmação de senha -->
                        <div>
                            <label
                                for="confirmarSenha"
                                class="mb-2 block text-sm font-medium text-gray-200"
                            >
                                Confirmar senha
                            </label>

                            <div class="relative">
                                <input
                                    id="confirmarSenha"
                                    v-model="form.confirmarSenha"
                                    :type="mostrarConfirmacao ? 'text' : 'password'"
                                    placeholder="Confirme sua senha"
                                    autocomplete="new-password"
                                    @blur="validarConfirmacao"
                                    :class="[
                                        'w-full rounded-lg border bg-gray-900 px-4 py-3 pr-20 text-white outline-none transition',
                                        erros.confirmarSenha
                                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
                                            : 'border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                    ]"
                                />

                                <button
                                    type="button"
                                    @click="mostrarConfirmacao = !mostrarConfirmacao"
                                    class="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    <img v-if="mostrarConfirmacao" src="../assets/ocultar.png" alt="icone para ocultar a senha" class="w-[20px] cursor-pointer">
                                    <img v-else src="../assets/visivel.png" alt="icone para visibilidade da senha" class="w-[20px] cursor-pointer">
                                </button>
                            </div>

                            <p
                                v-if="erros.confirmarSenha"
                                class="mt-2 text-sm text-red-400"
                            >
                                {{ erros.confirmarSenha }}
                            </p>
                        </div>

                        <!-- Erro geral -->
                        <div
                            v-if="erroGeral"
                            class="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
                        >
                            {{ erroGeral }}
                        </div>

                        <!-- Botão de cadastro -->
                        <button
                            type="submit"
                            :disabled="carregando"
                            class="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {{ carregando ? 'Cadastrando...' : 'Criar conta' }}
                        </button>

                    </form>

                    <!-- Login -->
                    <div class="mt-8 text-center text-sm text-gray-400">
                        Já possui uma conta?

                        <RouterLink
                            to="/login"
                            class="ml-1 font-semibold text-red-500 transition hover:text-red-400"
                        >
                            Faça login
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

const router = useRouter()

const form = reactive({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
})

const erros = reactive({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
})

const mostrarSenha = ref(false)
const mostrarConfirmacao = ref(false)
const carregando = ref(false)
const erroGeral = ref('')

// Validação do nome
function validarNome() {
    erros.nome = ''
    if (!form.nome) {
        erros.nome = 'O nome é obrigatório.'
        return false
    }
    if (form.nome.length < 3) {
        erros.nome = 'O nome deve possuir pelo menos 3 caracteres.'
        return false
    }
    return true
}

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
    if (form.senha.length < 6) {
        erros.senha = 'A senha deve possuir pelo menos 6 caracteres.'
        return false
    }
    return true
}

// Validação da confirmação de senha
function validarConfirmacao() {
    erros.confirmarSenha = ''
    if (!form.confirmarSenha) {
        erros.confirmarSenha = 'Confirme sua senha.'
        return false
    }
    if (form.senha !== form.confirmarSenha) {
        erros.confirmarSenha = 'As senhas não coincidem.'
        return false
    }
    return true
}

// Salva o usuário localmente até a implementação do backend.
async function fazerCadastro() {
    erroGeral.value = ''

    const nomeValido = validarNome()
    const emailValido = validarEmail()
    const senhaValida = validarSenha()
    const confirmacaoValida = validarConfirmacao()

    if (!nomeValido || !emailValido || !senhaValida || !confirmacaoValida) {
        return
    }

    carregando.value = true

    try {
        // await cadastrarUsuario({
        //     nome: form.nome,
        //     email: form.email,
        //     senha: form.senha
        // })

        router.push('/login')
    } catch (error) {
        erroGeral.value = error.message || 'Não foi possível realizar o cadastro. Tente novamente.'
    } finally {
        carregando.value = false
    }
}
</script>
