<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FilterBar from './FilterBar.vue'

// Router instance
const router = useRouter()
const route = useRoute()

// Filter handlers
const handleDateChange = (value: string) => {
  console.log('Date changed:', value)
}

const handleChannelChange = (value: string) => {
  console.log('Channel changed:', value)
}

const handleHistoryToggle = (value: boolean) => {
  console.log('History toggled:', value)
}

// Get current date formatted
const currentDate = ref('2025年03月23日')
</script>

<template>
  <div class="admin-dashboard">
    <!-- 左侧菜单 -->
    <div class="left-menu">
      <div class="menu-header">
        <div class="logo">
          <span class="logo-icon">📊</span>
          <span class="logo-text">数据看板</span>
        </div>
      </div>
      <div class="menu-items">
        <router-link to="/dashboard" custom v-slot="{ navigate, isActive }">
          <div class="menu-item" :class="{ active: isActive }" @click="navigate">
            <span class="menu-icon">📈</span>
            <span class="menu-text">拉新</span>
          </div>
        </router-link>
        <router-link to="/dashboard/active" custom v-slot="{ navigate, isActive }">
          <div class="menu-item" :class="{ active: isActive }" @click="navigate">
            <span class="menu-icon">📊</span>
            <span class="menu-text">活跃</span>
          </div>
        </router-link>
        <router-link to="/dashboard/retention" custom v-slot="{ navigate, isActive }">
          <div class="menu-item" :class="{ active: isActive }" @click="navigate">
            <span class="menu-icon">📉</span>
            <span class="menu-text">留存</span>
          </div>
        </router-link>
        <router-link to="/dashboard/payment" custom v-slot="{ navigate, isActive }">
          <div class="menu-item" :class="{ active: isActive }" @click="navigate">
            <span class="menu-icon">💰</span>
            <span class="menu-text">付费</span>
          </div>
        </router-link>
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="dashboard-main" data-dashboard="true">
      <!-- 顶部标题和筛选区 -->
      <div class="dashboard-header">
        <h1 class="dashboard-title">{{ route.meta.title || '数据图形化分析' }}</h1>
        <div class="header-actions">
          <span class="header-date">{{ currentDate }}</span>
        </div>
      </div>
      
      <!-- 全局筛选条 -->
      <FilterBar 
        @dateChange="handleDateChange"
        @channelChange="handleChannelChange"
        @historyToggle="handleHistoryToggle"
      />
      
      <!-- 内容插槽 -->
      <div class="dashboard-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.left-menu {
  width: 220px;
  min-width: 220px;
  background-color: #0f172a; /* 深蓝色背景 */
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.menu-header {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: white;
  letter-spacing: 0.5px;
}

.logo-icon {
  font-size: 24px;
  margin-right: 10px;
}

.menu-items {
  padding: 20px 0;
  flex: 1;
}

.menu-item {
  padding: 14px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  margin-bottom: 4px;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-left-color: rgba(255, 255, 255, 0.5);
}

.menu-item.active {
  background-color: #4299e1; /* 蓝色高亮 */
  border-left-color: white;
}

.menu-icon {
  margin-right: 14px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
}

.menu-text {
  font-size: 15px;
  font-weight: 500;
}

.dashboard-main {
  flex: 1;
  padding: 0;
  background-color: #f8f9fa;
  overflow: auto;
  position: relative;
  margin-left: 220px; /* 左侧菜单宽度 */
  padding-top: 134px; /* 头部+筛选栏高度 */
  min-height: 100vh;
}

.dashboard-header {
  background-color: white;
  padding: 20px 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 220px; /* 左侧菜单宽度 */
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #17233d;
}

.header-actions {
  display: flex;
  align-items: center;
}

.header-date {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.dashboard-content {
  padding: 20px 25px;
}
</style> 