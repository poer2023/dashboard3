<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Redirect to dashboard
  router.push('/dashboard')
})
</script>

<template>
  <main>
    <div class="redirect-message">
      正在跳转到数据看板...
    </div>
  </main>
</template>

<style>
.redirect-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #606266;
}
</style>
