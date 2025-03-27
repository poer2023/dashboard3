import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { use } from "echarts/core"
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  ToolboxComponent
} from 'echarts/components'
import { customEChartsTheme } from './assets/echarts-theme'
import './assets/chart-theme' // 导入Chart.js配置
import globalComponents from './components/index'
import App from './App.vue'
import router from './router'

// Register ECharts components
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  ToolboxComponent
])

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(globalComponents)

// Set Element Plus theme variables
document.documentElement.style.setProperty('--el-color-primary', 'var(--primary-color)')
document.documentElement.style.setProperty('--el-color-primary-light-3', 'var(--primary-light)')
document.documentElement.style.setProperty('--el-color-primary-dark-2', 'var(--primary-dark)')
document.documentElement.style.setProperty('--el-border-radius-base', 'var(--border-radius)')
document.documentElement.style.setProperty('--el-border-color', 'var(--border-color)')
document.documentElement.style.setProperty('--el-text-color-primary', 'var(--text-primary)')
document.documentElement.style.setProperty('--el-text-color-regular', 'var(--text-secondary)')

// Register our custom ECharts theme
window.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  if (window.echarts) {
    // @ts-ignore
    window.echarts.registerTheme('customTheme', customEChartsTheme)
  }
})

app.mount('#app')
