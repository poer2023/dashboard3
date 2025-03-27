<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useRouter, useRoute } from 'vue-router'
import { ElDatePicker, ElSelect, ElOption, ElTable, ElTableColumn, ElSwitch, ElTabs, ElTabPane } from 'element-plus'
import DashboardLayout from '@/components/DashboardLayout.vue'

// Router instance
const router = useRouter()
const route = useRoute()

// Register ECharts components
use([
  CanvasRenderer,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent
])

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

// 需要显示的数据系列
const activeSeries = ref(['UV', '注册人数', '互动人数', '付费人数', '会员人数'])

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
  return {
    title: {
      text: '数据趋势',
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
      data: ['UV', '注册人数', '互动人数', '付费人数', '会员人数'],
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
      data: filteredData.map(item => item.date),
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
        name: 'UV',
        type: 'line',
        stack: 'Total',
        data: filteredData.map(item => item.uv),
        emphasis: {
          focus: 'series'
        },
        showSymbol: false,
        smooth: true,
        itemStyle: {
          color: '#409EFF'
        },
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
        name: '注册人数',
        type: 'line',
        stack: 'Total',
        data: filteredData.map(item => item.registrations),
        emphasis: {
          focus: 'series'
        },
        showSymbol: false,
        smooth: true,
        itemStyle: {
          color: '#67C23A'
        },
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
        name: '互动人数',
        type: 'line',
        stack: 'Total',
        data: filteredData.map(item => item.interactions),
        emphasis: {
          focus: 'series'
        },
        showSymbol: false,
        smooth: true,
        itemStyle: {
          color: '#E6A23C'
        },
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
        name: '付费人数',
        type: 'line',
        stack: 'Total',
        data: filteredData.map(item => item.payments),
        emphasis: {
          focus: 'series'
        },
        showSymbol: false,
        smooth: true,
        itemStyle: {
          color: '#F56C6C'
        },
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
                color: 'rgba(245, 108, 108, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(245, 108, 108, 0.01)'
              }
            ]
          }
        },
        animation: true,
        animationDuration: 1000
      },
      {
        name: '会员人数',
        type: 'line',
        stack: 'Total',
        data: filteredData.map(item => item.annualMembers || 0),
        emphasis: {
          focus: 'series'
        },
        showSymbol: false,
        smooth: true,
        itemStyle: {
          color: '#909399'
        },
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
                color: 'rgba(144, 147, 153, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(144, 147, 153, 0.01)'
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

// Conversion Rates Chart Options
const conversionRateChartOptions = computed(() => {
  const colorMap = {
    '注册率': '#409EFF',
    '互动率': '#67C23A',
    '付费率': '#E6A23C',
    '年费会员率': '#F56C6C'
  }
  
  const series = [
    {
      name: '注册率',
      type: 'line',
      data: filteredData.map(item => {
        const rate = item.uv ? (item.registrations / item.uv) : 0;
        return (rate * 100).toFixed(2);
      }),
      smooth: true,
      itemStyle: { color: colorMap['注册率'] }
    },
    {
      name: '互动率',
      type: 'line',
      data: filteredData.map(item => {
        const rate = item.uv ? (item.interactions / item.uv) : 0;
        return (rate * 100).toFixed(2);
      }),
      smooth: true,
      itemStyle: { color: colorMap['互动率'] }
    },
    {
      name: '付费率',
      type: 'line',
      data: filteredData.map(item => {
        const rate = item.uv ? (item.payments / item.uv) : 0;
        return (rate * 100).toFixed(2);
      }),
      smooth: true,
      itemStyle: { color: colorMap['付费率'] }
    },
    {
      name: '年费会员率',
      type: 'line',
      data: filteredData.map(item => {
        const rate = item.payments ? ((item.annualMembers || 0) / item.payments) : 0;
        return (rate * 100).toFixed(2);
      }),
      smooth: true,
      itemStyle: { color: colorMap['年费会员率'] }
    }
  ]
  
  return {
    title: {
      text: '转化率数据趋势',
      left: 'left'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        let result = params[0].name + '<br/>';
        params.forEach(param => {
          result += `${param.seriesName}: ${param.value}%<br/>`;
        });
        return result;
      }
    },
    legend: {
      show: true,
      data: Object.keys(colorMap),
      bottom: 0
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
      data: filteredData.map(item => item.date)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: series
  }
})

// New User Payments Chart Options
const paymentChartOptions = computed(() => {
  return {
    title: {
      text: '新用户付费趋势',
      left: 'left'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['总付费收入', '硬币收入', '会员收入', '硬币占比', '会员占比'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: filteredData.map(item => item.date)
    },
    yAxis: [
      {
        type: 'value',
        name: '收入金额',
        position: 'left'
      },
      {
        type: 'value',
        name: '占比',
        position: 'right',
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: '总付费收入',
        type: 'line',
        data: filteredData.map(item => ((item.coinIncome || 0) + (item.memberIncome || 0))),
        smooth: true,
        itemStyle: { color: '#409EFF' }
      },
      {
        name: '硬币收入',
        type: 'line',
        data: filteredData.map(item => (item.coinIncome || 0)),
        smooth: true,
        itemStyle: { color: '#67C23A' }
      },
      {
        name: '会员收入',
        type: 'line',
        data: filteredData.map(item => (item.memberIncome || 0)),
        smooth: true,
        itemStyle: { color: '#E6A23C' }
      },
      {
        name: '硬币占比',
        type: 'line',
        yAxisIndex: 1,
        data: filteredData.map(item => {
          const total = (item.coinIncome || 0) + (item.memberIncome || 0);
          return total > 0 ? ((item.coinIncome || 0) / total * 100).toFixed(2) : 0;
        }),
        smooth: true,
        itemStyle: { color: '#67C23A', opacity: 0.5 },
        lineStyle: { type: 'dashed' }
      },
      {
        name: '会员占比',
        type: 'line',
        yAxisIndex: 1,
        data: filteredData.map(item => {
          const total = (item.coinIncome || 0) + (item.memberIncome || 0);
          return total > 0 ? ((item.memberIncome || 0) / total * 100).toFixed(2) : 0;
        }),
        smooth: true,
        itemStyle: { color: '#E6A23C', opacity: 0.5 },
        lineStyle: { type: 'dashed' }
      }
    ]
  }
})

// Acquisition Costs Chart Options
const costChartOptions = computed(() => {
  return {
    title: {
      text: '获客成本与ROI趋势',
      left: 'left'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['总成本', '单注册用户成本', '单付费用户成本', '新用户ROI'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: filteredData.map(item => item.date)
    },
    yAxis: [
      {
        type: 'value',
        name: '成本金额',
        position: 'left'
      },
      {
        type: 'value',
        name: 'ROI',
        position: 'right',
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: '总成本',
        type: 'line',
        data: filteredData.map(item => item.totalCost || 0),
        smooth: true,
        itemStyle: { color: '#409EFF' }
      },
      {
        name: '单注册用户成本',
        type: 'line',
        data: filteredData.map(item => ((item.totalCost || 0) / (item.registrations || 1)).toFixed(2)),
        smooth: true,
        itemStyle: { color: '#67C23A' }
      },
      {
        name: '单付费用户成本',
        type: 'line',
        data: filteredData.map(item => ((item.totalCost || 0) / (item.payments || 1)).toFixed(2)),
        smooth: true,
        itemStyle: { color: '#E6A23C' }
      },
      {
        name: '新用户ROI',
        type: 'line',
        yAxisIndex: 1,
        data: filteredData.map(item => ((item.roi || 0) * 100).toFixed(2)),
        smooth: true,
        itemStyle: { color: '#F56C6C' }
      }
    ]
  }
})

// Channel Analysis Data
const channelAnalysisData = computed(() => {
  if (!filteredData.value || filteredData.value.length === 0) return [];
  
  // 使用最新日期的数据
  const latestData = filteredData.value[0];
  
  if (!latestData.channels) return [];
  
  return latestData.channels.map(channel => ({
    channelName: channel.name,
    registrations: channel.registrations || 0,
    payments: channel.payments || 0,
    income: channel.income || 0,
    cost: channel.cost || 0
  }));
})

// 渠道分析选中的数据类型
const selectedChannelDataType = ref('registrations')

// 渠道数据类型选项
const channelDataTypeOptions = [
  { label: '注册用户', value: 'registrations' },
  { label: '付费用户', value: 'payments' },
  { label: '新用户付费收入', value: 'income' },
  { label: '获客成本', value: 'cost' }
]

// Channel Distribution Data with specific channels
const channelDistributionData = computed(() => {
  // 预设的渠道列表
  const channelNames = [
    'SEO', 'SEM', '自然流量', '用户裂变', '自媒体', 
    'KOL', '品牌投放', '官方渠道', '联想'
  ];
  
  // 生成虚假数据
  return channelNames.map((name, index) => {
    // 生成随机的注册用户数（3000-8000范围）
    const registrations = Math.floor(Math.random() * 5000) + 3000;
    // 生成随机的付费用户数（注册用户的10%-20%）
    const payments = Math.floor(registrations * (Math.random() * 0.1 + 0.1));
    // 生成随机的收入（付费用户 * 50-200元）
    const income = payments * (Math.floor(Math.random() * 150) + 50);
    // 生成随机的成本（注册用户 * 5-20元）
    const cost = registrations * (Math.floor(Math.random() * 15) + 5);
    
    // 计算各项的百分比
    const registrationsPercentage = (20 - index * 1.5).toFixed(2);
    const paymentsPercentage = (20 - index * 1.6).toFixed(2);
    const incomePercentage = (20 - index * 1.7).toFixed(2);
    const costPercentage = (20 - index * 1.8).toFixed(2);
    
    // 计算转化率和ROI
    const conversionRate = ((payments / registrations) * 100).toFixed(2);
    const roi = ((income / cost) * 100).toFixed(2);
        
      return {
        channelName: name,
      registrations,
      payments,
      income,
      cost,
      registrationsPercentage,
      paymentsPercentage,
      incomePercentage,
      costPercentage,
        conversionRate,
        roi
      };
  });
})

// 获取当前选中类型的标题
const channelDataTypeTitle = computed(() => {
  const option = channelDataTypeOptions.find(option => option.value === selectedChannelDataType.value);
  return option ? option.label : '';
})

// 基于选中类型获取显示数据
const displayChannelData = computed(() => {
  return channelDistributionData.value.map(item => {
    const value = item[selectedChannelDataType.value] || 0;
    const percentage = item[`${selectedChannelDataType.value}Percentage`] || '0.00';
    
    return {
      channelName: item.channelName,
      value,
      percentage
    };
  });
})

// Channel Pie Chart Options
const channelPieChartOptions = computed(() => {
  // 获取数据并准备单位
  const valueUnit = selectedChannelDataType.value === 'income' || selectedChannelDataType.value === 'cost' ? '元' : '人';
  
  // 准备饼图数据
  const pieData = displayChannelData.value
    .filter(item => item.value > 0)
    .map(item => ({
      name: item.channelName,
      value: item.value
    }));
  
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
      data: pieData.map(item => item.name)
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
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDuration: 1000,
        data: pieData
      }
    ]
  };
});

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
  <DashboardLayout>
      <div class="dashboard-content">
        <div class="dashboard-section">
          <div class="section-header">
            <div class="section-title-container">
              <h2 class="section-title">拉新数据</h2>
            </div>
            <div class="section-actions">
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
                <el-table-column label="会员人数" align="center">
                  <template #default="scope">
                    {{ scope.row.annualMembers || 0 }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
            
            <div class="chart-container">
              <div class="chart-header">
                <h3 class="chart-title">折线图：(拉新数据中下同)</h3>
              </div>
              <v-chart class="chart" :option="lineChartOptions" autoresize />
            </div>
          </div>
        </div>
        
        <!-- Conversion Rates Module -->
        <div class="dashboard-section">
          <div class="section-header">
            <div class="section-title-container">
              <h2 class="section-title">转化率数据</h2>
            </div>
            <div class="section-actions">
              <div class="export-btn">
                <el-button type="primary" size="small">导出</el-button>
              </div>
            </div>
          </div>
          
          <div class="stats-card">
            <div class="stats-table-container">
              <el-table :data="filteredData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
                <el-table-column prop="date" label="日期" align="center" width="90" />
                <el-table-column label="注册率" align="center">
                  <template #default="scope">
                    {{ (scope.row.uv ? (scope.row.registrations / scope.row.uv * 100) : 0).toFixed(2) }}%
                  </template>
                </el-table-column>
                <el-table-column label="互动率" align="center">
                  <template #default="scope">
                    {{ (scope.row.uv ? (scope.row.interactions / scope.row.uv * 100) : 0).toFixed(2) }}%
                  </template>
                </el-table-column>
                <el-table-column label="付费率" align="center">
                  <template #default="scope">
                    {{ (scope.row.uv ? (scope.row.payments / scope.row.uv * 100) : 0).toFixed(2) }}%
                  </template>
                </el-table-column>
                <el-table-column label="年费会员率" align="center">
                  <template #default="scope">
                    {{ (scope.row.payments ? ((scope.row.annualMembers || 0) / scope.row.payments * 100) : 0).toFixed(2) }}%
                  </template>
                </el-table-column>
              </el-table>
            </div>
            
            <div class="chart-container">
              <div class="chart-header">
                <h3 class="chart-title">折线图：转化率统计</h3>
              </div>
              <v-chart class="chart" :option="conversionRateChartOptions" autoresize />
            </div>
          </div>
        </div>
        
        <!-- New User Payments Module -->
        <div class="dashboard-section">
          <div class="section-header">
            <div class="section-title-container">
              <h2 class="section-title">新用户付费数据</h2>
            </div>
            <div class="section-actions">
              <div class="export-btn">
                <el-button type="primary" size="small">导出</el-button>
              </div>
            </div>
          </div>
          
          <div class="stats-card">
            <div class="stats-table-container">
              <el-table :data="filteredData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
                <el-table-column prop="date" label="日期" align="center" width="90" />
                <el-table-column label="新用户付费收入" align="center">
                  <template #default="scope">
                    {{ ((scope.row.coinIncome || 0) + (scope.row.memberIncome || 0)).toLocaleString() }}
                  </template>
                </el-table-column>
                <el-table-column label="硬币收入" align="center">
                  <template #default="scope">
                    {{ (scope.row.coinIncome || 0).toLocaleString() }}
                  </template>
                </el-table-column>
                <el-table-column label="硬币收入占比" align="center">
                  <template #default="scope">
                    {{ (scope.row.coinIncome && (scope.row.coinIncome + (scope.row.memberIncome || 0)) > 0 
                        ? ((scope.row.coinIncome / ((scope.row.coinIncome) + (scope.row.memberIncome || 0))) * 100).toFixed(2) 
                        : 0) }}%
                  </template>
                </el-table-column>
                <el-table-column label="会员收入" align="center">
                  <template #default="scope">
                    {{ (scope.row.memberIncome || 0).toLocaleString() }}
                  </template>
                </el-table-column>
                <el-table-column label="会员收入占比" align="center">
                  <template #default="scope">
                    {{ (scope.row.memberIncome && (scope.row.coinIncome || 0) + (scope.row.memberIncome) > 0 
                        ? ((scope.row.memberIncome / ((scope.row.coinIncome || 0) + scope.row.memberIncome)) * 100).toFixed(2) 
                        : 0) }}%
                  </template>
                </el-table-column>
              </el-table>
            </div>
            
            <div class="chart-container">
              <div class="chart-header">
                <h3 class="chart-title">折线图：新用户付费趋势</h3>
              </div>
              <v-chart class="chart" :option="paymentChartOptions" autoresize />
            </div>
          </div>
        </div>
        
        <!-- Acquisition Costs Module -->
        <div class="dashboard-section">
          <div class="section-header">
            <div class="section-title-container">
              <h2 class="section-title">获客成本数据</h2>
            </div>
            <div class="section-actions">
              <div class="export-btn">
                <el-button type="primary" size="small">导出</el-button>
              </div>
            </div>
          </div>
          
          <div class="stats-card">
            <div class="stats-table-container">
              <el-table :data="filteredData" style="width: 100%" border stripe size="small" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
                <el-table-column prop="date" label="日期" align="center" width="90" />
                <el-table-column label="总成本" align="center">
                  <template #default="scope">
                    {{ (scope.row.totalCost || 0).toLocaleString() }}
                  </template>
                </el-table-column>
                <el-table-column label="单注册用户成本" align="center">
                  <template #default="scope">
                    {{ ((scope.row.totalCost || 0) / (scope.row.registrations || 1)).toFixed(2) }}
                  </template>
                </el-table-column>
                <el-table-column label="单付费用户成本" align="center">
                  <template #default="scope">
                    {{ ((scope.row.totalCost || 0) / (scope.row.payments || 1)).toFixed(2) }}
                  </template>
                </el-table-column>
                <el-table-column label="新用户ROI" align="center">
                  <template #default="scope">
                    {{ ((scope.row.roi || 0) * 100).toFixed(2) }}%
                  </template>
                </el-table-column>
              </el-table>
            </div>
            
            <div class="chart-container">
              <div class="chart-header">
                <h3 class="chart-title">折线图：获客成本与ROI</h3>
              </div>
              <v-chart class="chart" :option="costChartOptions" autoresize />
            </div>
          </div>
        </div>
        
        <!-- Channel Analysis Module -->
        <div class="dashboard-section channel-analysis-section">
          <div class="section-header">
            <div class="section-title-container">
              <h2 class="section-title">渠道占比分析</h2>
            </div>
            <div class="section-actions">
              <div class="export-btn">
                <el-button type="primary" size="small">导出</el-button>
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
                      {{ selectedChannelDataType === 'income' || selectedChannelDataType === 'cost' ? '元' : '人' }}
                    </template>
                  </el-table-column>
                  <el-table-column label="占比" align="center">
                    <template #default="scope">
                      {{ scope.row.percentage }}%
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
      </div>
  </DashboardLayout>
</template>

<style>
/* 应用于整个应用的全局样式 */
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #eef3f8;
  background-image: linear-gradient(135deg, #f0f4f8 0%, #d7e3f0 100%);
}
</style>

<style scoped>
.admin-dashboard {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.left-menu {
  width: 186px;
  min-width: 186px;
  background-color: #001529;
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
}

.menu-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.menu-items {
  padding: 12px 0;
}

.menu-item {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background-color: #1890ff;
}

.menu-icon {
  margin-right: 10px;
  font-size: 16px;
}

.menu-text {
  font-size: 14px;
}

.dashboard-main {
  flex: 1;
  padding: 0;
  background-color: #f0f2f5;
  overflow: auto;
  position: relative;
  margin-left: 186px; /* Left menu width */
  padding-top: 114px; /* Header + filter bar height */
}

.dashboard-header {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 16px 20px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  position: fixed;
  top: 0;
  left: 186px; /* Left menu width */
  right: 0;
  z-index: 10;
}

.dashboard-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: #17233d;
}

.filter-bar {
  position: fixed;
  top: 60px; /* Dashboard header height */
  left: 186px; /* Left menu width */
  right: 0;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 12px 20px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  border-bottom: 1px solid #e8eaec;
}

.filter-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.filter-group {
  display: flex;
  align-items: center;
}

.filter-label {
  margin-right: 10px;
  font-weight: normal;
  color: #515a6e;
  white-space: nowrap;
}

.date-display {
  display: inline-block;
  margin-left: 12px;
  font-size: 14px;
  color: #606266;
  font-weight: normal;
}

.dashboard-content {
  padding: 16px;
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

@media (min-width: 1280px) {
  .dashboard-content {
    padding: 20px;
  }
  
  .chart {
    height: 350px;
  }
}
</style> 