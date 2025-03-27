<script setup lang="ts">
import { ref } from 'vue'
import { ElSelect, ElOption, ElSwitch } from 'element-plus'

// Props for the filter bar
const props = defineProps({
  dateRangeOptions: {
    type: Array,
    default: () => [
      { label: '昨日', value: 'yesterday' },
      { label: '近7天', value: 'last7days' },
      { label: '近一个月', value: 'lastMonth' },
      { label: '近3个月', value: 'last3Months' }
    ]
  },
  channelOptions: {
    type: Array,
    default: () => [
      { label: '全部', value: 'all' },
      { label: 'SEM', value: 'sem' },
      { label: 'SEO', value: 'seo' },
      { label: 'KOL', value: 'kol' },
      { label: '联想', value: 'related' }
    ]
  }
})

// Local state
const selectedDateRange = ref('last7days')
const selectedChannel = ref('all')
const showHistoricalData = ref(false)

// Emits
const emit = defineEmits(['dateChange', 'channelChange', 'historyToggle'])

// Handlers
const handleDateRangeChange = (value: string) => {
  emit('dateChange', value)
}

const handleChannelChange = (value: string) => {
  emit('channelChange', value)
}

const handleHistoricalDataChange = (value: boolean) => {
  emit('historyToggle', value)
}
</script>

<template>
  <div class="filter-bar">
    <div class="filter-container">
      <div class="filter-group">
        <span class="filter-label">渠道：</span>
        <el-select v-model="selectedChannel" @change="handleChannelChange" placeholder="选择渠道" size="default" class="filter-select">
          <el-option
            v-for="item in channelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      
      <div class="filter-group">
        <span class="filter-label">日期：</span>
        <el-select v-model="selectedDateRange" @change="handleDateRangeChange" placeholder="选择日期范围" size="default" class="filter-select">
          <el-option
            v-for="item in dateRangeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      
      <div class="filter-group">
        <span class="filter-label">历史数据：</span>
        <el-switch 
          v-model="showHistoricalData" 
          @change="handleHistoricalDataChange"
          active-color="var(--primary-color)"
          inactive-color="var(--border-color)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  position: fixed;
  top: 70px; /* Dashboard header height */
  left: 220px; /* Left menu width */
  right: 0;
  z-index: 10;
  background-color: var(--bg-primary);
  padding: 16px 25px;
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid var(--border-color);
}

.filter-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

.filter-group {
  display: flex;
  align-items: center;
}

.filter-label {
  margin-right: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  white-space: nowrap;
  font-size: 14px;
}

.filter-select {
  width: 180px;
}

:deep(.el-select .el-input__wrapper) {
  border-radius: var(--border-radius);
  box-shadow: 0 0 0 1px var(--border-color) inset;
}

:deep(.el-select .el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--primary-color) inset;
}

:deep(.el-select .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--primary-color) inset !important;
}

:deep(.el-switch.is-checked .el-switch__core) {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}
</style> 