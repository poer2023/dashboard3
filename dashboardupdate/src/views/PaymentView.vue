<script setup lang="ts">
// Payment View (付费)
import { ref, onMounted, computed } from 'vue'
import DashboardLayout from '@/components/DashboardLayout.vue'
import * as echarts from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart, BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ElDatePicker, ElSelect, ElOption, ElTable, ElTableColumn, ElSwitch, ElTabs, ElTabPane } from 'element-plus'

// 注册 ECharts 组件
use([
  CanvasRenderer,
  LineChart,
  PieChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent
])

const currentDate = ref('2025年03月23日')
const selectedChannel = ref('all')
const selectedDateRange = ref('7days')

// 付费金额数据
const paymentAmountData = ref([
  { date: '2025-03-16', totalAmount: 25680, newUserAmount: 9520, oldUserAmount: 16160, adSpending: 7500, netIncome: 18180 },
  { date: '2025-03-17', totalAmount: 26320, newUserAmount: 9850, oldUserAmount: 16470, adSpending: 7800, netIncome: 18520 },
  { date: '2025-03-18', totalAmount: 25920, newUserAmount: 9650, oldUserAmount: 16270, adSpending: 7600, netIncome: 18320 },
  { date: '2025-03-19', totalAmount: 27150, newUserAmount: 10250, oldUserAmount: 16900, adSpending: 8000, netIncome: 19150 },
  { date: '2025-03-20', totalAmount: 28420, newUserAmount: 10820, oldUserAmount: 17600, adSpending: 8200, netIncome: 20220 },
  { date: '2025-03-21', totalAmount: 29180, newUserAmount: 11250, oldUserAmount: 17930, adSpending: 8500, netIncome: 20680 },
  { date: '2025-03-22', totalAmount: 30120, newUserAmount: 11650, oldUserAmount: 18470, adSpending: 8800, netIncome: 21320 }
])

// 付费人数数据
const paymentUsersData = ref([
  { date: '2025-03-16', totalUsers: 1280, newUsers: 520, oldUsers: 760 },
  { date: '2025-03-17', totalUsers: 1320, newUsers: 540, oldUsers: 780 },
  { date: '2025-03-18', totalUsers: 1290, newUsers: 530, oldUsers: 760 },
  { date: '2025-03-19', totalUsers: 1350, newUsers: 560, oldUsers: 790 },
  { date: '2025-03-20', totalUsers: 1420, newUsers: 590, oldUsers: 830 },
  { date: '2025-03-21', totalUsers: 1460, newUsers: 610, oldUsers: 850 },
  { date: '2025-03-22', totalUsers: 1520, newUsers: 640, oldUsers: 880 }
])

// 付费能力数据
const paymentCapabilityData = ref([
  { date: '2025-03-16', avgPrice: 20.06, newUserAvgPrice: 18.31, oldUserAvgPrice: 21.26 },
  { date: '2025-03-17', avgPrice: 19.94, newUserAvgPrice: 18.24, oldUserAvgPrice: 21.11 },
  { date: '2025-03-18', avgPrice: 20.09, newUserAvgPrice: 18.21, oldUserAvgPrice: 21.41 },
  { date: '2025-03-19', avgPrice: 20.11, newUserAvgPrice: 18.30, oldUserAvgPrice: 21.39 },
  { date: '2025-03-20', avgPrice: 20.01, newUserAvgPrice: 18.34, oldUserAvgPrice: 21.20 },
  { date: '2025-03-21', avgPrice: 19.99, newUserAvgPrice: 18.44, oldUserAvgPrice: 21.09 },
  { date: '2025-03-22', avgPrice: 19.82, newUserAvgPrice: 18.20, oldUserAvgPrice: 20.99 }
])

// 收入结构数据
const revenueStructureData = ref([
  { date: '2025-03-16', coinRevenue: 8650, trialMemberRevenue: 7480, annualMemberRevenue: 9550 },
  { date: '2025-03-17', coinRevenue: 8850, trialMemberRevenue: 7720, annualMemberRevenue: 9750 },
  { date: '2025-03-18', coinRevenue: 8750, trialMemberRevenue: 7580, annualMemberRevenue: 9590 },
  { date: '2025-03-19', coinRevenue: 9180, trialMemberRevenue: 7920, annualMemberRevenue: 10050 },
  { date: '2025-03-20', coinRevenue: 9620, trialMemberRevenue: 8320, annualMemberRevenue: 10480 },
  { date: '2025-03-21', coinRevenue: 9880, trialMemberRevenue: 8540, annualMemberRevenue: 10760 },
  { date: '2025-03-22', coinRevenue: 10240, trialMemberRevenue: 8820, annualMemberRevenue: 11060 }
])

// 添加历史数据显示开关
const showHistoricalData = ref(false)

// 选择的数据类型
const selectedDataType = ref('activeUsers')

// 付费金额折线图选项
const paymentAmountChartOptions = computed(() => {
  return {
    title: {
      text: '付费金额趋势',
      left: 'center',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 16,
        color: '#17233d'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#333'
      },
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10,
      extraCssText: 'border-radius: 8px; padding: 12px;'
    },
    legend: {
      data: ['总收入', '新用户收入', '老用户收入', '净收益'],
      bottom: 0,
      icon: 'circle',
      textStyle: {
        color: '#606266'
      },
      itemGap: 20
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: paymentAmountData.value.map(item => item.date),
      axisLine: {
        lineStyle: {
          color: '#E0E6F1'
        }
      },
      axisLabel: {
        color: '#606266'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#E0E6F1',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#606266'
      }
    },
    series: [
      {
        name: '总收入',
        type: 'line',
        data: paymentAmountData.value.map(item => item.totalAmount),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#409EFF' },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(64, 158, 255, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(64, 158, 255, 0.01)'
              }
            ]
          }
        },
        animation: true,
        animationDuration: 1000
      },
      {
        name: '新用户收入',
        type: 'line',
        data: paymentAmountData.value.map(item => item.newUserAmount),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#67C23A' },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(103, 194, 58, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(103, 194, 58, 0.01)'
              }
            ]
          }
        },
        animation: true,
        animationDuration: 1000
      },
      {
        name: '老用户收入',
        type: 'line',
        data: paymentAmountData.value.map(item => item.oldUserAmount),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#E6A23C' },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(230, 162, 60, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(230, 162, 60, 0.01)'
              }
            ]
          }
        },
        animation: true,
        animationDuration: 1000
      },
      {
        name: '净收益',
        type: 'line',
        data: paymentAmountData.value.map(item => item.netIncome),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#F56C6C' },
        lineStyle: {
          width: 3,
          type: 'dashed'
        },
        animation: true,
        animationDuration: 1000
      }
    ]
  }
})

// 付费人数折线图选项
const paymentUsersChartOptions = computed(() => {
  return {
    title: {
      text: '付费人数趋势',
      left: 'center',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 16,
        color: '#17233d'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#333'
      },
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10,
      extraCssText: 'border-radius: 8px; padding: 12px;'
    },
    legend: {
      data: ['付费人数', '付费新用户数', '付费老用户数'],
      bottom: 0,
      icon: 'circle',
      textStyle: {
        color: '#606266'
      },
      itemGap: 20
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: paymentUsersData.value.map(item => item.date),
      axisLine: {
        lineStyle: {
          color: '#E0E6F1'
        }
      },
      axisLabel: {
        color: '#606266'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#E0E6F1',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#606266'
      }
    },
    series: [
      {
        name: '付费人数',
        type: 'line',
        data: paymentUsersData.value.map(item => item.totalUsers),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#409EFF' },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(64, 158, 255, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(64, 158, 255, 0.01)'
              }
            ]
          }
        },
        animation: true,
        animationDuration: 1000
      },
      {
        name: '付费新用户数',
        type: 'line',
        data: paymentUsersData.value.map(item => item.newUsers),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#67C23A' },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(103, 194, 58, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(103, 194, 58, 0.01)'
              }
            ]
          }
        },
        animation: true,
        animationDuration: 1000
      },
      {
        name: '付费老用户数',
        type: 'line',
        data: paymentUsersData.value.map(item => item.oldUsers),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#E6A23C' },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(230, 162, 60, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(230, 162, 60, 0.01)'
              }
            ]
          }
        },
        animation: true,
        animationDuration: 1000
      }
    ]
  }
})

// 付费能力折线图选项
const paymentCapabilityChartOptions = computed(() => {
  return {
    title: {
      text: '客单价趋势',
      left: 'center',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 16,
        color: '#17233d'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#333'
      },
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10,
      extraCssText: 'border-radius: 8px; padding: 12px;'
    },
    legend: {
      data: ['平均客单价', '新用户客单价', '老用户客单价'],
      bottom: 0,
      icon: 'circle',
      textStyle: {
        color: '#606266'
      },
      itemGap: 20
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: paymentCapabilityData.value.map(item => item.date),
      axisLine: {
        lineStyle: {
          color: '#E0E6F1'
        }
      },
      axisLabel: {
        color: '#606266'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#E0E6F1',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#606266'
      }
    },
    series: [
      {
        name: '平均客单价',
        type: 'line',
        data: paymentCapabilityData.value.map(item => item.avgPrice),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#409EFF' },
        lineStyle: {
          width: 3
        },
        animation: true,
        animationDuration: 1000
      },
      {
        name: '新用户客单价',
        type: 'line',
        data: paymentCapabilityData.value.map(item => item.newUserAvgPrice),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#67C23A' },
        lineStyle: {
          width: 3
        },
        animation: true,
        animationDuration: 1000
      },
      {
        name: '老用户客单价',
        type: 'line',
        data: paymentCapabilityData.value.map(item => item.oldUserAvgPrice),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#E6A23C' },
        lineStyle: {
          width: 3
        },
        animation: true,
        animationDuration: 1000
      }
    ]
  }
})

// 收入结构折线图选项
const revenueStructureChartOptions = computed(() => {
  return {
    title: {
      text: '收入结构趋势',
      left: 'center',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 16,
        color: '#17233d'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#333'
      },
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10,
      extraCssText: 'border-radius: 8px; padding: 12px;'
    },
    legend: {
      data: ['硬币收入', '体验会员收入', '年会员收入'],
      bottom: 0,
      icon: 'circle',
      textStyle: {
        color: '#606266'
      },
      itemGap: 20
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: revenueStructureData.value.map(item => item.date),
      axisLine: {
        lineStyle: {
          color: '#E0E6F1'
        }
      },
      axisLabel: {
        color: '#606266'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#E0E6F1',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#606266'
      }
    },
    series: [
      {
        name: '硬币收入',
        type: 'line',
        data: revenueStructureData.value.map(item => item.coinRevenue),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#409EFF' },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(64, 158, 255, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(64, 158, 255, 0.01)'
              }
            ]
          }
        },
        animation: true,
        animationDuration: 1000
      },
      {
        name: '体验会员收入',
        type: 'line',
        data: revenueStructureData.value.map(item => item.trialMemberRevenue),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#67C23A' },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(103, 194, 58, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(103, 194, 58, 0.01)'
              }
            ]
          }
        },
        animation: true,
        animationDuration: 1000
      },
      {
        name: '年会员收入',
        type: 'line',
        data: revenueStructureData.value.map(item => item.annualMemberRevenue),
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#E6A23C' },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(230, 162, 60, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(230, 162, 60, 0.01)'
              }
            ]
          }
        },
        animation: true,
        animationDuration: 1000
      }
    ]
  }
})

// 导出数据
const exportData = () => {
  alert('数据导出功能正在开发中')
}
</script>

<template>
  <DashboardLayout>
    <div class="dashboard-content">
      <!-- 付费金额 -->
      <div class="data-panel">
        <div class="panel-header">
          <h2 class="panel-title">付费金额 <span class="date-display">{{ currentDate }}</span></h2>
          <el-button type="primary" size="small" @click="exportData">导出</el-button>
        </div>
        
        <div class="data-card">
          <!-- 表格部分 -->
          <div class="table-container">
            <el-table :data="paymentAmountData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
              <el-table-column prop="date" label="日期" align="center" width="90" />
              <el-table-column prop="totalAmount" label="总收入" align="center">
                <template #default="scope">{{ scope.row.totalAmount.toLocaleString() }}</template>
              </el-table-column>
              <el-table-column prop="newUserAmount" label="新用户收入" align="center">
                <template #default="scope">{{ scope.row.newUserAmount.toLocaleString() }}</template>
              </el-table-column>
              <el-table-column prop="oldUserAmount" label="老用户收入" align="center">
                <template #default="scope">{{ scope.row.oldUserAmount.toLocaleString() }}</template>
              </el-table-column>
              <el-table-column prop="netIncome" label="净收益" align="center">
                <template #default="scope">{{ scope.row.netIncome.toLocaleString() }}</template>
              </el-table-column>
            </el-table>
          </div>
          
          <!-- 折线图部分 -->
          <div class="chart-area">
            <div class="chart-title">折线图: 付费金额趋势</div>
            <v-chart class="chart" :option="paymentAmountChartOptions" autoresize />
          </div>
        </div>
      </div>
      
      <!-- 付费人数 -->
      <div class="data-panel">
        <div class="panel-header">
          <h2 class="panel-title">付费人数</h2>
          <el-button type="primary" size="small" @click="exportData">导出</el-button>
        </div>
        
        <div class="data-card">
          <!-- 表格部分 -->
          <div class="table-container">
            <el-table :data="paymentUsersData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
              <el-table-column prop="date" label="日期" align="center" width="90" />
              <el-table-column prop="totalUsers" label="付费人数" align="center" />
              <el-table-column prop="newUsers" label="付费新用户人数" align="center" />
              <el-table-column prop="oldUsers" label="付费老用户人数" align="center" />
            </el-table>
          </div>
          
          <!-- 折线图部分 -->
          <div class="chart-area">
            <div class="chart-title">折线图: 付费人数趋势</div>
            <v-chart class="chart" :option="paymentUsersChartOptions" autoresize />
          </div>
        </div>
      </div>
      
      <!-- 付费能力 -->
      <div class="data-panel">
        <div class="panel-header">
          <h2 class="panel-title">付费能力</h2>
          <el-button type="primary" size="small" @click="exportData">导出</el-button>
        </div>
        
        <div class="data-card">
          <!-- 表格部分 -->
          <div class="table-container">
            <el-table :data="paymentCapabilityData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
              <el-table-column prop="date" label="日期" align="center" width="90" />
              <el-table-column label="客单价" align="center">
                <template #default="scope">{{ scope.row.avgPrice.toFixed(2) }}</template>
              </el-table-column>
              <el-table-column label="新用户客单价" align="center">
                <template #default="scope">{{ scope.row.newUserAvgPrice.toFixed(2) }}</template>
              </el-table-column>
              <el-table-column label="老用户客单价" align="center">
                <template #default="scope">{{ scope.row.oldUserAvgPrice.toFixed(2) }}</template>
              </el-table-column>
            </el-table>
          </div>
          
          <!-- 折线图部分 -->
          <div class="chart-area">
            <div class="chart-title">折线图: 客单价趋势</div>
            <v-chart class="chart" :option="paymentCapabilityChartOptions" autoresize />
          </div>
        </div>
      </div>
      
      <!-- 收入结构分析 -->
      <div class="data-panel">
        <div class="panel-header">
          <h2 class="panel-title">收入结构分析</h2>
          <el-button type="primary" size="small" @click="exportData">导出</el-button>
        </div>
        
        <div class="data-card">
          <!-- 表格部分 -->
          <div class="table-container">
            <el-table :data="revenueStructureData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
              <el-table-column prop="date" label="日期" align="center" width="90" />
              <el-table-column label="硬币收入" align="center">
                <template #default="scope">{{ scope.row.coinRevenue.toLocaleString() }}</template>
              </el-table-column>
              <el-table-column label="体验会员收入" align="center">
                <template #default="scope">{{ scope.row.trialMemberRevenue.toLocaleString() }}</template>
              </el-table-column>
              <el-table-column label="年会员收入" align="center">
                <template #default="scope">{{ scope.row.annualMemberRevenue.toLocaleString() }}</template>
              </el-table-column>
            </el-table>
          </div>
          
          <!-- 折线图部分 -->
          <div class="chart-area">
            <div class="chart-title">折线图: 收入结构趋势</div>
            <v-chart class="chart" :option="revenueStructureChartOptions" autoresize />
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.dashboard-content {
  padding: 20px;
  background-color: #f0f2f5;
  background-image: linear-gradient(135deg, #f0f4f8 0%, #d7e3f0 100%);
  margin-top: 48px; /* Add margin-top to account for the fixed FilterBar component */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.data-panel {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 21, 41, 0.1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s ease;
}

.data-panel:hover {
  box-shadow: 0 8px 32px rgba(0, 21, 41, 0.15);
  transform: translateY(-2px);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(232, 234, 236, 0.5);
  background-color: rgba(248, 248, 249, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.panel-title {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #17233d;
}

.date-display {
  font-size: 14px;
  color: #606266;
  margin-left: 8px;
  font-weight: normal;
}

.data-card {
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 16px;
}

.table-container {
  flex: 1;
  min-width: 300px;
}

.chart-area {
  flex: 1;
  min-width: 300px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 21, 41, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.chart-title {
  font-size: 14px;
  font-weight: 500;
  color: #17233d;
  margin-bottom: 12px;
}

.chart {
  height: 300px;
  width: 100%;
}

@media (max-width: 992px) {
  .data-card {
    flex-direction: column;
  }
  
  .table-container,
  .chart-area {
    width: 100%;
  }
}
</style> 