<template>
  <section id="about" class="about-section">
    <v-container>
      <!-- Título corregido para el tema -->
      <div class="text-center mb-12">
        <h2 class="text-h3 text-md-h2 font-weight-bold mb-4" :class="titleColor">
          {{ t('about.title') }}
        </h2>
        <v-divider thickness="3" width="100" :color="dividerColor" class="mx-auto"></v-divider>
      </div>

      <v-row align="center" class="about-content">
        <v-col cols="12" md="6" :order="$vuetify.display.mobile ? '2' : '1'" class="image-col">
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

        <!-- Columna de texto -->
        <v-col cols="12" md="6" order="1" class="text-col">
          <div class="text-content">
            <p class="text-h6 mb-6" :class="textColor">
              {{ t('about.intro') }}
            </p>
            
            <!--<div class="skills-section mb-8">
              <h3 class="text-h5 mb-4" :class="textColor">{{ t('about.skills_title') }}</h3>
              <div class="skills-grid">
                <div v-for="(skill, i) in skills" :key="i" class="skill-item">
                  <v-icon :color="isDark ? 'secondary' : 'primary'">mdi-check-circle</v-icon>
                  <span :class="textColor">{{ skill }}</span>
                </div>
              </div>
            </div>-->

            <!-- Timeline mejorado -->
            <div class="carousel-section">
              <h3 class="text-h5 mb-4" :class="textColor">{{ t('about.experience_title') }}</h3>
              <v-slide-group show-arrows class="pa-2">
                <v-slide-item
                  v-for="(exp, i) in experience"
                  :key="i"
                >
                <v-card
                  class="mx-4 pa-4 gradient-card"
                  width="300"
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

                </v-slide-item>
              </v-slide-group>
            </div>
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
  { icon: 'mdi-vuejs', color: 'primary' },
  { icon: 'mdi-language-javascript', color: 'amber' },
  { icon: 'mdi-language-typescript', color: 'blue' },
  { icon: 'mdi-nodejs', color: 'green' }
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
  overflow: hidden;
}

/* Efecto de borde dinámico */
.profile-wrapper {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
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

.dark-tech {
  background: rgba(var(--v-theme-background-darken), 0.9) !important;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(var(--v-theme-primary), 0.05);
  transition: all 0.3s ease;
}

.timeline-card {
  transition: all 0.3s ease;
  border-left: 4px solid rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-background-light), 0.8);
}

.dark-card {
  background: rgba(var(--v-theme-background-darken), 0.8) !important;
}

/* Responsive perfecto */
@media (max-width: 960px) {
  .about-section {
    padding: 60px 0;
  }
  
  .profile-wrapper {
    max-width: 350px;
    margin-top: 30px;
  }
  
  .tech-icons {
    position: relative;
    bottom: auto;
    margin: 20px auto 0;
    width: fit-content;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  }
  
  .v-timeline-item {
    flex-direction: column-reverse;
  }
  
  .v-timeline-item__opposite {
    padding-bottom: 0 !important;
  }
}

@media (max-width: 600px) {
  .profile-wrapper {
    padding: 10px;
  }
  
  .tech-icons {
    gap: 10px;
    padding: 8px 16px;
  }
  
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.carousel-section .v-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  border-radius: 16px;
  overflow: hidden;
  background: rgba(var(--v-theme-surface), 0.9);
}

.carousel-section .v-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
.gradient-card {
  background-image: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.1),
    rgba(var(--v-theme-secondary), 0.05)
  );
}
.v-slide-group__content {
  scroll-behavior: smooth;
}



</style>