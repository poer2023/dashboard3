/**
 * Chart.js 图表辅助函数
 */

// 颜色常量映射到CSS变量
const CHART_COLORS = {
  primary: '#5a67d8',
  secondary: '#38b2ac',
  success: '#48bb78',
  warning: '#ed8936',
  danger: '#e53e3e',
  purple: '#805ad5',
  blue: '#3182ce',
  yellow: '#ecc94b',
  red: '#f56565',
  violet: '#9f7aea'
};

/**
 * 创建线图数据
 * @param labels 标签数组
 * @param datasets 数据集数组
 * @param options 其他配置选项
 */
export function createLineChartData(
  labels: string[], 
  datasets: Array<{
    label: string;
    data: number[];
    color?: keyof typeof CHART_COLORS;
  }>,
  options = {}
) {
  return {
    labels,
    datasets: datasets.map((dataset, index) => {
      const colorKey = dataset.color || Object.keys(CHART_COLORS)[index % Object.keys(CHART_COLORS).length] as keyof typeof CHART_COLORS;
      const color = CHART_COLORS[colorKey];
      
      return {
        label: dataset.label,
        data: dataset.data,
        borderColor: color,
        backgroundColor: `${color}20`, // 添加透明度
        pointBackgroundColor: color,
        pointBorderColor: '#ffffff',
        ...options
      };
    })
  };
}

/**
 * 创建柱状图数据
 * @param labels 标签数组
 * @param datasets 数据集数组
 * @param options 其他配置选项
 */
export function createBarChartData(
  labels: string[], 
  datasets: Array<{
    label: string;
    data: number[];
    color?: keyof typeof CHART_COLORS;
  }>,
  options = {}
) {
  return {
    labels,
    datasets: datasets.map((dataset, index) => {
      const colorKey = dataset.color || Object.keys(CHART_COLORS)[index % Object.keys(CHART_COLORS).length] as keyof typeof CHART_COLORS;
      const color = CHART_COLORS[colorKey];
      
      return {
        label: dataset.label,
        data: dataset.data,
        backgroundColor: color,
        hoverBackgroundColor: `${color}cc`, // 添加透明度
        ...options
      };
    })
  };
}

/**
 * 创建饼图/环形图数据
 * @param labels 标签数组
 * @param data 数据数组
 * @param options 其他配置选项
 */
export function createPieChartData(
  labels: string[], 
  data: number[],
  options = {}
) {
  // 获取颜色数组
  const colors = Object.values(CHART_COLORS).slice(0, data.length);
  
  return {
    labels,
    datasets: [{
      data,
      backgroundColor: colors,
      borderColor: '#ffffff',
      borderWidth: 2,
      ...options
    }]
  };
}

/**
 * 创建基本的Chart.js配置选项
 * @param title 图表标题
 * @param subtitle 图表副标题
 * @param options 其他配置选项
 */
export function createChartOptions(
  title?: string,
  subtitle?: string,
  options = {}
) {
  return {
    plugins: {
      title: title ? {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: subtitle ? 0 : 10
        }
      } : undefined,
      subtitle: subtitle ? {
        display: true,
        text: subtitle,
        font: {
          size: 14,
          weight: 'normal'
        },
        padding: {
          bottom: 10
        }
      } : undefined,
      legend: {
        position: 'top',
        align: 'center'
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false
      }
    },
    ...options
  };
} 