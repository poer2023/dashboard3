import type { App as VueApp } from 'vue'
import DashboardCard from './DashboardCard.vue'
import AppButton from './AppButton.vue'
import DataStat from './DataStat.vue'
import DashboardLayout from './DashboardLayout.vue'
import FilterBar from './FilterBar.vue'

// Register all components globally
export default {
  install: (app: VueApp) => {
    app.component('DashboardCard', DashboardCard)
    app.component('AppButton', AppButton)
    app.component('DataStat', DataStat)
    app.component('DashboardLayout', DashboardLayout)
    app.component('FilterBar', FilterBar)
  }
} 