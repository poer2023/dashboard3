<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ElDatePicker, ElSelect, ElOption, ElTable, ElTableColumn, ElSwitch } from 'element-plus'

const dashboardStore = useDashboardStore()
const {
  conversionData,
  previousPeriodData,
  dateRangeOptions,
  selectedDateRange,
  channelOptions,
  selectedChannel,
  filteredData
} = dashboardStore

// 添加历史数据显示开关
const showHistoricalData = ref(false)

// 默认显示的数据系列 - 从图片示例看只显示UV和注册人数
const activeSeries = ref(['UV', '注册人数'])

// 切换数据系列显示
const toggleSeries = (seriesName) => {
  if (activeSeries.value.includes(seriesName)) {
    activeSeries.value = activeSeries.value.filter(name => name !== seriesName)
  } else {
    activeSeries.value.push(seriesName)
  }
}

// Prepare chart options for the line chart
const lineChartOptions = computed(() => {
  // 设置颜色映射
  const colorMap = {
    'UV': '#409EFF',
    '注册人数': '#67C23A',
    '互动人数': '#E6A23C',
    '付费人数': '#F56C6C',
    '上期UV': '#A0CFFF',
    '上期注册人数': '#B3E19D',
    '上期互动人数': '#F3D19E',
    '上期付费人数': '#FAB6B6'
  }
  
  // 要显示的当前数据系列
  const dataSeriesMap = {
    'UV': {
      name: 'UV',
      type: 'line',
      data: conversionData.map(item => item.uv),
      smooth: true,
      itemStyle: { color: colorMap['UV'] }
    },
    '注册人数': {
      name: '注册人数',
      type: 'line',
      data: conversionData.map(item => item.registrations),
      smooth: true,
      itemStyle: { color: colorMap['注册人数'] }
    },
    '互动人数': {
      name: '互动人数',
      type: 'line',
      data: conversionData.map(item => item.interactions),
      smooth: true,
      itemStyle: { color: colorMap['互动人数'] }
    },
    '付费人数': {
      name: '付费人数',
      type: 'line',
      data: conversionData.map(item => item.payments),
      smooth: true,
      itemStyle: { color: colorMap['付费人数'] }
    }
  }
  
  // 要显示的历史数据系列（与当前数据对应）
  const historicalSeriesMap = {
    'UV': {
      name: '上期UV',
      type: 'line',
      data: previousPeriodData.map(item => item.uv),
      lineStyle: { type: 'dashed' },
      itemStyle: { color: colorMap['上期UV'] }
    },
    '注册人数': {
      name: '上期注册人数',
      type: 'line',
      data: previousPeriodData.map(item => item.registrations),
      lineStyle: { type: 'dashed' },
      itemStyle: { color: colorMap['上期注册人数'] }
    },
    '互动人数': {
      name: '上期互动人数',
      type: 'line',
      data: previousPeriodData.map(item => item.interactions),
      lineStyle: { type: 'dashed' },
      itemStyle: { color: colorMap['上期互动人数'] }
    },
    '付费人数': {
      name: '上期付费人数',
      type: 'line',
      data: previousPeriodData.map(item => item.payments),
      lineStyle: { type: 'dashed' },
      itemStyle: { color: colorMap['上期付费人数'] }
    }
  }
  
  // 创建所有系列（无论是否显示）
  let allSeries = []
  
  // 只添加当前激活的基础数据系列
  activeSeries.value.forEach(name => {
    // 添加基础数据系列
    allSeries.push(dataSeriesMap[name])
    
    // 如果显示历史数据开关打开，添加对应的历史数据系列
    if (showHistoricalData.value) {
      allSeries.push(historicalSeriesMap[name])
    }
  })
  
  return {
    title: {
      text: '拉新数据折线图',
      left: 'left'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      show: true,
      data: activeSeries.value, // 只显示当前数据的标签
      bottom: 0,
      selected: activeSeries.value.reduce((acc, name) => {
        acc[name] = true;
        return acc;
      }, {})
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: conversionData.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: allSeries
  }
})

// 添加图例点击事件处理
const handleChartInit = (chart) => {
  chart.on('legendselectchanged', (params) => {
    // 更新激活的系列
    const newActiveSeries = Object.keys(params.selected)
      .filter(name => params.selected[name])
    
    // 更新 activeSeries
    activeSeries.value = newActiveSeries
  })
}

// Handle date range change
const handleDateRangeChange = (value: string) => {
  dashboardStore.selectedDateRange = value
}

// Handle channel change
const handleChannelChange = (value: string) => {
  dashboardStore.selectedChannel = value
}

// 当前日期
const currentDate = ref('2025年03月23日')
</script>

<template>
  <div class="admin-dashboard">
    <!-- 左侧菜单 -->
    <div class="left-menu">
      <div class="menu-header">
        <div class="logo">数据看板</div>
      </div>
      <div class="menu-items">
        <div class="menu-item active">
          <span class="menu-icon">📈</span>
          <span class="menu-text">拉新</span>
        </div>
        <div class="menu-item">
          <span class="menu-icon">📊</span>
          <span class="menu-text">活跃</span>
        </div>
        <div class="menu-item">
          <span class="menu-icon">📉</span>
          <span class="menu-text">留存</span>
        </div>
        <div class="menu-item">
          <span class="menu-icon">💰</span>
          <span class="menu-text">付费</span>
        </div>
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="dashboard-main" data-dashboard="true">
      <!-- 顶部标题和筛选区 -->
      <div class="dashboard-header">
        <h1 class="dashboard-title">数据图形化分析</h1>
      </div>
      
      <!-- 固定筛选条 -->
      <div class="filter-bar">
        <div class="filter-container">
          <div class="filter-group">
            <span class="filter-label">渠道：</span>
            <el-select v-model="selectedChannel" @change="handleChannelChange" placeholder="选择渠道" size="small" style="width: 180px">
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
            <el-select v-model="selectedDateRange" @change="handleDateRangeChange" placeholder="选择日期范围" size="small" style="width: 180px">
              <el-option
                v-for="item in dateRangeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </div>
      
      <!-- 日期显示 -->
      <div class="date-display">
        {{ currentDate }}
      </div>
      
      <!-- 数据展示区 -->
      <div class="dashboard-content">
        <div class="dashboard-section">
          <div class="section-header">
            <div class="section-title-container">
              <h2 class="section-title">拉新数据</h2>
            </div>
            <div class="section-actions">
              <div class="historical-data-toggle">
                <span>显示历史数据:</span>
                <el-switch v-model="showHistoricalData" />
              </div>
              <div class="export-btn">
                <el-button type="primary" size="small">导出</el-button>
              </div>
            </div>
          </div>
          
          <div class="stats-card">
            <div class="stats-table-container">
              <el-table :data="filteredData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
                <el-table-column prop="date" label="日期" align="center" width="90" />
                <el-table-column prop="uv" label="UV" align="center" />
                <el-table-column prop="registrations" label="注册人数" align="center" />
                <el-table-column prop="interactions" label="互动人数" align="center" />
                <el-table-column prop="payments" label="付费人数" align="center" />
              </el-table>
            </div>
            
            <div class="chart-container">
              <div class="chart-header">
                <h3 class="chart-title">折线图：(拉新数据中下同)</h3>
              </div>
              <v-chart 
                class="chart" 
                :option="lineChartOptions" 
                autoresize
                @initialized="handleChartInit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
}

.dashboard-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.dashboard-filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.filter-group {
  display: flex;
  align-items: center;
}

.filter-label {
  margin-right: 10px;
  font-weight: bold;
}

.dashboard-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.conversion-stats {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.stats-title {
  font-size: 18px;
  margin-bottom: 15px;
}

.stats-table-container {
  margin-bottom: 25px;
}

.chart-container {
  margin-top: 20px;
}

.chart-title {
  font-size: 16px;
  margin-bottom: 10px;
}

.chart {
  height: 400px;
  width: 100%;
}

@media (min-width: 1024px) {
  .dashboard {
    padding: 30px;
  }
  
  .chart {
    height: 500px;
  }
}
</style> 