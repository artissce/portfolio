<template>
  <v-app>
    <v-container class="py-8">
      <h1 class="text-h3 font-weight-bold mb-6 text-center text-primary">{{t('projects.title')}}</h1>

      <v-text-field
        v-model="searchQuery"
        :label="t('projects.search')"
        prepend-inner-icon="mdi-magnify"
        clearable
        outlined
        rounded
        dense
        class="mb-6 mx-auto"
        style="max-width: 500px;"
      ></v-text-field>

      <v-chip-group
        v-model="filter"
        mandatory
        class="justify-center mb-4"
        @update:modelValue="applyFilters"
      >
      <v-chip filter value="all" color="primary" variant="elevated">{{t('projects.filters.all')}}</v-chip>
        <v-chip filter value="web" color="primary" variant="elevated">{{t('projects.filters.web')}}</v-chip>
        <v-chip filter value="java" color="primary" variant="elevated">Java</v-chip>
        <v-chip filter value="c" color="primary" variant="elevated">C/C++</v-chip>
        <v-chip filter value="python" color="primary" variant="elevated">Python</v-chip>
      </v-chip-group>

      <v-row class="mt-4">
        <v-col v-for="project in paginatedProjects" :key="project.id" cols="12" sm="6" md="4">
          <ProjectCard 
            :project="project" 
            @click="openDialog(project)" 
          />
        </v-col>
      </v-row>
      <v-alert v-if="paginatedProjects.length === 0" type="info" class="mt-4">
        {{t('projects.noResults')}}
      </v-alert>

      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        class="mt-6"
      ></v-pagination>

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
            {{ selectedProject.title }}
          </v-card-title>

          <v-card-subtitle class="px-6 text-subtitle-2 text-grey">
            {{t('projects.modal.category')}} {{ selectedProject.category }}
          </v-card-subtitle>

          <v-card-text class="px-6 pb-4">
            <!-- Tecnologías -->
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

            <!-- Descripción -->
            <p class="text-body-1" style="line-height: 1.6;">
              {{ selectedProject.description }}
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
              {{t('projects.modal.demo')}}
              </v-btn>

              <v-btn
                :href="selectedProject.codeUrl"
                target="_blank"
                color="secondary"
                prepend-icon="mdi-github"
                v-if="selectedProject.codeUrl"
              >
              {{t('projects.modal.code')}}
              </v-btn>
            </div>

            <v-btn @click="dialog = false" color="grey-darken-1" variant="tonal">
              {{t('projects.modal.close')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

import portfolio from '../assets/portfolio.png'
import ia from '../assets/ia.webp'
import gh from '../assets/gh.png'
import cstat from '../assets/stadistics.png'
import cplus from '../assets/c++.png'
import java from '../assets/OIP.jpg'
import coffee from '../assets/coffee.jpg'
import arduino from '../assets/arduino.jpg'
import catman from '../assets/pacman.jpg'
import waffles from '../assets/waffles.jpg'
import school from '../assets/school.jpg'

const filter = ref('all')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 6
const dialog = ref(false)
const selectedProject = ref(null)

const projects = [
  {
    id: 1,
    key: "portfolio",
    category: "web",
    techs: ["Vue", "Vuetify", "JavaScript"],
    image: portfolio,
    codeUrl: "https://github.com/artissce/portfolio",
    demoUrl: "https://artissce.github.io/portfolio/"
  },
  {
    id: 2,
    key: "fsharp-portfolio",
    category: "web",
    techs: ["F#", ".NET"],
    image: ia,
    codeUrl: "https://github.com/artissce/fsharp-portfolio"
  },
  {
    id: 3,
    key: "github-page",
    category: "web",
    techs: ["HTML", "CSS", "JavaScript"],
    image: gh,
    codeUrl: "https://github.com/artissce/artissce.github.io"
  },
  {
    id: 4,
    key: "cstat",
    category: "c",
    techs: ["C"],
    image: cstat,
    codeUrl: "https://github.com/artissce/CStat"
  },
  {
    id: 5,
    key: "progra2",
    category: "c",
    techs: ["C"],
    image: cplus,
    codeUrl: "https://github.com/artissce/Progra2"
  },
  {
    id: 6,
    key: "progra3",
    category: "java",
    techs: ["Java"],
    image: java,
    codeUrl: "https://github.com/artissce/Progra3"
  },
  {
    id: 7,
    key: "coffee-shop",
    category: "java",
    techs: ["Java", "JavaFX"],
    image: coffee,
    codeUrl: "https://github.com/artissce/Coffee-Shop-Sales-System"
  },
  {
    id: 8,
    key: "automated-farm",
    category: "c",
    techs: ["Arduino", "C"],
    image: arduino,
    codeUrl: "https://github.com/artissce/Automated-Farm-System"
  },
  {
    id: 9,
    key: "catman",
    category: "java",
    techs: ["Java", "JavaFX"],
    image: catman,
    codeUrl: "https://github.com/artissce/Catman"
  },
  {
    id: 10,
    key: "waffles-react",
    category: "web",
    techs: ["React", "JavaScript"],
    image: waffles,
    codeUrl: "https://github.com/artissce/Proyecto_Waffles_React"
  },
  {
    id: 11,
    key: "scholar-manager",
    category: "python",
    techs: ["Python"],
    image: school,
    codeUrl: "https://github.com/artissce/ScholarMaterialManager"
  }
]

// Proyectos con textos traducidos
const translatedProjects = computed(() => {
  return projects.map(project => ({
    ...project,
    title: t(`projects.items.${project.key}.title`),
    description: t(`projects.items.${project.key}.description`)
  }))
})

// Filtrado combinado (CORRECCIÓN: usa translatedProjects en lugar de projects)
const filteredProjects = computed(() => {
  let result = translatedProjects.value // <-- Cambio importante aquí
  if (filter.value !== 'all') {
    result = result.filter(p => p.category === filter.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query)
    )
  }
  return result
})

// Paginación
const totalPages = computed(() => 
  Math.ceil(filteredProjects.value.length / itemsPerPage)
)

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProjects.value.slice(start, end)
})

// Funciones
const applyFilters = () => {
  currentPage.value = 1
}

const openDialog = (project) => {
  selectedProject.value = project
  dialog.value = true
}
</script>