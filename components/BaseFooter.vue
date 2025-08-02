<template>
    <footer class="bg-gray-900 text-gray-300 py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:grid md:grid-cols-3
            gap-8 text-center md:text-left">
                <div>
                    <h2 class="text-white text-lg font-semibold mb-2">MinhaLoja</h2>
                    <p class="text-sm leading-relaxed">
                        Sua loja online de confiança para encontrar os melhores produtos com os melhores preços.
                        Qualidade e segurança em cada compra.
                    </p>
                </div>

                <nav
                    aria-label="Links importantes"
                    class="flex flex-col items-center md:items-start space-y-2"
                >
                    <h2 class="text-white text-lg font-semibold mb-2">Links</h2>
                    <NuxtLink
                        to="/"
                        class="relative inline-block text-gray-300 after:absolute after:left-0 
                        after:-bottom-1 after:h-[2px] after:w-full after:bg-white after:scale-x-0
                        after:origin-left after:transition-transform after:duration-300
                        hover:after:scale-x-100"
                    >
                        Início
                    </NuxtLink>
                    <NuxtLink
                        to="/#hero"
                        class="relative inline-block text-gray-300 after:absolute after:left-0
                        after:-bottom-1 after:h-[2px] after:w-full after:bg-white after:scale-x-0
                        after:origin-left after:transition-transform after:duration-300
                        hover:after:scale-x-100"
                    >
                        Produtos
                    </NuxtLink>
                    <NuxtLink
                        to="/aboutUs"
                        class="relative inline-block text-gray-300 after:absolute after:left-0
                        after:-bottom-1 after:h-[2px] after:w-full after:bg-white after:scale-x-0
                        after:origin-left after:transition-transform after:duration-300
                        hover:after:scale-x-100"
                    >
                        Sobre Nós
                    </NuxtLink>
                    <NuxtLink
                        to="/privacyPolicy"
                        class="relative inline-block text-gray-300 after:absolute after:left-0
                        after:-bottom-1 after:h-[2px] after:w-full after:bg-white after:scale-x-0
                        after:origin-left after:transition-transform after:duration-300
                        hover:after:scale-x-100"
                    >
                        Política de Privacidade
                    </NuxtLink>
                </nav>

                <section
                    aria-labelledby="fale conosco"
                    class="flex flex-col items-center md:items-start"
                >
                    <h2
                        id="fale-conosco"
                        class="text-white text-lg font-semibold mb-2"
                    >
                        Fale Conosco
                    </h2>
                    <div class="w-full max-w-md">
                        <ContactForm />
                    </div>
                </section>
            </div>

            <div 
                class="border-t border-gray-700 mt-10 pt-4
                text-sm text-gray-400 text-center"
            >
                © 2024 MinhaLoja. Todos os direitos reservados.
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import ContactForm from '~/components/contact/ContactForm.vue'
</script>
