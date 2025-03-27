<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
    default: 'auto'
  },
  noPadding: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="dashboard-card" :style="{ height }">
    <div class="dashboard-card-header" v-if="title || $slots.header">
      <slot name="header">
        <div class="card-title-wrapper">
          <h3 class="card-title">{{ title }}</h3>
          <div class="card-subtitle" v-if="subtitle">{{ subtitle }}</div>
        </div>
      </slot>
      <div class="card-actions" v-if="$slots.actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <div :class="['dashboard-card-body', { 'no-padding': noPadding }]">
      <div v-if="loading" class="card-loading">
        <div class="loading-spinner"></div>
      </div>
      <slot></slot>
    </div>
    <div class="dashboard-card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.dashboard-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin-bottom: 24px;
  transition: box-shadow 0.3s, transform 0.3s;
  position: relative;
  overflow: hidden;
}

.dashboard-card:hover {
  box-shadow: var(--shadow-lg);
}

.dashboard-card-header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.card-title-wrapper {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.card-subtitle {
  font-size: 12px;
  color: var(--text-light);
  margin-top: 4px;
}

.card-actions {
  display: flex;
  align-items: center;
}

.dashboard-card-body {
  padding: 20px;
  position: relative;
}

.dashboard-card-body.no-padding {
  padding: 0;
}

.dashboard-card-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-tertiary);
}

.card-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style> 