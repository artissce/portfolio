<template>
  <section id="about" class="about-section">
    <v-container>
      <!-- Título -->
      <div class="text-center mb-12">
        <h2 class="text-h3 text-md-h2 font-weight-bold mb-4" :class="titleColor">
          {{ t('about.title') }}
        </h2>
        <v-divider thickness="3" width="100" :color="dividerColor" class="mx-auto"></v-divider>
      </div>

      <!-- Contenido principal (imagen + texto/experiencia) -->
      <v-row align="center" class="about-main-content">
        <!-- Columna izquierda - Imagen -->
        <v-col cols="12" md="5" class="image-col">
          <div class="profile-wrapper">
            <v-img
              :src="meImg"
              alt="Ana CE"
              class="profile-image"
              cover
              :style="{ border: isDark ? '3px solid rgba(var(--v-theme-secondary), 0.3)' : '3px solid rgba(var(--v-theme-primary), 0.3)' }"
            ></v-img>
            <div class="tech-icons" :class="{ 'dark-tech': isDark }">
              <v-icon v-for="(tech, i) in technologies" :key="i" x-large :color="tech.color">
                {{ tech.icon }}
              </v-icon>
            </div>
          </div>
        </v-col>

        <!-- Columna derecha - Texto y experiencia -->
        <v-col cols="12" md="7" class="text-col">
          <div class="text-content">
            <p class="text-h6 mb-6" :class="textColor">
              {{ t('about.intro') }}
            </p>
            
            <!-- Experiencia -->
            <div class="experience-section">
              <h3 class="text-h5 mb-4" :class="textColor">{{ t('about.experience_title') }}</h3>
              <v-carousel
                height="300"
                show-arrows="hover"
                cycle
                hide-delimiter-background
                :progress="isDark ? 'secondary' : 'primary'"
              >
                <v-carousel-item
                  v-for="(exp, i) in experience"
                  :key="i"
                >
                  <v-card
                    class="mx-auto pa-4 "
                    max-width="400"
                    :class="{ 'dark-card': isDark }"
                  >
                    <div class="d-flex justify-space-between align-center mb-2">
                      <v-card-title class="text-h6">{{ exp.title }}</v-card-title>
                      <v-icon color="primary">mdi-briefcase-outline</v-icon>
                    </div>
                    <v-card-subtitle>{{ exp.company }}</v-card-subtitle>
                    <v-card-text>
                      <p class="text-caption font-italic mb-2">{{ exp.date }}</p>
                      <p class="text-body-2">{{ exp.description }}</p>
                    </v-card-text>
                  </v-card>
                </v-carousel-item>
              </v-carousel>
            </div>
          </div> 
        </v-col>
      </v-row>

      <!-- Sección de Skills (nube de palabras) -->
      <v-row class="skills-section">
        <v-col cols="12">
          <div class="skills-wrapper">
            <h3 class="text-h5 mb-6 text-center" :class="textColor">{{ t('about.skills_title') }}</h3>
            <Skills :skills="skills" :textColor="textColor" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import { computed } from 'vue'
import meImg from '../assets/me.jpg'
import Skills from '../components/Skills.vue'


const { t } = useI18n()
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

// Colores dinámicos
const titleColor = computed(() => isDark.value ? 'text-secondary' : 'text-primary')
const dividerColor = computed(() => isDark.value ? 'secondary' : 'primary')
const textColor = computed(() => isDark.value ? 'text-white' : 'text-grey-darken-4')

const skills = [
  'Vue.js 3', 'Vuetify', 'JavaScript', 'TypeScript',
  'Node.js', 'Git', 'UI/UX Design', 'Responsive Design'
]

const technologies = [
  { icon: 'mdi-vuejs', color: 'green' },                
  { icon: 'mdi-language-java', color: 'deep-orange' }, 
  { icon: 'mdi-language-csharp', color: 'indigo' },    
  { icon: 'mdi-language-cpp', color: 'blue' },         
  { icon: 'mdi-database', color: 'orange' }            
]

const experience = [
  {
    date: t('about.exp1_date'),
    title: t('about.exp1_title'),
    company: t('about.exp1_company'),
    description: t('about.exp1_desc'),
    color: 'primary'
  },
  {
    date: t('about.exp2_date'),
    title: t('about.exp2_title'),
    company: t('about.exp2_company'),
    description: t('about.exp2_desc'),
    color: 'secondary'
  }
]
</script>

<style scoped>
.about-section {
  padding: 80px 0;
  position: relative;
}

/* Contenido principal */
.about-main-content {
  margin-bottom: 80px; /* Espacio antes de los skills */
}

.profile-wrapper {
  position: relative;
  max-width: 400px;
  margin: 0 auto 40px;
  padding: 15px;
  background: linear-gradient(
    45deg,
    rgba(var(--v-theme-primary), 0.2),
    rgba(var(--v-theme-secondary), 0.2)
  );
  border-radius: 25px;
}

.profile-image {
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  transform: perspective(1000px) rotateY(-10deg);
  transition: all 0.5s ease;
  aspect-ratio: 1/1;
  width: 100%;
}

.tech-icons {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  background: rgba(var(--v-theme-background), 0.9);
  padding: 12px 24px;
  border-radius: 50px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  backdrop-filter: blur(8px);
}

/* Sección de Skills */
.skills-section {
  margin-top: 60px;
  padding-top: 60px;
  position: relative;
}

.skills-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: rgba(var(--v-theme-primary), 0.5);
}

.skills-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

/* Experiencia */
.experience-section {
  max-width: 600px;
  margin: 0 auto;
}



/* Modo oscuro */
.dark-tech {
  background: rgba(var(--v-theme-background-darken), 0.9) !important;
}

.dark-card {
  background: rgba(var(--v-theme-background-darken), 0.8) !important;
}

/* Responsive */
@media (max-width: 960px) {
  .about-section {
    padding: 60px 0;
  }
  
  .about-main-content {
    margin-bottom: 60px;
  }
  
  .skills-section {
    margin-top: 40px;
    padding-top: 40px;
  }
  
  .profile-wrapper {
    margin-bottom: 60px;
  }
}

@media (max-width: 600px) {
  .profile-wrapper {
    padding: 10px;
    margin-bottom: 50px;
  }
  
  .tech-icons {
    position: relative;
    bottom: auto;
    margin: 20px auto 0;
    width: fit-content;
  }
  
  .skills-section {
    margin-top: 30px;
    padding-top: 30px;
  }
  
  .skills-section::before {
    width: 80px;
  }
}
</style>