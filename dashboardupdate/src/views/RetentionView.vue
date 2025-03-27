<script setup lang="ts">
// Retention View (留存)
import { ref, onMounted } from 'vue'
import DashboardLayout from '@/components/DashboardLayout.vue'
import * as echarts from 'echarts'

const currentDate = ref('2025年03月23日')

// Chart refs
const retentionTrendChartRef = ref<HTMLElement | null>(null)

// Chart instances
const retentionTrendChart = ref<echarts.ECharts | null>(null)

// Mock data for retention rates
const retentionRates = {
  daily: [
    { date: '2025-03-16', day1: 100, day2: 45.8, day3: 32.4, day4: 28.7, day5: 22.5, day6: 18.9, day7: 15.2 },
    { date: '2025-03-17', day1: 100, day2: 47.2, day3: 33.8, day4: 27.9, day5: 23.1, day6: 19.2, day7: 16.5 },
    { date: '2025-03-18', day1: 100, day2: 46.5, day3: 33.1, day4: 28.3, day5: 23.9, day6: 19.8, day7: 16.8 },
    { date: '2025-03-19', day1: 100, day2: 48.9, day3: 35.7, day4: 29.5, day5: 24.8, day6: 20.3, day7: 17.1 },
    { date: '2025-03-20', day1: 100, day2: 49.2, day3: 36.3, day4: 30.1, day5: 25.6, day6: 21.2, day7: 18.4 },
    { date: '2025-03-21', day1: 100, day2: 50.1, day3: 37.8, day4: 31.6, day5: 26.7, day6: 22.5, day7: 19.2 },
    { date: '2025-03-22', day1: 100, day2: 51.3, day3: 38.5, day4: 32.8, day5: 27.9, day6: 23.6, day7: 20.1 }
  ],
  weekly: [
    { date: '2025年02月第1周', week1: 100, week2: 62.3, week3: 48.9, week4: 35.2 },
    { date: '2025年02月第2周', week1: 100, week2: 65.1, week3: 51.3, week4: 38.6 },
    { date: '2025年02月第3周', week1: 100, week2: 67.8, week3: 53.5, week4: 41.2 },
    { date: '2025年02月第4周', week1: 100, week2: 69.2, week3: 55.7, week4: 43.8 },
    { date: '2025年03月第1周', week1: 100, week2: 71.5, week3: 58.3, week4: 46.1 },
    { date: '2025年03月第2周', week1: 100, week2: 72.3, week3: 59.8, week4: 48.5 },
    { date: '2025年03月第3周', week1: 100, week2: 74.1, week3: 61.6, week4: 50.2 }
  ],
  monthly: [
    { date: '2024年09月', month1: 100, month2: 71.5, month3: 58.3, month4: 46.1, month5: 36.8, month6: 29.2 },
    { date: '2024年10月', month1: 100, month2: 72.3, month3: 59.1, month4: 47.3, month5: 38.2, month6: 30.5 },
    { date: '2024年11月', month1: 100, month2: 73.8, month3: 60.5, month4: 48.9, month5: 39.6, month6: 31.8 },
    { date: '2024年12月', month1: 100, month2: 74.2, month3: 61.7, month4: 50.3, month5: 41.2, month6: 33.5 },
    { date: '2025年01月', month1: 100, month2: 75.6, month3: 63.2, month4: 52.1, month5: 43.8, month6: 35.2 },
    { date: '2025年02月', month1: 100, month2: 76.3, month3: 64.9, month4: 54.5, month5: 45.3, month6: 37.8 },
    { date: '2025年03月', month1: 100, month2: 77.8, month3: 66.7, month4: 56.9, month5: 47.5, month6: 39.4 }
  ]
}

// Retention metrics
const retentionMetrics = ref([
  { name: '次日留存率', value: '51.3%', trend: '+2.4%', status: 'up' },
  { name: '7日留存率', value: '20.1%', trend: '+1.5%', status: 'up' },
  { name: '30日留存率', value: '8.7%', trend: '+0.8%', status: 'up' },
  { name: '用户平均生命周期', value: '25.6天', trend: '+1.2天', status: 'up' }
])

// Selected time period
const selectedTimePeriod = ref('daily')

// Initialize charts
onMounted(() => {
  initRetentionTrendChart()
})

// Retention Trend Chart
const initRetentionTrendChart = () => {
  if (retentionTrendChartRef.value) {
    retentionTrendChart.value = echarts.init(retentionTrendChartRef.value)

    const data = retentionRates.daily

    const columnNames = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7']
    const columnLabels = ['当日', '次日', '3日', '4日', '5日', '6日', '7日']

    const series = columnNames.map((column, index) => {
      return {
        name: columnLabels[index],
        type: 'line',
        data: data.map(item => item[column])
      }
    })

    const options = {
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          let result = params[0].name + '<br/>';
          params.forEach(param => {
            result += param.seriesName + ': ' + param.value + '%<br/>';
          });
          return result;
        }
      },
      legend: {
        bottom: '0',
        data: columnLabels
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map(item => item.date)
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: series
    }
    
    retentionTrendChart.value.setOption(options)
  }
}

// Export data
const exportData = () => {
  alert('数据导出功能正在开发中')
}

// 修改 getRetentionData 函数
const getRetentionData = (date: string) => {
  const today = new Date('2025-03-23')
  const targetDate = new Date(date)
  const diffDays = Math.floor((today.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24))
  
  return {
    day1: 100,
    day2: diffDays >= 1 ? (45 + Math.random() * 7).toFixed(1) : '',
    day3: diffDays >= 2 ? (32 + Math.random() * 7).toFixed(1) : '',
    day7: diffDays >= 6 ? (15 + Math.random() * 6).toFixed(1) : '',
    day14: diffDays >= 13 ? (8 + Math.random() * 4).toFixed(1) : '',
    day30: diffDays >= 29 ? (5 + Math.random() * 4).toFixed(1) : ''
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="dashboard-content">
      <!-- 数据导出按钮 -->
      <div class="section-header">
        <div class="section-title-container">
          <h2 class="section-title">留存数据</h2>
          <span class="date-display">{{ currentDate }}</span>
        </div>
        <div class="actions">
          <button class="export-btn" @click="exportData">导出数据</button>
        </div>
      </div>
      
      <!-- 留存率概览卡片 -->
      <div class="metrics-container">
        <div 
          v-for="(metric, index) in retentionMetrics" 
          :key="index" 
          class="metric-card"
        >
          <div class="metric-value">{{ metric.value }}</div>
          <div class="metric-name">{{ metric.name }}</div>
          <div 
            class="metric-trend" 
            :class="{ 'trend-up': metric.status === 'up', 'trend-down': metric.status === 'down' }"
          >
            {{ metric.trend }}
            <span class="trend-icon">{{ metric.status === 'up' ? '↑' : '↓' }}</span>
          </div>
        </div>
      </div>
      
      <!-- 留存率数据表 -->
      <div class="data-module">
        <h3 class="module-title">留存率详细数据表</h3>
        <div class="cohort-table-wrapper">
          <table class="cohort-table">
            <thead>
              <tr>
                <th>日期</th>
                <th>新增用户数</th>
                <th>次日留存</th>
                <th>3日留存</th>
                <th>7日留存</th>
                <th>14日留存</th>
                <th>30日留存</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="index in 7" :key="index">
                <td>2025-03-{{ 22 - index + 1 }}</td>
                <td>{{ Math.floor(800 + Math.random() * 400) }}</td>
                <td>{{ getRetentionData(`2025-03-${22 - index + 1}`).day2 }}</td>
                <td>{{ getRetentionData(`2025-03-${22 - index + 1}`).day3 }}</td>
                <td>{{ getRetentionData(`2025-03-${22 - index + 1}`).day7 }}</td>
                <td>{{ getRetentionData(`2025-03-${22 - index + 1}`).day14 }}</td>
                <td>{{ getRetentionData(`2025-03-${22 - index + 1}`).day30 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- 留存率趋势图 -->
      <div class="data-module">
        <h3 class="module-title">留存率趋势</h3>
        <div class="chart-wrapper">
          <div ref="retentionTrendChartRef" class="chart"></div>
        </div>
      </div>
      
      <!-- 删除用户细分与生命周期部分 -->
      
      <!-- 删除流失用户分析部分 -->
    </div>
  </DashboardLayout>
</template>

<style scoped>
.dashboard-content {
  padding: 20px;
  background-color: #f0f2f5;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title-container {
  display: flex;
  align-items: center;
}

.section-title {
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  margin-right: 10px;
}

.date-display {
  font-size: 14px;
  color: #666;
  margin-left: 10px;
}

.actions {
  display: flex;
  gap: 10px;
}

.export-btn {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.export-btn:hover {
  background-color: #40a9ff;
}

/* Metrics Cards */
.metrics-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.metric-card {
  background-color: white;
  border-radius: 4px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.metric-value {
  font-size: 28px;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 8px;
}

.metric-name {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.metric-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trend-up {
  color: #52c41a;
}

.trend-down {
  color: #f5222d;
}

.trend-icon {
  margin-left: 4px;
}

/* Data Modules */
.data-module {
  background-color: white;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.module-title {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 16px;
  color: #17233d;
}

.period-tabs,
.period-tab {
  display: none;
}

.chart-wrapper {
  width: 100%;
}

.chart {
  height: 400px;
  width: 100%;
}

/* Cohort Table */
.cohort-table-wrapper {
  overflow-x: auto;
}

.cohort-table {
  width: 100%;
  border-collapse: collapse;
}

.cohort-table th, .cohort-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e8eaec;
  font-size: 14px; /* 统一字体大小 */
}

.cohort-table th {
  background-color: #f8f8f9;
  font-weight: 500;
  color: #17233d;
}

.cohort-table tr:hover td {
  background-color: #f9fafc;
}

/* Two Column Layout */
.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

/* Lifecycle Table */
.lifecycle-table-wrapper {
  overflow-x: auto;
}

.lifecycle-table {
  width: 100%;
  border-collapse: collapse;
}

.lifecycle-table th, .lifecycle-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e8eaec;
}

.lifecycle-table th {
  background-color: #f8f8f9;
  font-weight: 500;
  color: #17233d;
}

.lifecycle-table tr:hover td {
  background-color: #f9fafc;
}

/* Churn Stats */
.churn-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.churn-stat-card {
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 16px;
  text-align: center;
}

.churn-stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #f5222d;
  margin-bottom: 8px;
}

.churn-stat-label {
  font-size: 14px;
  color: #666;
}

/* Churn Reasons */
.churn-reasons {
  padding: 0 16px;
}

.churn-reasons-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
}

.churn-reason-bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.churn-reason-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}

.reason-label {
  width: 120px;
  font-size: 14px;
  text-align: right;
}

.reason-bar-container {
  flex: 1;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.reason-bar {
  height: 100%;
  background-color: #ff4d4f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  font-size: 12px;
}

/* Responsive styles */
@media (max-width: 1200px) {
  .metrics-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .two-column-layout {
    grid-template-columns: 1fr;
  }
  
  .churn-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .metrics-container {
    grid-template-columns: 1fr;
  }
  
  .churn-stats {
    grid-template-columns: 1fr;
  }
  
  .churn-reason-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .reason-label {
    width: 100%;
    text-align: left;
  }
}
</style> 