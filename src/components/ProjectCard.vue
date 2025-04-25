<template>
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        v-bind="props"
        class="mx-auto rounded-xl project-card"
        elevation="2"
        @click="$emit('click')"
        max-width="400"
      >
        <div class="card-img-wrapper">
          <v-img
            :src="project.image || 'https://via.placeholder.com/600x400'"
            height="200px"
            cover
            class="rounded-t-xl"
          ></v-img>
  
          <transition name="fade">
            <div class="overlay" v-if="isHovering">
              <p class="click-message">{{ t('projects.hoverMessage') }}</p>
            </div>
          </transition>
        </div>
  
        <v-card-title class="text-h6 font-weight-bold">
          {{ project.title }}
        </v-card-title>
  
        <v-card-text class="pb-3">
          <div class="mb-2 d-flex flex-wrap">
            <v-chip
              v-for="tech in project.techs.slice(0, 3)"
              :key="tech"
              size="small"
              color="primary"
              class="ma-1"
              label
            >
              {{ tech }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-hover>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n'
  
  defineProps(['project'])
  
  const { t } = useI18n()
  </script>
  
  <style scoped>
  .project-card {
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .project-card:hover {
    transform: scale(1.03);
  }
  
  .card-img-wrapper {
    position: relative;
    overflow: hidden;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  
  .overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 1;
    font-weight: 500;
    font-size: 1rem;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .click-message {
    padding: 0 1rem;
  }
  </style>
  