<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  change: {
    type: Number,
    default: 0
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'success', 'warning', 'danger'].includes(value)
  },
  loading: Boolean
})

const isPositiveChange = (change) => change > 0
const isNegativeChange = (change) => change < 0
</script>

<template>
  <div :class="['data-stat', `data-stat--${variant}`]">
    <div class="data-stat__icon" v-if="icon">
      <i :class="icon"></i>
    </div>
    <div class="data-stat__content">
      <div class="data-stat__title">{{ title }}</div>
      <div class="data-stat__value" v-if="!loading">
        <span v-if="prefix" class="data-stat__prefix">{{ prefix }}</span>
        {{ value }}
        <span v-if="suffix" class="data-stat__suffix">{{ suffix }}</span>
      </div>
      <div class="data-stat__loading" v-else>
        <div class="data-stat__skeleton"></div>
      </div>
      
      <div class="data-stat__change" v-if="change !== 0 && !loading" :class="{
        'data-stat__change--positive': isPositiveChange(change),
        'data-stat__change--negative': isNegativeChange(change)
      }">
        <span class="data-stat__change-icon">
          {{ isPositiveChange(change) ? '↑' : '↓' }}
        </span>
        {{ Math.abs(change) }}%
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-stat {
  display: flex;
  padding: 20px;
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.data-stat:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.data-stat:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  transition: all 0.3s;
}

.data-stat--primary:before {
  background-color: var(--primary-color);
}

.data-stat--success:before {
  background-color: var(--success-color);
}

.data-stat--warning:before {
  background-color: var(--warning-color);
}

.data-stat--danger:before {
  background-color: var(--danger-color);
}

.data-stat__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: var(--bg-tertiary);
  border-radius: 12px;
  margin-right: 16px;
  font-size: 24px;
}

.data-stat--primary .data-stat__icon {
  color: var(--primary-color);
}

.data-stat--success .data-stat__icon {
  color: var(--success-color);
}

.data-stat--warning .data-stat__icon {
  color: var(--warning-color);
}

.data-stat--danger .data-stat__icon {
  color: var(--danger-color);
}

.data-stat__content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.data-stat__title {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.data-stat__value {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
}

.data-stat__prefix, .data-stat__suffix {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-secondary);
}

.data-stat__change {
  font-size: 12px;
  font-weight: 500;
  margin-top: 6px;
  display: flex;
  align-items: center;
}

.data-stat__change--positive {
  color: var(--success-color);
}

.data-stat__change--negative {
  color: var(--danger-color);
}

.data-stat__change-icon {
  margin-right: 4px;
}

.data-stat__loading {
  height: 24px;
  position: relative;
  overflow: hidden;
  margin-bottom: 6px;
}

.data-stat__skeleton {
  height: 100%;
  width: 80%;
  background: linear-gradient(90deg, var(--border-color) 25%, var(--bg-tertiary) 50%, var(--border-color) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style> 