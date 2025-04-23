<template>
    <v-app-bar flat color="transparent" class="px-4" :elevation="0">

    
      
      <v-toolbar-title class="font-weight-bold text-primary">Portfolio</v-toolbar-title>
      
      <v-spacer></v-spacer>
      

      <v-btn 
        v-for="item in navItems" 
        :key="item.text" 
        variant="text" 
        :to="item.route"
        class="text-none mx-1"
      >
        {{ item.text }}
      </v-btn>
      

      <v-btn 
        icon 
        @click="toggleTheme"
        class="ml-4"
        :color="isDark ? 'secondary' : 'primary'"
      >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>
  </template>
  
  <script setup>
  import { useTheme } from 'vuetify'
  import { ref } from 'vue'
  
  const theme = useTheme()
  const isDark = ref(theme.global.current.value.dark)
  
  const navItems = [
    { text: 'Home', route: '/' },
    { text: 'Projects', route: '/projects' },
    { text: 'About', route: '/about' }
  ]
  
  const toggleTheme = () => {
    theme.global.name.value = isDark.value ? 'light' : 'dark'
    isDark.value = !isDark.value
  }
  </script>
  
  <style scoped>
  .v-app-bar {
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.7) !important;
  }
  .v-theme--dark .v-app-bar {
    background: rgba(30, 30, 30, 0.7) !important;
  }
  </style>