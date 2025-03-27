import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface ConversionData {
  date: string
  uv: number
  registrations: number
  interactions: number
  payments: number
}

export interface DateRange {
  label: string
  value: string
}

export const useDashboardStore = defineStore('dashboard', () => {
  // Mock data for the dashboard
  const conversionData = ref<ConversionData[]>([
    { date: '3月20日', uv: 1200, registrations: 340, interactions: 220, payments: 120 },
    { date: '3月19日', uv: 1100, registrations: 320, interactions: 200, payments: 110 },
    { date: '3月18日', uv: 1300, registrations: 360, interactions: 240, payments: 130 },
    { date: '3月17日', uv: 1250, registrations: 350, interactions: 230, payments: 125 },
    { date: '3月16日', uv: 1150, registrations: 330, interactions: 210, payments: 115 },
    { date: '3月15日', uv: 1400, registrations: 380, interactions: 260, payments: 140 },
    { date: '3月14日', uv: 1350, registrations: 370, interactions: 250, payments: 135 },
  ])

  // Previous period data for comparison
  const previousPeriodData = ref<ConversionData[]>([
    { date: '3月13日', uv: 1000, registrations: 300, interactions: 190, payments: 100 },
    { date: '3月12日', uv: 980, registrations: 290, interactions: 180, payments: 95 },
    { date: '3月11日', uv: 1050, registrations: 310, interactions: 200, payments: 105 },
    { date: '3月10日', uv: 1020, registrations: 305, interactions: 195, payments: 102 },
    { date: '3月9日', uv: 990, registrations: 295, interactions: 185, payments: 98 },
    { date: '3月8日', uv: 1070, registrations: 315, interactions: 205, payments: 108 },
    { date: '3月7日', uv: 1030, registrations: 308, interactions: 198, payments: 103 },
  ])

  // Available date range options
  const dateRangeOptions = ref<DateRange[]>([
    { label: '昨日', value: 'yesterday' },
    { label: '近7天', value: 'last7days' },
    { label: '近一个月', value: 'lastMonth' },
    { label: '近3个月', value: 'last3Months' }
  ])

  // Selected date range
  const selectedDateRange = ref('last7days')

  // Available channel options
  const channelOptions = ref([
    { label: '全部', value: 'all' },
    { label: 'SEM', value: 'sem' },
    { label: 'SEO', value: 'seo' },
    { label: 'KOL', value: 'kol' },
    { label: '联想', value: 'related' }
  ])

  // Selected channel
  const selectedChannel = ref('all')

  // Computed property to get filtered data based on selected date range and channel
  const filteredData = computed(() => {
    // In a real application, we would apply filtering logic here
    return conversionData.value
  })

  return {
    conversionData,
    previousPeriodData,
    dateRangeOptions,
    selectedDateRange,
    channelOptions,
    selectedChannel,
    filteredData
  }
}) 