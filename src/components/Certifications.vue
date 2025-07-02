<template>
  <v-container class="py-4">
    <!-- Título y Filtros (chips compactos) -->
    <div class="d-flex align-center mb-3">
      <v-chip
        v-for="category in categories"
        :key="category.value"
        size="small"
        :variant="activeCategory === category.value ? 'elevated' : 'outlined'"
        @click="activeCategory = category.value"
        class="mr-2 cursor-pointer"
      >
        {{ t(category.label) }}
      </v-chip>
    </div>

    <!-- Lista Filtrada -->
    <v-list lines="two" class="bg-transparent">
      <v-list-item
        v-for="(cert, index) in filteredCerts"
        :key="index"
        class="px-0"
      >
        <template v-slot:prepend>
          <v-icon :icon="cert.icon" :color="cert.color" size="small" class="mr-3"></v-icon>
        </template>

        <v-list-item-title class="font-weight-medium">
          {{ cert.title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ cert.issuer }} · {{ cert.date }}
          <v-chip
            v-for="(tag, i) in cert.tags"
            :key="i"
            size="x-small"
            class="ml-2"
            variant="outlined"
          >
            {{ tag }}
          </v-chip>
        </v-list-item-subtitle>

        <template v-slot:append v-if="cert.link">
          <v-btn
            icon="mdi-open-in-new"
            variant="text"
            size="x-small"
            :href="cert.link"
            target="_blank"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n' 

const { t } = useI18n()
// Datos de ejemplo (estructura mínima)
const certifications = [
  // Unity
  {
    title: "Unity Certified User: Programmer",
    issuer: "Unity Technologies",
    date: "May 2025",
    icon: "mdi-gamepad-variant",
    color: "deep-purple",
    tags: ["Game Development"],
    category: "dev",
    link: "https://www.credly.com/badges/e47008d6-b4a5-4980-902f-d761d3415b55/public_url"
  },

  // Certiport
  {
    title: "IT Specialist - Databases",
    issuer: "Certiport",
    date: "Feb 2025",
    icon: "mdi-database",
    color: "blue",
    tags: ["SQL"],
    category: "data",
    link: "https://www.credly.com/badges/8d10115c-7a51-4aa1-aaf2-49e4ebacfc43/public_url"
  },
  {
    title: "IT Specialist - Java",
    issuer: "Certiport",
    date: "Jun 2023",
    icon: "mdi-language-java",
    color: "orange-darken-2",
    tags: ["Programming"],
    category: "dev",
    link: "https://www.credly.com/badges/47322a67-ab69-490c-ae0c-4944b19e1305/public_url"
  },

  // Cisco (Redes)
  {
    title: "Networking Academy Learn-A-Thon 2024",
    issuer: "Cisco",
    date: "Jan 2025",
    icon: "mdi-lan-connect",
    color: "light-blue",
    tags: ["Networking"],
    category: "networking",
    link: "https://www.credly.com/badges/5b56f9d5-eaf1-44a6-947c-c3c711b53d3f/public_url"
  },
  {
    title: "Network Technician Career Path",
    issuer: "Cisco",
    date: "Dec 2024",
    icon: "mdi-server-network",
    color: "light-blue-darken-2",
    tags: ["CCNA"],
    category: "networking",
    link: "https://www.credly.com/badges/bae24cf9-cdcc-4017-9a9a-e8a4e4865c37/public_url"
  },
  {
    title: "Network Support and Security",
    issuer: "Cisco",
    date: "Nov 2024",
    icon: "mdi-shield-lock",
    color: "cyan",
    tags: ["Cybersecurity"],
    category: "security",
    link: "https://www.credly.com/badges/a5948aa8-1b34-4245-96db-3e2fc1132d61/public_url"
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco",
    date: "Nov 2024",
    icon: "mdi-chart-box",
    color: "indigo",
    tags: ["Data Analysis"],
    category: "data",
    link: "https://www.credly.com/badges/3b6148bb-5a53-4f73-9f6d-c2a39f05d48e/public_url"
  },
  {
    title: "Network Addressing and Basic Troubleshooting",
    issuer: "Cisco",
    date: "Nov 2024",
    icon: "mdi-ip-network",
    color: "light-blue",
    tags: ["TCP/IP"],
    category: "networking",
    link: "https://www.credly.com/badges/903ac1b1-441a-4aae-b92b-b4472330115c/public_url"
  },
  {
    title: "Networking Devices and Initial Configuration",
    issuer: "Cisco",
    date: "Oct 2024",
    icon: "mdi-router-wireless",
    color: "light-blue",
    tags: ["Cisco IOS"],
    category: "networking",
    link: "https://www.credly.com/badges/e4889bb9-981e-4640-82f0-b87e46ae4e89/public_url"
  },
  {
    title: "Networking Basics",
    issuer: "Cisco",
    date: "Sep 2024",
    icon: "mdi-network",
    color: "light-blue",
    tags: ["Fundamentals"],
    category: "networking",
    link: "https://www.credly.com/badges/79e70891-e190-4390-baea-932198beb70a/public_url"
  },
  {
    title: "IT Essentials",
    issuer: "Cisco",
    date: "Jul 2023",
    icon: "mdi-desktop-classic",
    color: "light-blue",
    tags: ["Hardware"],
    category: "it",
    link: "https://www.credly.com/badges/7e4e6009-7a2b-41af-92d7-8b2b292365ec/public_url"
  },
  {
    title: "Introduction to IoT",
    issuer: "Cisco",
    date: "Sep 2021",
    icon: "mdi-devices",
    color: "light-blue",
    tags: ["IoT"],
    category: "emerging-tech",
    link: "https://www.credly.com/badges/772929da-dd40-453b-951b-9c010be83e31/public_url"
  },

  // Microsoft
  {
    title: "Microsoft Office Specialist: Associate",
    issuer: "Microsoft",
    date: "Jan 2022",
    icon: "mdi-microsoft-office",
    color: "teal",
    tags: ["Productivity"],
    category: "office",
    link: "https://www.credly.com/badges/50fdf000-700e-4d7a-92b7-a169d2c58aef/public_url"
  },
  {
    title: "Excel Associate",
    issuer: "Microsoft",
    date: "Jan 2022",
    icon: "mdi-microsoft-excel",
    color: "green",
    tags: ["Spreadsheets"],
    category: "office",
    link: "https://www.credly.com/badges/19537cf8-183a-4f53-8870-011650ac41ac/public_url"
  },
  {
    title: "PowerPoint Associate",
    issuer: "Microsoft",
    date: "Jan 2022",
    icon: "mdi-microsoft-powerpoint",
    color: "orange",
    tags: ["Presentations"],
    category: "office",
    link: "https://www.credly.com/badges/322f78d2-2902-427e-a3a2-ac919b108a57/public_url"
  },
  {
    title: "Word Associate",
    issuer: "Microsoft",
    date: "Jan 2022",
    icon: "mdi-microsoft-word",
    color: "blue-darken-1",
    tags: ["Word Processing"],
    category: "office",
    link: "https://www.credly.com/badges/6edf2153-7bd4-4228-b2c2-b4c88d67642f/public_url"
  },

  // Otros
  {
    title: "Fundamentals of Predictive Project Management",
    issuer: "Project Management Institute",
    date: "Oct 2024",
    icon: "mdi-chart-gantt",
    color: "purple",
    tags: ["PM"],
    category: "management",
    link: "https://www.credly.com/badges/ae464556-ae52-46ae-82e9-aa460cc52441/public_url"
  },
  {
    title: "Programming Essentials in Python",
    issuer: "PCAP",
    date: "May 2024",
    icon: "mdi-language-python",
    color: "yellow-darken-2",
    tags: ["Python"],
    category: "dev"
  },
  {
    title: "Programming Essentials in C++",
    issuer: "CPA",
    date: "Mar 2024",
    icon: "mdi-code-braces",
    color: "pink",
    tags: ["C++"],
    category: "dev"
  },
  {
    title: "Programming Essentials in C",
    issuer: "CLA",
    date: "Jun 2022",
    icon: "mdi-language-c",
    color: "blue-grey",
    tags: ["C Language"],
    category: "dev"
  }
];

// Categorías para filtrar
const categories = [
  { label: 'certifications.filters.all', value: "all" },
  { label: 'certifications.filters.dev', value: "dev" },
  { label: 'certifications.filters.data', value: "data" },
  { label: 'certifications.filters.networking', value: "networking" },
  { label: 'certifications.filters.security', value: "security" },
  { label: 'certifications.filters.office', value: "office" },
  { label: 'certifications.filters.management', value: "management" },
  { label: 'certifications.filters.it', value: "it" },
];

const activeCategory = ref("dev");

// Lista filtrada
const filteredCerts = computed(() => {
  if (activeCategory.value === "all") return certifications;
  return certifications.filter(cert => cert.category === activeCategory.value);
});
</script>

<style scoped>
/* Estilos minimalistas */
.v-list-item {
  min-height: 48px !important;
}
.cursor-pointer {
  cursor: pointer;
}
</style>