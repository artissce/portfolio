<template>
  <!-- Usa un contenedor con "ref" para manipulación dinámica -->
  <div ref="splineContainer"></div>
</template>

<script>
export default {
  mounted() {
    this.loadSplineViewer();
  },
  methods: {
    loadSplineViewer() {
      // 1. Carga el script dinámicamente
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.84/build/spline-viewer.js';
      script.onload = () => {
        // 2. Crea el elemento <spline-viewer> después de cargar el script
        const splineViewer = document.createElement('spline-viewer');
        splineViewer.setAttribute('url', 'https://prod.spline.design/BFpB16pVTRIqchv6/scene.splinecode');
        
        // 3. Añade estilos personalizados si es necesario
        splineViewer.style.width = '100%';
        splineViewer.style.height = '50vh'; // Ajusta según tus necesidades
        
        // 4. Agrega el elemento al DOM
        this.$refs.splineContainer.appendChild(splineViewer);
      };
      document.head.appendChild(script);
    },
  },
};
</script>

<style scoped>
/* Estilos opcionales para el contenedor */
div {
  margin: 0 auto;
  max-width: 1200px;
}
</style>