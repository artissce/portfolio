<template>
    <div>
      <v-row>
        <v-col
          v-for="project in destacados"
          :key="project.id"
          cols="12"
          sm="6"
          md="4"
        >
          <ProjectCard 
            :project="{
              ...project,
              title: t(`projects.featured.${project.id}.title`),
              description: t(`projects.featured.${project.id}.description`)
            }"
            @click="openDialog(project)" 
          />
        </v-col>
      </v-row>
  
      <v-dialog v-model="dialog" max-width="850px">
        <v-card v-if="selectedProject" class="rounded-xl overflow-hidden">
          <v-img 
            :src="selectedProject.image || 'https://via.placeholder.com/800x400'" 
            height="300px" 
            cover
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
  
          <v-card-title class="text-h4 font-weight-bold px-6 pt-6">
            {{ t(`projects.featured.${selectedProject.id}.title`) }}
          </v-card-title>
  
          <v-card-subtitle class="px-6 text-subtitle-2 text-grey">
            {{ t('projects.modal.category') }} {{ selectedProject.category }}
          </v-card-subtitle>
  
          <v-card-text class="px-6 pb-4">
            <div class="d-flex flex-wrap mb-4">
              <v-chip
                v-for="tech in selectedProject.techs"
                :key="tech"
                color="primary"
                class="ma-1"
                size="small"
                label
              >
                {{ tech }}
              </v-chip>
            </div>
  
            <p class="text-body-1" style="line-height: 1.6;">
              {{ t(`projects.featured.${selectedProject.id}.description`) }}
            </p>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions class="px-6 py-4 d-flex justify-space-between">
            <div>
              <v-btn
                :href="selectedProject.demoUrl"
                target="_blank"
                color="primary"
                prepend-icon="mdi-play-circle"
                v-if="selectedProject.demoUrl"
                class="mr-2"
              >
                {{ t('projects.modal.demo') }}
              </v-btn>
  
              <v-btn
                :href="selectedProject.codeUrl"
                target="_blank"
                color="secondary"
                prepend-icon="mdi-github"
                v-if="selectedProject.codeUrl"
              >
                {{ t('projects.modal.code') }}
              </v-btn>
            </div>
  
            <v-btn @click="dialog = false" color="grey-darken-1" variant="tonal">
              {{ t('projects.modal.close') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { useI18n } from 'vue-i18n'
import coffee from '../assets/coffee.jpg'
import arduino from '../assets/arduino.jpg'
import waffles from '../assets/waffles.jpg'
import school from '../assets/school.jpg'

const { t } = useI18n()
const dialog = ref(false)
const selectedProject = ref(null)

const destacados = [
  {
    id: 1,
    category: "python",
    techs: ["Python"],
    image: school,
    codeUrl: "https://github.com/artissce/ScholarMaterialManager"
  },
  {
    id: 2,
    category: "web",
    techs: ["React", "JavaScript"],
    image: waffles,
    codeUrl: "https://github.com/artissce/Proyecto_Waffles_React"
  },
  {
    id: 3,
    category: "java",
    techs: ["Java", "JavaFX"],
    image: coffee,
    codeUrl: "https://github.com/artissce/Coffee-Shop-Sales-System"
  },
  {
    id:4,
    category: "c",
    techs: ["Arduino", "C"],
    image: arduino,
    codeUrl: "https://github.com/artissce/Automated-Farm-System"
  }
]

const openDialog = (project) => {
  selectedProject.value = project
  dialog.value = true
}
</script>