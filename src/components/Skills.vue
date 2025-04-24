<template>
  <div class="word-cloud-container" ref="container">
    <div 
      v-for="(skill, index) in skills" 
      :key="index" 
      class="skill-word"
      :style="getWordStyle(index, currentTime)"
    >
      {{ skill }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const skills = [
  'Vue.js', 'Vuetify', 'JavaScript',
  'React','Java', 'C#', 'C',
  'Arduino', 'Unity', 
  'Python', 'SQL', 'Linux',
  'Node.js', 'Git', 'Express',
  'PostgreSQL', 'MySQL',
  'HTML5', 'CSS3', 'Vue Router',
  'REST API',  'AWS', 'Power BI'
];

const container = ref(null);
const currentTime = ref(0);
const hoverIndex = ref(null);
const dimensions = ref({ width: 0, height: 0 });

// Configuración de animación
const settings = {
  radius: 0.50,  
  speed: 0.0010, 
  baseSize: 0.5,   
  sizeVariation: 0.5 
};

// Actualizar dimensiones al montar y al redimensionar
const updateDimensions = () => {
  if (container.value) {
    dimensions.value = {
      width: container.value.clientWidth,
      height: container.value.clientHeight
    };
  }
};

// Calcular posiciones en 3D con movimiento suave
const getWordPositions = (time) => {
  const centerX = dimensions.value.width / 2;
  const centerY = dimensions.value.height / 2;
  const radius = Math.min(dimensions.value.width, dimensions.value.height) * settings.radius;
  
  return skills.map((_, i) => {
    // Ángulos para distribución esférica
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    
    // Movimiento suave adicional
    const offsetX = Math.sin(time * settings.speed + theta * 0.7) * radius * 0.1;
    const offsetY = Math.cos(time * settings.speed + theta * 0.5) * radius * 0.1;
    
    return {
      x: centerX + radius * Math.sin(phi) * Math.cos(theta) + offsetX,
      y: centerY + radius * Math.sin(phi) * Math.sin(theta) + offsetY,
      z: radius * Math.cos(phi),
      size: settings.baseSize + (Math.sin(phi) * settings.sizeVariation)
    };
  });
};

const darkColors = {
  primary: '#9575CD',
  secondary: '#F06292',
  accent: '#FF8A65',
  error: '#EF5350',
  warning: '#FFB74D',
  info: '#4FC3F7',
  success: '#81C784'
}

const getWordStyle = (index, time) => {
  const positions = getWordPositions(time);
  const pos = positions[index];
  const isHovered = hoverIndex.value === index;
  
  // Efecto de hover más pronunciado
  const hoverEffect = isHovered ? 1.5 : 1;
  const colorPalette = [
        darkColors.primary, darkColors.secondary, darkColors.accent, 
        darkColors.error, darkColors.warning, darkColors.info, darkColors.success
      ]
  const color = colorPalette[index % colorPalette.length]  // Selecciona un color de la lista según el índice

  return {
    position: 'absolute',
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    transform: `translate(-50%, -50%) translateZ(${pos.z}px) scale(${hoverEffect})`,  // Combina la transformación en una sola
    fontSize: `${pos.size}rem`,
    opacity: isHovered ? 1 : Math.max(0.4, 0.4 + (pos.z / 100) * 0.6),
    color: color,
    zIndex: isHovered ? 100 : 50 + Math.floor(pos.z / 2),
    filter: isHovered ? `drop-shadow(0 0 10px ${color})` : 'none',
    transition: isHovered ? 'all 0.2s ease-out' : 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)'
  };
};


// Animación
let animationFrame;
const animate = (time) => {
  currentTime.value = time;
  animationFrame = requestAnimationFrame(animate);
};

onMounted(() => {
  updateDimensions();
  window.addEventListener('resize', updateDimensions);
  animationFrame = requestAnimationFrame(animate);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions);
  cancelAnimationFrame(animationFrame);
});
</script>

<style scoped>
.word-cloud-container {
  position: relative;
  width: 100%;
  height: 500px;
  margin: 2rem auto;
  perspective: 1000px;
}

.skill-word {
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: default;
  white-space: nowrap;
  transform-style: preserve-3d;
  will-change: transform, opacity, filter;
  user-select: none;
}

.skill-word:hover {
  transform: translate(-50%, -50%) scale(1.5) !important;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200 !important;
  opacity: 1 !important;
}

@media (max-width: 768px) {
  .word-cloud-container {
    height: 400px;
  }
  
  .skill-word {
    padding: 0.4rem 0.9rem;
    font-size: 0.9rem !important;
  }
}
</style>