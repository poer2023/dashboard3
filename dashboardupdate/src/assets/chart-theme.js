// Chart.js 全局主题配置
import { Chart, registerables } from 'chart.js';

// 注册所有Chart.js组件
Chart.register(...registerables);

// 配置全局默认值
Chart.defaults.font.family = "'Inter', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif";
Chart.defaults.color = '#4a5568';
Chart.defaults.borderColor = '#e2e8f0';
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(255, 255, 255, 0.9)';
Chart.defaults.plugins.tooltip.titleColor = '#1a202c';
Chart.defaults.plugins.tooltip.bodyColor = '#4a5568';
Chart.defaults.plugins.tooltip.borderColor = '#e2e8f0';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.cornerRadius = 6;
Chart.defaults.plugins.tooltip.displayColors = true;
Chart.defaults.plugins.tooltip.boxPadding = 3;
Chart.defaults.plugins.legend.labels.font = {
  family: "'Inter', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif",
  size: 12
};

// 自定义主题颜色
const customColors = [
  '#5a67d8', // primary
  '#38b2ac', // secondary
  '#48bb78', // success
  '#ed8936', // warning
  '#e53e3e', // danger
  '#805ad5', // purple
  '#3182ce', // blue
  '#ecc94b', // yellow
  '#f56565', // red
  '#9f7aea'  // violet
];

// 创建渐变背景
const createGradient = (ctx, colors) => {
  if (!ctx) return colors[0];
  
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  gradient.addColorStop(0, `${colors[0]}cc`); // 添加透明度
  gradient.addColorStop(1, `${colors[0]}22`);
  return gradient;
};

// 线型图表默认配置
const lineChartDefaults = {
  borderWidth: 2,
  tension: 0.4,
  pointRadius: 3,
  pointHoverRadius: 5,
  pointBorderWidth: 2,
  pointBackgroundColor: '#ffffff',
  fill: true,
};

// 柱状图表默认配置
const barChartDefaults = {
  borderRadius: 6,
  borderWidth: 0,
  maxBarThickness: 40,
  borderSkipped: false,
};

// 饼图默认配置
const pieChartDefaults = {
  borderWidth: 1,
  borderColor: '#ffffff',
  hoverBorderWidth: 2,
  hoverBorderColor: '#ffffff',
  spacing: 2,
};

// 导出配置函数
export const applyChartjsTheme = (chartInstance) => {
  if (!chartInstance || !chartInstance.config) return;
  
  // 设置全局字体
  chartInstance.options.font = Chart.defaults.font;
  
  // 根据图表类型应用不同配置
  const type = chartInstance.config.type;
  if (type === 'line') {
    // 应用线型图配置
    chartInstance.data.datasets.forEach((dataset, i) => {
      const color = customColors[i % customColors.length];
      dataset.borderColor = color;
      dataset.backgroundColor = createGradient(chartInstance.ctx, [color]);
      dataset.pointBorderColor = color;
      Object.assign(dataset, lineChartDefaults);
    });
  } else if (type === 'bar') {
    // 应用柱状图配置
    chartInstance.data.datasets.forEach((dataset, i) => {
      const color = customColors[i % customColors.length];
      dataset.backgroundColor = color;
      dataset.hoverBackgroundColor = color;
      Object.assign(dataset, barChartDefaults);
    });
  } else if (type === 'pie' || type === 'doughnut') {
    // 应用饼图配置
    chartInstance.data.datasets.forEach((dataset) => {
      dataset.backgroundColor = customColors;
      Object.assign(dataset, pieChartDefaults);
    });
  }
  
  // 设置网格线样式
  if (chartInstance.options.scales) {
    const axes = ['x', 'y'];
    axes.forEach(axis => {
      if (chartInstance.options.scales[axis]) {
        chartInstance.options.scales[axis].grid = {
          display: true,
          color: '#edf2f7',
          drawBorder: false,
        };
        chartInstance.options.scales[axis].ticks = {
          color: '#718096',
          padding: 8,
        };
      }
    });
  }
  
  // 设置图例样式
  if (chartInstance.options.plugins && chartInstance.options.plugins.legend) {
    chartInstance.options.plugins.legend.labels.usePointStyle = true;
    chartInstance.options.plugins.legend.labels.pointStyle = 'circle';
    chartInstance.options.plugins.legend.labels.boxWidth = 6;
    chartInstance.options.plugins.legend.labels.padding = 20;
  }
  
  // 应用动画
  chartInstance.options.animation = {
    duration: 1000,
    easing: 'easeOutQuart',
  };
  
  // 更新图表
  chartInstance.update();
}; 