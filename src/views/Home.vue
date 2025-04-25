<template>
  <v-container class="home-container">
    <div class="dynamic-bg"></div>
    
    <v-row align="center" class="content-row">
      <v-col cols="12" md="6" class="text-col">
        <div class="text-content">
          <h1 class="text-h2 font-weight-bold mb-4 animate-title">
            {{t('homePage.greeting')}} <span class="wave-emoji">👋</span>
          </h1>
          
          <p class="text-h5 mb-8">
            {{t('homePage.introduction')}}
          </p>
          
          
          <div class="buttons-group">
            <v-btn 
              color="primary" 
              size="large"
              to="/projects"
              class="action-btn"
            >
              <v-icon left>mdi-folder-multiple</v-icon>
              {{t('homePage.myProjects')}}
            </v-btn>
          </div>
          
          <div class="social-floating">
            <v-tooltip bottom v-for="(social, i) in socialLinks" :key="i">
              <template v-slot:activator="{ on }">
                <v-btn 
                  icon 
                  large 
                  :color="social.color" 
                  class="mx-2 social-btn"
                  :href="social.url"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon>{{ social.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ social.name }}</span>
            </v-tooltip>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="6" class="spline-col">
          <SplineViewer class="spline-animation" />
      </v-col>
    </v-row>
    
    <!-- Scroll indicator -->
    <div 
      class="scroll-indicator"
      @click="scrollToAbout"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="indicator-container" :class="{ 'hover-effect': isHovered }">
        <div class="chevrons">
          <v-icon class="chevron-1">mdi-chevron-down</v-icon>
          <v-icon class="chevron-2">mdi-chevron-down</v-icon>
          <v-icon class="chevron-3">mdi-chevron-down</v-icon>
        </div>
        <span class="indicator-text">{{t('homePage.meetMe')}}</span>
        <div class="pulse-circle"></div>
      </div>
    </div>
  </v-container>

  <section id="about" class="about-section">
    <About />
  </section>
  <v-container class="py-8">
    <h2 class="text-h4 font-weight-bold mb-6">{{ t('homePage.featuredProjects') }}</h2>
    <FeaturedProjects />

    <div class="text-center mt-4">
      <RouterLink to="/projects">
        <v-btn color="primary">{{t('projects.view_all_projects')}}</v-btn>
      </RouterLink>
    </div>
  </v-container>
</template>

<script setup>
import SplineViewer from '@/components/SplineViewer.vue'
import FeaturedProjects from '@/components/FeaturedProjects.vue'
import About from '@/views/About.vue'
import { useI18n } from 'vue-i18n';


const {t} = useI18n();

const scrollToAbout = () => {
  const aboutSection = document.getElementById('about');
  aboutSection.scrollIntoView({ behavior: 'smooth' });
  
  // Actualiza la URL sin recargar
  window.history.pushState(null, null, '#about');
};

const socialLinks = [
  { name: 'GitHub', icon: 'mdi-github', url: 'https://github.com/artissce', color: 'dark' },
  { name: 'LinkedIn', icon: 'mdi-linkedin', url: 'https://www.linkedin.com/in/ana-karen-cuenca-esquivel-a513302b8/', color: 'primary' },
  { name: 'Instagram', icon: 'mdi-instagram', url: 'https://www.instagram.com/artiss_hasher/', color: 'pink-darken-1' }
]
</script>

<style scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.dynamic-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  z-index: 0;
}

.content-row {
  position: relative;
  z-index: 2;
}

.text-col {
  padding: 2rem;
}

.text-content {
  max-width: 600px;
  margin: 0 auto;
}

.animate-title {
  animation: fadeInUp 0.8s ease-out;
}

.wave-emoji {
  display: inline-block;
  animation: wave 2s infinite;
}

.buttons-group {
  margin-top: 2rem;
  animation: fadeIn 1s ease-out 0.3s both;
}

.action-btn {
  transition: all 0.3s ease;
  transform: translateY(0);
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.social-floating {
  margin-top: 3rem;
  animation: fadeIn 1s ease-out 0.6s both;
}

.social-btn {
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: scale(1.2) translateY(-5px);
}

.spline-col {
  position: relative;
  height: 70vh;
  min-height: 500px;
}

.spline-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.spline-animation {
  width: 100%;
  height: 100%;
  transform: scale(1.1);
  transform-origin: center;
}

.spline-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 40%, rgba(var(--v-theme-background), 0.7) 100%);
  pointer-events: none;
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -50px;
  right: -50px;
  animation: float 8s ease-in-out infinite;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: 50px;
  left: -30px;
  animation: float 6s ease-in-out infinite 2s;
}

.scroll-indicator {
  position: absolute;
  bottom: 240px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(var(--v-theme-on-background), 0.7);
  animation: bounce 2s infinite;
  cursor: pointer;
  z-index: 3;
}

/* Animaciones */
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  75% { transform: rotate(-10deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
  40% { transform: translateY(-20px) translateX(-50%); }
  60% { transform: translateY(-10px) translateX(-50%); }
}

/* Responsive */
@media (max-width: 960px) {
  .scroll-indicator {
    position: relative; /* Cambia a relativo para el flujo normal */
    bottom: auto;
    top: -30px; /* Lo sube para pegarlo al Spline */
    margin-bottom: 20px;
    animation: bounce-mobile 2s infinite;
  }

  @keyframes bounce-mobile {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
    40% { transform: translateY(-10px) translateX(-50%); }
    60% { transform: translateY(-5px) translateX(-50%); }
  }
  .spline-col {
    height: 50vh;
    margin-top: 2rem;
    margin-bottom: 0;
  }
  
  .text-content {
    text-align: center;
  }
  
  .buttons-group {
    justify-content: center;
  }
  
  .social-floating {
    justify-content: center;
  }
}
</style>