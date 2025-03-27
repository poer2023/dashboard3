<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isDashboardRoute = computed(() => route.path.includes('/dashboard'))
</script>

<template>
  <div class="app-container">
    <RouterView :class="{ 'full-width': isDashboardRoute }" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-secondary);
}

.full-width {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
}
</style>
