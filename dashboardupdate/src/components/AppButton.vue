<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  text: Boolean,
  link: Boolean,
  outline: Boolean,
  rounded: Boolean,
  icon: String,
  disabled: Boolean,
  loading: Boolean
})

const buttonClasses = [
  'app-button',
  `app-button--${props.type}`,
  `app-button--${props.size}`,
  { 'app-button--text': props.text },
  { 'app-button--link': props.link },
  { 'app-button--outline': props.outline },
  { 'app-button--rounded': props.rounded },
  { 'app-button--disabled': props.disabled },
  { 'app-button--loading': props.loading },
  { 'app-button--icon-only': props.icon && !$slots.default }
]
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled || loading">
    <span v-if="loading" class="app-button__loader"></span>
    <i v-if="icon && !loading" :class="['app-button__icon', icon]"></i>
    <span v-if="$slots.default" class="app-button__content">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
  outline: none;
  height: 36px;
  position: relative;
  box-shadow: var(--shadow-sm);
}

.app-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.app-button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.app-button--small {
  height: 32px;
  padding: 0 16px;
  font-size: 12px;
}

.app-button--medium {
  height: 36px;
  padding: 0 20px;
  font-size: 14px;
}

.app-button--large {
  height: 42px;
  padding: 0 24px;
  font-size: 16px;
}

.app-button--default {
  background-color: #fff;
  color: var(--text-secondary);
  border-color: var(--border-color);
}

.app-button--primary {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.app-button--success {
  background-color: var(--success-color);
  color: white;
  border-color: var(--success-color);
}

.app-button--warning {
  background-color: var(--warning-color);
  color: white;
  border-color: var(--warning-color);
}

.app-button--danger {
  background-color: var(--danger-color);
  color: white;
  border-color: var(--danger-color);
}

.app-button--outline {
  background-color: transparent;
}

.app-button--outline.app-button--primary {
  color: var(--primary-color);
}

.app-button--outline.app-button--success {
  color: var(--success-color);
}

.app-button--outline.app-button--warning {
  color: var(--warning-color);
}

.app-button--outline.app-button--danger {
  color: var(--danger-color);
}

.app-button--text {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
  padding: 0 8px;
}

.app-button--text.app-button--primary {
  color: var(--primary-color);
}

.app-button--text.app-button--success {
  color: var(--success-color);
}

.app-button--text.app-button--warning {
  color: var(--warning-color);
}

.app-button--text.app-button--danger {
  color: var(--danger-color);
}

.app-button--text:hover {
  background-color: rgba(0, 0, 0, 0.05);
  box-shadow: none;
}

.app-button--link {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
  text-decoration: underline;
  padding: 0 8px;
}

.app-button--link.app-button--primary {
  color: var(--primary-color);
}

.app-button--rounded {
  border-radius: 20px;
}

.app-button--disabled, .app-button[disabled] {
  opacity: 0.65;
  cursor: not-allowed;
  pointer-events: none;
}

.app-button--loading {
  cursor: wait;
}

.app-button__loader {
  width: 16px;
  height: 16px;
  border: 2px solid;
  border-radius: 50%;
  border-top-color: transparent;
  margin-right: 8px;
  animation: button-spin 0.8s linear infinite;
}

.app-button--icon-only {
  padding: 0;
  width: 36px;
}

.app-button--icon-only.app-button--small {
  width: 32px;
}

.app-button--icon-only.app-button--large {
  width: 42px;
}

.app-button__icon {
  margin-right: 8px;
}

.app-button--icon-only .app-button__icon {
  margin-right: 0;
}

@keyframes button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 