<template>
  <DashboardLayout>
    <div class="data-card">
      <div class="card-header">
        <h2 class="card-title">活跃数据</h2>
        <div class="card-actions">
          <el-button type="primary" size="small" @click="exportData">导出</el-button>
        </div>
      </div>
      
      <div class="card-body">
        <div class="data-table-container">
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
        
        <div class="data-chart-container">
          <div class="chart-title">活跃用户趋势</div>
          <v-chart class="chart" :option="activeUserChartOptions" autoresize />
        </div>
      </div>
    </div>
    
    <div class="data-card">
      <div class="card-header">
        <h2 class="card-title">核心活跃</h2>
        <div class="card-actions">
          <el-button type="primary" size="small" @click="exportData">导出</el-button>
        </div>
      </div>
      
      <div class="card-body">
        <div class="data-table-container">
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
        
        <div class="data-chart-container">
          <div class="chart-title">核心活跃趋势</div>
          <v-chart class="chart" :option="coreActivityChartOptions" autoresize />
        </div>
      </div>
    </div>
    
    <div class="data-card">
      <div class="card-header">
        <h2 class="card-title">其余活跃</h2>
        <div class="card-actions">
          <el-button type="primary" size="small" @click="exportData">导出</el-button>
        </div>
      </div>
      
      <div class="card-body">
        <div class="data-table-container">
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
        
        <div class="data-chart-container">
          <div class="chart-title">其余活跃趋势</div>
          <v-chart class="chart" :option="otherActivityChartOptions" autoresize />
        </div>
      </div>
    </div>
    
    <div class="data-card">
      <div class="card-header">
        <h2 class="card-title">渠道占比分析</h2>
        <div class="card-actions">
          <el-button type="primary" size="small" @click="exportData">导出</el-button>
        </div>
      </div>
      
      <div class="card-body">
        <div class="data-table-container">
          <el-table :data="channelData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
            <el-table-column prop="name" label="渠道" align="center" />
            <el-table-column prop="value" label="用户数" align="center" />
            <el-table-column label="占比" align="center">
              <template #default="scope">
                {{ scope.row.percentage.toFixed(1) }}%
              </template>
            </el-table-column>
          </el-table>
        </div>
        
        <div class="data-chart-container">
          <div class="chart-title">渠道分析趋势</div>
          <v-chart class="chart" :option="channelChartOptions" autoresize />
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
import { ElButton, ElTable, ElTableColumn } from 'element-plus'

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

// 其余活跃数据
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

// 活跃用户折线图选项
const activeUserChartOptions = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#333'
      }
    },
    legend: {
      data: ['总UV', '新用户活跃', '老用户活跃'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '60px',
      top: '30px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: activeData.value.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '总UV',
        type: 'line',
        data: activeData.value.map(item => item.totalUv),
        smooth: true,
        itemStyle: { color: '#409EFF' }
      },
      {
        name: '新用户活跃',
        type: 'line',
        data: activeData.value.map(item => item.newUserActive),
        smooth: true,
        itemStyle: { color: '#67C23A' }
      },
      {
        name: '老用户活跃',
        type: 'line',
        data: activeData.value.map(item => item.oldUserActive),
        smooth: true,
        itemStyle: { color: '#E6A23C' }
      }
    ]
  }
})

// 核心活跃折线图选项
const coreActivityChartOptions = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#333'
      }
    },
    legend: {
      data: ['提问人数', '创作人数', '知识库使用人数'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '60px',
      top: '30px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: coreActivityData.value.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '提问人数',
        type: 'line',
        data: coreActivityData.value.map(item => item.questionUsers),
        smooth: true,
        itemStyle: { color: '#409EFF' }
      },
      {
        name: '创作人数',
        type: 'line',
        data: coreActivityData.value.map(item => item.creatorUsers),
        smooth: true,
        itemStyle: { color: '#67C23A' }
      },
      {
        name: '知识库使用人数',
        type: 'line',
        data: coreActivityData.value.map(item => item.knowledgeBaseUsers),
        smooth: true,
        itemStyle: { color: '#E6A23C' }
      }
    ]
  }
})

// 其余活跃折线图选项
const otherActivityChartOptions = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#333'
      }
    },
    legend: {
      data: ['资讯使用人数', '写作宝典使用人数', 'AI写同款点击次数'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '60px',
      top: '30px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: otherActivityData.value.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '资讯使用人数',
        type: 'line',
        data: otherActivityData.value.map(item => item.newsUsers),
        smooth: true,
        itemStyle: { color: '#409EFF' }
      },
      {
        name: '写作宝典使用人数',
        type: 'line',
        data: otherActivityData.value.map(item => item.writingGuideUsers),
        smooth: true,
        itemStyle: { color: '#67C23A' }
      },
      {
        name: 'AI写同款点击次数',
        type: 'line',
        data: otherActivityData.value.map(item => item.aiWritingSimilarClicks),
        smooth: true,
        itemStyle: { color: '#E6A23C' }
      }
    ]
  }
})

// 渠道分析图表选项
const channelChartOptions = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#333'
      }
    },
    legend: {
      data: channelData.value.map(item => item.name),
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '60px',
      top: '30px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: activeData.value.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: channelData.value.map((item, index) => {
      const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399', '#6B778C'];
      return {
        name: item.name,
        type: 'line',
        data: activeData.value.map(() => Math.floor(Math.random() * 500 + 500 + index * 100)),
        smooth: true,
        itemStyle: { color: colors[index % colors.length] }
      }
    })
  }
})

// 导出数据方法
const exportData = () => {
  console.log('导出数据')
}
</script>

<style scoped>
.data-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
  margin-bottom: 20px;
}

.card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.card-body {
  padding: 20px;
  display: flex;
}

.data-table-container {
  flex: 1;
  margin-right: 20px;
  min-width: 0;
  max-width: 60%;
}

.data-chart-container {
  flex: 1;
  min-width: 0;
}

.chart-title {
  font-size: 14px;
  color: #606266;
  margin-bottom: 10px;
}

.chart {
  height: 320px;
  width: 100%;
}
</style> 