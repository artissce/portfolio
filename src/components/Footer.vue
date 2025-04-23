<template>
    <v-footer color="transparent" class="mt-10 py-6">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6" class="text-center">
            <!-- Redes sociales -->
            <v-btn 
              v-for="icon in socialIcons" 
              :key="icon.name" 
              :icon="icon.name" 
              variant="text" 
              :href="icon.link" 
              target="_blank"
              class="mx-2"
            ></v-btn>
            <p class="mt-4 text-caption">
              © {{ new Date().getFullYear() }} — Hecho con <v-icon icon="mdi-heart" color="red" size="small"></v-icon>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </template>
  
  <script setup>
  const socialIcons = [
    { name: 'mdi-github', link: 'https://github.com/artissce' },
    { name: 'mdi-linkedin', link: 'https://www.linkedin.com/in/ana-karen-cuenca-esquivel-a513302b8/' },
    { name: 'mdi-email', link: 'mailto:cuencaesquivelanakaren@gmail.com' }
  ]
  </script>