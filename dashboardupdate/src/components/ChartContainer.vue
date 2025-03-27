<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { Chart } from 'chart.js';
import { applyChartjsTheme } from '../assets/chart-theme';
import * as echarts from 'echarts/core';

const props = defineProps({
  // 图表类型：'line', 'bar', 'pie', 'doughnut'等
  type: {
    type: String,
    default: 'line'
  },
  // 图表数据
  data: {
    type: Object,
    required: true
  },
  // 图表配置选项
  options: {
    type: Object,
    default: () => ({})
  },
  // 图表高度
  height: {
    type: String,
    default: '300px'
  },
  // 是否使用Chart.js而不是ECharts
  useChartjs: {
    type: Boolean,
    default: false
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 主题颜色
  theme: {
    type: String,
    default: 'customTheme' // echarts主题名称
  }
});

const chartContainer = ref(null);
let chartInstance = null;

// 初始化图表
const initChart = async () => {
  if (!chartContainer.value) return;
  
  await nextTick();
  
  // 如果图表实例已经存在，先销毁它
  if (chartInstance) {
    if (props.useChartjs) {
      chartInstance.destroy();
    } else {
      chartInstance.dispose();
    }
    chartInstance = null;
  }
  
  if (props.loading) return;
  
  // 根据选择使用不同的图表库
  if (props.useChartjs) {
    initChartjs();
  } else {
    initEcharts();
  }
};

// 初始化Chart.js图表
const initChartjs = () => {
  const ctx = chartContainer.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: props.type,
    data: props.data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      ...props.options
    }
  });
  
  // 应用自定义主题
  applyChartjsTheme(chartInstance);
};

// 初始化ECharts图表
const initEcharts = () => {
  chartInstance = echarts.init(chartContainer.value, props.theme);
  const option = {
    ...props.data,
    ...props.options
  };
  chartInstance.setOption(option);
  
  // 响应窗口调整大小
  window.addEventListener('resize', () => {
    chartInstance?.resize();
  });
};

// 处理属性变化
watch(() => props.data, () => {
  initChart();
}, { deep: true });

watch(() => props.options, () => {
  initChart();
}, { deep: true });

watch(() => props.loading, (val) => {
  if (!val) {
    initChart();
  }
});

watch(() => props.type, () => {
  initChart();
});

watch(() => props.useChartjs, () => {
  initChart();
});

// 组件挂载时初始化图表
onMounted(() => {
  initChart();
});

// 组件卸载前清理
const beforeUnmount = () => {
  if (chartInstance) {
    if (props.useChartjs) {
      chartInstance.destroy();
    } else {
      chartInstance.dispose();
    }
    chartInstance = null;
  }
  
  window.removeEventListener('resize', () => {
    chartInstance?.resize();
  });
};
</script>

<template>
  <div class="chart-wrapper" :style="{ height }">
    <div v-if="loading" class="chart-loading">
      <div class="loading-spinner"></div>
    </div>
    <canvas v-if="useChartjs" ref="chartContainer"></canvas>
    <div v-else ref="chartContainer" class="echarts-container"></div>
  </div>
</template>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
}

.echarts-container {
  width: 100%;
  height: 100%;
}

.chart-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style> 