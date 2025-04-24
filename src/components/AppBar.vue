<template>
  <v-app-bar flat color="transparent" class="px-2 px-sm-4" :elevation="0">
    <router-link to="/" class="d-flex align-center mr-2 mr-sm-3" style="text-decoration: none;">
      <img 
        src="@/assets/logo.png" 
        alt="Logo" 
        :style="{
          height: $vuetify.display.smAndDown ? '32px' : '40px'
        }" 
      />
    </router-link>
    
    <v-toolbar-title 
      class="font-weight-bold text-primary" 
      :class="{ 'text-h6': $vuetify.display.smAndDown }"
    >
    {{ t('app.title') }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="!$vuetify.display.smAndDown">
      <v-btn 
        v-for="item in navItems" 
        :key="item.text" 
        variant="text" 
        :to="item.route"
        class="text-none mx-1"
      >
        {{ item.text }}
      </v-btn>
    </div>
    <v-menu v-else transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          v-bind="props"
          color
          class="menu-btn"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      
      <v-list 
        class="custom-menu"
        :class="{ 'dark-menu': isDark }"
      >
        <v-list-item
          v-for="item in navItems"
          :key="item.text"
          :to="item.route"
          active-class="active-item"
        >
          <v-list-item-title class="menu-item">
            <v-icon size="20" class="mr-2">{{ item.icon }}</v-icon>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu offset-y transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          v-bind="props"
          class="mr-2"
          :color="isDark ? 'secondary' : 'primary'"
        >
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </template>
      
      <v-list class="language-menu" :class="{ 'dark-menu': isDark }">
        <v-list-item
          v-for="lang in availableLocales"
          :key="lang"
          @click="setLocale(lang)"
          :class="{ 'active-lang': locale === lang }"
        >
          <v-list-item-title class="d-flex align-center">
            <span class="mr-2" style="font-size: 1.2em;">
              {{ lang === 'es' ? '🇪🇸' : lang === 'en' ? '🇺🇸' : '🇩🇪' }}
            </span>
            {{ t(`language.${lang}`) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn 
      icon 
      @click="toggleTheme"
      class="ml-2 ml-sm-4"
      :color="isDark ? 'secondary' : 'primary'"
    >
      <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n' 

const { t, locale, availableLocales } = useI18n()

const theme = useTheme()
const isDark = ref(theme.global.current.value.dark)

const navItems = computed(() => [
  { text: t('app.home'), route: '/', icon: 'mdi-home' },
  { text: t('app.projects'), route: '/projects', icon: 'mdi-folder' }
])
const setLocale = (newLocale) => {
  locale.value = newLocale
  localStorage.setItem('user-lang', newLocale) // Persistencia
}
const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
  isDark.value = !isDark.value
}
</script>

<style scoped>
.v-app-bar {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.7) !important;
  position: relative;
  transition: all 0.3s ease;
}

.v-app-bar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
}

.v-theme--dark .v-app-bar {
  background: rgba(30, 30, 30, 0.7) !important;
}

.custom-menu {
  background: rgba(255, 255, 255, 0.98) !important;
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
}

.custom-menu .menu-item {
  color: rgba(var(--v-theme-primary), 0.9);
}

/* Menú oscuro */
.dark-menu {
  background: rgba(var(--v-theme-background), 0.98) !important;
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
}

.dark-menu .menu-item {
  color: rgba(var(--v-theme-primary), 0.9);
}

/* Ítem activo */
.active-item {
  background: rgba(var(--v-theme-primary), 0.05) !important;
}

.dark-menu .active-item {
  background: rgba(var(--v-theme-primary), 0.05) !important;
}

/* Efectos hover */
.v-list-item:hover {
  background: rgba(var(--v-theme-primary), 0.03) !important;
}

.dark-menu .v-list-item:hover {
  background: rgba(var(--v-theme-primary), 0.03) !important;
}
.language-menu {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.95) !important;
  border-radius: 8px;
}

.dark-menu.language-menu {
  background: rgba(30, 30, 30, 0.95) !important;
}

.active-lang {
  background: rgba(var(--v-theme-primary), 0.1) !important;
  color: rgb(var(--v-theme-primary)) !important;
}
@media (max-width: 600px) {
  .v-toolbar__content {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
}
</style>