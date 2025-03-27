<script setup lang="ts">
// Active Users View (活跃)
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
import { ElDatePicker, ElSelect, ElOption, ElTable, ElTableColumn, ElSwitch, ElTabs, ElTabPane, ElButton } from 'element-plus'

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

// 活跃用户数据
const activeData = ref([
  { date: '2025-03-16', totalUv: 12450, newUserActive: 3245, oldUserActive: 9205, newUserPercentage: 26.1, oldUserPercentage: 73.9 },
  { date: '2025-03-17', totalUv: 12680, newUserActive: 3320, oldUserActive: 9360, newUserPercentage: 26.2, oldUserPercentage: 73.8 },
  { date: '2025-03-18', totalUv: 12520, newUserActive: 3180, oldUserActive: 9340, newUserPercentage: 25.4, oldUserPercentage: 74.6 },
  { date: '2025-03-19', totalUv: 12840, newUserActive: 3410, oldUserActive: 9430, newUserPercentage: 26.6, oldUserPercentage: 74.4 },
  { date: '2025-03-20', totalUv: 13120, newUserActive: 3580, oldUserActive: 9540, newUserPercentage: 27.3, oldUserPercentage: 72.7 },
  { date: '2025-03-21', totalUv: 13380, newUserActive: 3650, oldUserActive: 9730, newUserPercentage: 27.3, oldUserPercentage: 72.7 },
  { date: '2025-03-22', totalUv: 13520, newUserActive: 3720, oldUserActive: 9800, newUserPercentage: 27.5, oldUserPercentage: 72.5 }
])

// 核心活跃数据
const coreActivityData = ref([
  { date: '2025-03-16', questionUsers: 3250, questions: 4520, creatorUsers: 1820, creationClicks: 3560, creationSuccess: 2850, knowledgeBaseUsers: 1450, docsUploaded: 2780 },
  { date: '2025-03-17', questionUsers: 3320, questions: 4620, creatorUsers: 1870, creationClicks: 3680, creationSuccess: 2930, knowledgeBaseUsers: 1520, docsUploaded: 2840 },
  { date: '2025-03-18', questionUsers: 3280, questions: 4580, creatorUsers: 1840, creationClicks: 3620, creationSuccess: 2890, knowledgeBaseUsers: 1480, docsUploaded: 2810 },
  { date: '2025-03-19', questionUsers: 3380, questions: 4720, creatorUsers: 1920, creationClicks: 3720, creationSuccess: 2970, knowledgeBaseUsers: 1550, docsUploaded: 2890 },
  { date: '2025-03-20', questionUsers: 3450, questions: 4850, creatorUsers: 1980, creationClicks: 3820, creationSuccess: 3050, knowledgeBaseUsers: 1620, docsUploaded: 2950 },
  { date: '2025-03-21', questionUsers: 3520, questions: 4920, creatorUsers: 2040, creationClicks: 3890, creationSuccess: 3120, knowledgeBaseUsers: 1680, docsUploaded: 3020 },
  { date: '2025-03-22', questionUsers: 3580, questions: 5050, creatorUsers: 2090, creationClicks: 3940, creationSuccess: 3180, knowledgeBaseUsers: 1730, docsUploaded: 3090 }
])

// 其他活跃数据
const otherActivityData = ref([
  { date: '2025-03-16', newsUsers: 5250, newsReads: 7680, writingGuideUsers: 3120, aiWritingSimilarClicks: 2350, docDownloadClicks: 1580, articlePurchases: 980 },
  { date: '2025-03-17', newsUsers: 5320, newsReads: 7720, writingGuideUsers: 3180, aiWritingSimilarClicks: 2390, docDownloadClicks: 1620, articlePurchases: 1020 },
  { date: '2025-03-18', newsUsers: 5280, newsReads: 7650, writingGuideUsers: 3150, aiWritingSimilarClicks: 2370, docDownloadClicks: 1590, articlePurchases: 990 },
  { date: '2025-03-19', newsUsers: 5380, newsReads: 7780, writingGuideUsers: 3220, aiWritingSimilarClicks: 2420, docDownloadClicks: 1650, articlePurchases: 1050 },
  { date: '2025-03-20', newsUsers: 5450, newsReads: 7850, writingGuideUsers: 3280, aiWritingSimilarClicks: 2480, docDownloadClicks: 1690, articlePurchases: 1080 },
  { date: '2025-03-21', newsUsers: 5530, newsReads: 7920, writingGuideUsers: 3320, aiWritingSimilarClicks: 2520, docDownloadClicks: 1730, articlePurchases: 1120 },
  { date: '2025-03-22', newsUsers: 5590, newsReads: 8050, writingGuideUsers: 3380, aiWritingSimilarClicks: 2580, docDownloadClicks: 1770, articlePurchases: 1160 }
])

// 渠道数据
const channelData = ref([
  { name: '搜索引擎', value: 3850, percentage: 28.5 },
  { name: '社交媒体', value: 2840, percentage: 21.0 },
  { name: '直接访问', value: 2520, percentage: 18.6 },
  { name: '推荐链接', value: 1950, percentage: 14.4 },
  { name: '广告投放', value: 1420, percentage: 10.5 },
  { name: '其他来源', value: 940, percentage: 7.0 }
])

// 客户端数据
const clientData = ref([
  { name: 'iOS APP', value: 5120, percentage: 37.9 },
  { name: 'Android APP', value: 4680, percentage: 34.6 },
  { name: 'PC网页', value: 2350, percentage: 17.4 },
  { name: '移动网页', value: 1050, percentage: 7.8 },
  { name: '微信小程序', value: 320, percentage: 2.3 }
])

// 添加历史数据显示开关
const showHistoricalData = ref(false)

// 渠道数据类型选项
const channelDataTypeOptions = ref([
  { label: '新用户', value: 'newUser' },
  { label: '老用户', value: 'oldUser' },
  { label: '核心活跃', value: 'coreActive' },
  { label: '其余活跃', value: 'otherActive' }
])

// 选择的渠道数据类型
const selectedChannelDataType = ref('newUser')

// 根据选择的数据类型返回显示标题
const channelDataTypeTitle = computed(() => {
  const option = channelDataTypeOptions.value.find(opt => opt.value === selectedChannelDataType.value)
  return option ? option.label : '新用户'
})

// 构建显示的渠道数据
const displayChannelData = computed(() => {
  return channelData.value.map(item => ({
    channelName: item.name,
    value: item.value,
    percentage: item.percentage
  }))
})

// 选择的数据类型
const selectedDataType = ref('coreActive')

// 活跃用户折线图选项
const activeUserChartOptions = computed(() => {
  return {
    title: {
      text: '活跃用户趋势',
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
      data: ['总UV', '新用户活跃', '老用户活跃'],
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
      data: activeData.value.map(item => item.date),
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
        name: '总UV',
        type: 'line',
        data: activeData.value.map(item => item.totalUv),
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
        name: '新用户活跃',
        type: 'line',
        data: activeData.value.map(item => item.newUserActive),
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
        name: '老用户活跃',
        type: 'line',
        data: activeData.value.map(item => item.oldUserActive),
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

// 核心活跃折线图选项
const coreActivityChartOptions = computed(() => {
  return {
    title: {
      text: '核心活跃趋势',
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
      data: ['提问人数', '创作人数', '知识库使用人数'],
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
      data: coreActivityData.value.map(item => item.date),
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
        name: '提问人数',
        type: 'line',
        data: coreActivityData.value.map(item => item.questionUsers),
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
        name: '创作人数',
        type: 'line',
        data: coreActivityData.value.map(item => item.creatorUsers),
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
        name: '知识库使用人数',
        type: 'line',
        data: coreActivityData.value.map(item => item.knowledgeBaseUsers),
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

// 其余活跃折线图选项
const otherActivityChartOptions = computed(() => {
  return {
    title: {
      text: '其余活跃趋势',
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
      data: ['资讯使用人数', '写作宝典使用人数', 'AI写同款点击次数'],
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
      data: otherActivityData.value.map(item => item.date),
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
        name: '资讯使用人数',
        type: 'line',
        data: otherActivityData.value.map(item => item.newsUsers),
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
        name: '写作宝典使用人数',
        type: 'line',
        data: otherActivityData.value.map(item => item.writingGuideUsers),
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
        name: 'AI写同款点击次数',
        type: 'line',
        data: otherActivityData.value.map(item => item.aiWritingSimilarClicks),
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

// 渠道分析图表选项 - 饼图
const channelPieChartOptions = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#333'
      },
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10,
      extraCssText: 'border-radius: 8px; padding: 12px;',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      icon: 'circle',
      textStyle: {
        color: '#606266'
      },
      data: channelData.value.map(item => item.name)
    },
    series: [
      {
        name: channelDataTypeTitle.value,
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: 'rgba(255, 255, 255, 0.8)',
          borderWidth: 2,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.1)'
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%',
          fontSize: 12,
          color: '#606266',
          bleedMargin: 5
        },
        labelLine: {
          length: 10,
          length2: 15,
          smooth: true
        },
        emphasis: {
          scale: true,
          scaleSize: 12,
          focus: 'self',
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#303133'
          },
          itemStyle: {
            shadowBlur: 30,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            borderWidth: 3,
            borderColor: '#fff'
          }
        },
        data: channelData.value.map(item => ({
          name: item.name,
          value: item.value
        })),
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDuration: 1000
      }
    ]
  }
})

// 客户端分析图表选项 - 饼图
const clientPieChartOptions = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#333'
      },
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10,
      extraCssText: 'border-radius: 8px; padding: 12px;',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      icon: 'circle',
      textStyle: {
        color: '#606266'
      },
      data: clientData.value.map(item => item.name)
    },
    series: [
      {
        name: channelDataTypeTitle.value,
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: 'rgba(255, 255, 255, 0.8)',
          borderWidth: 2,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.1)'
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%',
          fontSize: 12,
          color: '#606266',
          bleedMargin: 5
        },
        labelLine: {
          length: 10,
          length2: 15,
          smooth: true
        },
        emphasis: {
          scale: true,
          scaleSize: 12,
          focus: 'self',
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#303133'
          },
          itemStyle: {
            shadowBlur: 30,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            borderWidth: 3,
            borderColor: '#fff'
          }
        },
        data: clientData.value.map(item => ({
          name: item.name,
          value: item.value
        })),
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDuration: 1000
      }
    ]
  }
})

// 导出数据方法
const exportData = () => {
  console.log('导出数据')
}
</script>

<template>
  <DashboardLayout>
    <div class="dashboard-content">
      <!-- 活跃数据 (活跃概览) -->
      <div class="dashboard-section">
        <div class="section-header">
          <div class="section-title-container">
            <h2 class="section-title">活跃数据 <span class="date-display">{{ currentDate }}</span></h2>
          </div>
          <div class="section-actions">
            <div class="export-btn">
              <el-button type="primary" size="small" @click="exportData">导出</el-button>
            </div>
          </div>
        </div>
        
        <div class="stats-card">
          <div class="stats-table-container">
            <el-table :data="activeData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
              <el-table-column prop="date" label="日期" align="center" width="90" />
              <el-table-column prop="totalUv" label="活跃用户" align="center" />
              <el-table-column prop="newUserActive" label="新用户活跃" align="center" />
              <el-table-column label="新用户活跃人数占比" align="center">
                <template #default="scope">
                  {{ scope.row.newUserPercentage.toFixed(1) }}%
                </template>
              </el-table-column>
              <el-table-column prop="oldUserActive" label="老用户活跃" align="center" />
              <el-table-column label="老用户活跃人数占比" align="center">
                <template #default="scope">
                  {{ scope.row.oldUserPercentage.toFixed(1) }}%
                </template>
              </el-table-column>
            </el-table>
          </div>
          
          <div class="chart-container">
            <div class="chart-header">
              <h3 class="chart-title">折线图：活跃用户趋势</h3>
            </div>
            <v-chart class="chart" :option="activeUserChartOptions" autoresize />
          </div>
        </div>
      </div>
      
      <!-- 核心活跃 -->
      <div class="dashboard-section">
        <div class="section-header">
          <div class="section-title-container">
            <h2 class="section-title">核心活跃</h2>
          </div>
          <div class="section-actions">
            <div class="export-btn">
              <el-button type="primary" size="small" @click="exportData">导出</el-button>
            </div>
          </div>
        </div>
        
        <div class="stats-card">
          <div class="stats-table-container">
            <el-table :data="coreActivityData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
              <el-table-column prop="date" label="日期" align="center" width="90" />
              <el-table-column prop="questionUsers" label="提问人数" align="center" />
              <el-table-column prop="questions" label="提问量" align="center" />
              <el-table-column prop="creatorUsers" label="创作人数" align="center" />
              <el-table-column prop="creationClicks" label="创作点击次数" align="center" />
              <el-table-column prop="creationSuccess" label="创作成功次数" align="center" />
              <el-table-column prop="knowledgeBaseUsers" label="知识库使用人数" align="center" />
              <el-table-column prop="docsUploaded" label="文档上传数量" align="center" />
            </el-table>
          </div>
          
          <div class="chart-container">
            <div class="chart-header">
              <h3 class="chart-title">折线图：核心活跃趋势</h3>
            </div>
            <v-chart class="chart" :option="coreActivityChartOptions" autoresize />
          </div>
        </div>
      </div>
      
      <!-- 其余活跃 -->
      <div class="dashboard-section">
        <div class="section-header">
          <div class="section-title-container">
            <h2 class="section-title">其余活跃</h2>
          </div>
          <div class="section-actions">
            <div class="export-btn">
              <el-button type="primary" size="small" @click="exportData">导出</el-button>
            </div>
          </div>
        </div>
        
        <div class="stats-card">
          <div class="stats-table-container">
            <el-table :data="otherActivityData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
              <el-table-column prop="date" label="日期" align="center" width="90" />
              <el-table-column prop="newsUsers" label="资讯使用人数" align="center" />
              <el-table-column prop="newsReads" label="资讯阅读数量" align="center" />
              <el-table-column prop="writingGuideUsers" label="写作宝典使用人数" align="center" />
              <el-table-column prop="aiWritingSimilarClicks" label="AI写同款点击次数" align="center" />
              <el-table-column prop="docDownloadClicks" label="下载文档点击次数" align="center" />
              <el-table-column prop="articlePurchases" label="购买文章次数" align="center" />
            </el-table>
          </div>
          
          <div class="chart-container">
            <div class="chart-header">
              <h3 class="chart-title">折线图：其余活跃趋势</h3>
            </div>
            <v-chart class="chart" :option="otherActivityChartOptions" autoresize />
          </div>
        </div>
      </div>
      
      <!-- 渠道占比分析 -->
      <div class="dashboard-section channel-analysis-section">
        <div class="section-header">
          <div class="section-title-container">
            <h2 class="section-title">渠道占比分析</h2>
          </div>
          <div class="section-actions">
            <div class="export-btn">
              <el-button type="primary" size="small" @click="exportData">导出</el-button>
            </div>
          </div>
        </div>
        
        <div class="stats-card">
          <!-- 渠道数据类型标签页 -->
          <div class="channel-tabs">
            <el-tabs v-model="selectedChannelDataType">
              <el-tab-pane 
                v-for="option in channelDataTypeOptions" 
                :key="option.value" 
                :label="option.label" 
                :name="option.value"
              />
            </el-tabs>
          </div>
          
          <div class="channel-content">
            <!-- 左侧表格 -->
            <div class="channel-table-container">
              <el-table :data="displayChannelData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
                <el-table-column prop="channelName" label="渠道" align="center" width="110" />
                <el-table-column :label="channelDataTypeTitle" align="center">
                  <template #default="scope">
                    {{ scope.row.value.toLocaleString() }}
                    人
                  </template>
                </el-table-column>
                <el-table-column label="占比" align="center">
                  <template #default="scope">
                    {{ scope.row.percentage.toFixed(1) }}%
                  </template>
                </el-table-column>
              </el-table>
            </div>
            
            <!-- 右侧扇形图 -->
            <div class="channel-chart-container">
              <v-chart class="chart" :option="channelPieChartOptions" autoresize />
            </div>
          </div>
        </div>
      </div>
      
      <!-- 客户端占比分析 -->
      <div class="dashboard-section channel-analysis-section">
        <div class="section-header">
          <div class="section-title-container">
            <h2 class="section-title">客户端占比分析</h2>
          </div>
          <div class="section-actions">
            <div class="export-btn">
              <el-button type="primary" size="small" @click="exportData">导出</el-button>
            </div>
          </div>
        </div>
        
        <div class="stats-card">
          <!-- 客户端数据类型标签页 - 与渠道类型共用 -->
          <div class="channel-tabs">
            <el-tabs v-model="selectedChannelDataType">
              <el-tab-pane 
                v-for="option in channelDataTypeOptions" 
                :key="option.value" 
                :label="option.label" 
                :name="option.value"
              />
            </el-tabs>
          </div>
          
          <div class="channel-content">
            <!-- 左侧表格 -->
            <div class="channel-table-container">
              <el-table :data="clientData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
                <el-table-column prop="name" label="客户端" align="center" width="110" />
                <el-table-column :label="channelDataTypeTitle" align="center">
                  <template #default="scope">
                    {{ scope.row.value.toLocaleString() }}
                    人
                  </template>
                </el-table-column>
                <el-table-column label="占比" align="center">
                  <template #default="scope">
                    {{ scope.row.percentage.toFixed(1) }}%
                  </template>
                </el-table-column>
              </el-table>
            </div>
            
            <!-- 右侧扇形图 -->
            <div class="channel-chart-container">
              <v-chart class="chart" :option="clientPieChartOptions" autoresize />
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.dashboard-content {
  padding: 16px;
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dashboard-section {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 21, 41, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s ease;
}

.dashboard-section:hover {
  box-shadow: 0 8px 32px rgba(0, 21, 41, 0.15);
  transform: translateY(-2px);
}

.section-header {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(232, 234, 236, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(248, 248, 249, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.section-title-container {
  display: flex;
  align-items: center;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #17233d;
}

.date-display {
  display: inline-block;
  margin-left: 12px;
  font-size: 14px;
  color: #606266;
  font-weight: normal;
}

.section-actions {
  display: flex;
  align-items: center;
}

.export-btn {
  margin-left: auto;
}

.stats-card {
  padding: 16px;
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.stats-table-container {
  flex: 1;
  min-width: 300px;
}

.chart-container {
  flex: 1;
  min-width: 300px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 21, 41, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.chart-header {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  color: #17233d;
}

.chart {
  height: 300px;
  width: 100%;
}

.channel-analysis-section .stats-card {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.channel-tabs {
  padding: 8px 16px 0;
  background-color: rgba(248, 248, 249, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(232, 234, 236, 0.5);
}

.channel-content {
  display: flex;
  padding: 16px;
  gap: 24px;
}

.channel-table-container {
  flex: 1;
  min-width: 300px;
}

.channel-chart-container {
  flex: 1;
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 21, 41, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.channel-chart-container .chart {
  height: 350px;
}

@media (max-width: 992px) {
  .stats-card,
  .channel-content {
    flex-direction: column;
  }
  
  .stats-table-container,
  .chart-container,
  .channel-table-container,
  .channel-chart-container {
    width: 100%;
  }
}
</style> 