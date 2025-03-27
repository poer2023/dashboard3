import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface ConversionData {
  date: string
  uv: number
  registrations: number
  interactions: number
  payments: number
  annualMembers: number
  registrationRate: number
  interactionRate: number
  paymentRate: number
  annualMemberRate: number
  coinIncome: number
  totalCoinIncome: number
  coinIncomeRate: number
  memberIncome: number
  totalMemberIncome: number
  memberIncomeRate: number
  totalCost: number
  registrationCost: number
  paymentCost: number
  roi: number
  channels: {
    name: string
    registrations: number
    payments: number
    income: number
    cost: number
  }[]
}

export interface DateRange {
  label: string
  value: string
}

export const useDashboardStore = defineStore('dashboard', () => {
  // Mock data for the dashboard
  const conversionData = ref<ConversionData[]>([
    { 
      date: '3月20日', 
      uv: 1200, 
      registrations: 340, 
      interactions: 220, 
      payments: 120,
      annualMembers: 60,
      registrationRate: 28.33,
      interactionRate: 18.33,
      paymentRate: 35.29,
      annualMemberRate: 50,
      coinIncome: 6000,
      totalCoinIncome: 12000,
      coinIncomeRate: 50,
      memberIncome: 7200,
      totalMemberIncome: 15000,
      memberIncomeRate: 48,
      totalCost: 10000,
      registrationCost: 29.41,
      paymentCost: 83.33,
      roi: 132,
      channels: [
        { name: 'SEM', registrations: 140, payments: 50, income: 5500, cost: 4000 },
        { name: 'SEO', registrations: 80, payments: 30, income: 3200, cost: 2500 },
        { name: 'KOL', registrations: 70, payments: 25, income: 2800, cost: 2200 },
        { name: '联想', registrations: 50, payments: 15, income: 1700, cost: 1300 }
      ]
    },
    { 
      date: '3月19日', 
      uv: 1100, 
      registrations: 320, 
      interactions: 200, 
      payments: 110,
      annualMembers: 55,
      registrationRate: 29.09,
      interactionRate: 18.18,
      paymentRate: 34.38,
      annualMemberRate: 50,
      coinIncome: 5800,
      totalCoinIncome: 11600,
      coinIncomeRate: 50,
      memberIncome: 6600,
      totalMemberIncome: 14000,
      memberIncomeRate: 47.14,
      totalCost: 9500,
      registrationCost: 29.69,
      paymentCost: 86.36,
      roi: 130.53,
      channels: [
        { name: 'SEM', registrations: 130, payments: 45, income: 5200, cost: 3800 },
        { name: 'SEO', registrations: 75, payments: 28, income: 3000, cost: 2300 },
        { name: 'KOL', registrations: 65, payments: 22, income: 2600, cost: 2100 },
        { name: '联想', registrations: 50, payments: 15, income: 1600, cost: 1300 }
      ]
    },
    { 
      date: '3月18日', 
      uv: 1300, 
      registrations: 360, 
      interactions: 240, 
      payments: 130,
      annualMembers: 65,
      registrationRate: 27.69,
      interactionRate: 18.46,
      paymentRate: 36.11,
      annualMemberRate: 50,
      coinIncome: 6500,
      totalCoinIncome: 13000,
      coinIncomeRate: 50,
      memberIncome: 7800,
      totalMemberIncome: 16000,
      memberIncomeRate: 48.75,
      totalCost: 10500,
      registrationCost: 29.17,
      paymentCost: 80.77,
      roi: 136.19,
      channels: [
        { name: 'SEM', registrations: 150, payments: 55, income: 5900, cost: 4200 },
        { name: 'SEO', registrations: 85, payments: 32, income: 3400, cost: 2600 },
        { name: 'KOL', registrations: 75, payments: 28, income: 3000, cost: 2400 },
        { name: '联想', registrations: 50, payments: 15, income: 1800, cost: 1300 }
      ]
    },
    { 
      date: '3月17日', 
      uv: 1250, 
      registrations: 350, 
      interactions: 230, 
      payments: 125,
      annualMembers: 62,
      registrationRate: 28,
      interactionRate: 18.4,
      paymentRate: 35.71,
      annualMemberRate: 49.6,
      coinIncome: 6250,
      totalCoinIncome: 12500,
      coinIncomeRate: 50,
      memberIncome: 7500,
      totalMemberIncome: 15500,
      memberIncomeRate: 48.39,
      totalCost: 10200,
      registrationCost: 29.14,
      paymentCost: 81.6,
      roi: 134.8,
      channels: [
        { name: 'SEM', registrations: 145, payments: 52, income: 5700, cost: 4100 },
        { name: 'SEO', registrations: 82, payments: 31, income: 3300, cost: 2550 },
        { name: 'KOL', registrations: 73, payments: 27, income: 2900, cost: 2250 },
        { name: '联想', registrations: 50, payments: 15, income: 1750, cost: 1300 }
      ]
    },
    { 
      date: '3月16日', 
      uv: 1150, 
      registrations: 330, 
      interactions: 210, 
      payments: 115,
      annualMembers: 57,
      registrationRate: 28.7,
      interactionRate: 18.26,
      paymentRate: 34.85,
      annualMemberRate: 49.57,
      coinIncome: 5750,
      totalCoinIncome: 11500,
      coinIncomeRate: 50,
      memberIncome: 6900,
      totalMemberIncome: 14500,
      memberIncomeRate: 47.59,
      totalCost: 9800,
      registrationCost: 29.7,
      paymentCost: 85.22,
      roi: 129.08,
      channels: [
        { name: 'SEM', registrations: 135, payments: 48, income: 5400, cost: 3900 },
        { name: 'SEO', registrations: 78, payments: 29, income: 3100, cost: 2400 },
        { name: 'KOL', registrations: 67, payments: 23, income: 2700, cost: 2200 },
        { name: '联想', registrations: 50, payments: 15, income: 1650, cost: 1300 }
      ]
    },
    { 
      date: '3月15日', 
      uv: 1400, 
      registrations: 380, 
      interactions: 260, 
      payments: 140,
      annualMembers: 70,
      registrationRate: 27.14,
      interactionRate: 18.57,
      paymentRate: 36.84,
      annualMemberRate: 50,
      coinIncome: 7000,
      totalCoinIncome: 14000,
      coinIncomeRate: 50,
      memberIncome: 8400,
      totalMemberIncome: 17000,
      memberIncomeRate: 49.41,
      totalCost: 11000,
      registrationCost: 28.95,
      paymentCost: 78.57,
      roi: 140,
      channels: [
        { name: 'SEM', registrations: 160, payments: 60, income: 6300, cost: 4400 },
        { name: 'SEO', registrations: 90, payments: 35, income: 3700, cost: 2800 },
        { name: 'KOL', registrations: 80, payments: 30, income: 3200, cost: 2500 },
        { name: '联想', registrations: 50, payments: 15, income: 1900, cost: 1300 }
      ]
    },
    { 
      date: '3月14日', 
      uv: 1350, 
      registrations: 370, 
      interactions: 250, 
      payments: 135,
      annualMembers: 67,
      registrationRate: 27.41,
      interactionRate: 18.52,
      paymentRate: 36.49,
      annualMemberRate: 49.63,
      coinIncome: 6750,
      totalCoinIncome: 13500,
      coinIncomeRate: 50,
      memberIncome: 8100,
      totalMemberIncome: 16500,
      memberIncomeRate: 49.09,
      totalCost: 10700,
      registrationCost: 28.92,
      paymentCost: 79.26,
      roi: 138.79,
      channels: [
        { name: 'SEM', registrations: 155, payments: 57, income: 6100, cost: 4300 },
        { name: 'SEO', registrations: 87, payments: 33, income: 3500, cost: 2700 },
        { name: 'KOL', registrations: 78, payments: 30, income: 3100, cost: 2400 },
        { name: '联想', registrations: 50, payments: 15, income: 1850, cost: 1300 }
      ]
    },
  ])

  // Previous period data for comparison
  const previousPeriodData = ref<ConversionData[]>([
    // Similar structure as conversionData but with different values
    // ...similar entries for previous period
    { 
      date: '3月13日', 
      uv: 1000, 
      registrations: 300, 
      interactions: 190, 
      payments: 100,
      annualMembers: 50,
      registrationRate: 30,
      interactionRate: 19,
      paymentRate: 33.33,
      annualMemberRate: 50,
      coinIncome: 5000,
      totalCoinIncome: 10000,
      coinIncomeRate: 50,
      memberIncome: 6000,
      totalMemberIncome: 12500,
      memberIncomeRate: 48,
      totalCost: 8500,
      registrationCost: 28.33,
      paymentCost: 85,
      roi: 129.41,
      channels: [
        { name: 'SEM', registrations: 120, payments: 40, income: 4500, cost: 3400 },
        { name: 'SEO', registrations: 70, payments: 25, income: 2800, cost: 2100 },
        { name: 'KOL', registrations: 60, payments: 20, income: 2400, cost: 1800 },
        { name: '联想', registrations: 50, payments: 15, income: 1500, cost: 1200 }
      ]
    },
    // ... more entries similar to above
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

  // Available metric options for channel analysis
  const channelMetricOptions = ref([
    { label: '注册用户', value: 'registrations' },
    { label: '付费用户', value: 'payments' },
    { label: '新用户付费收入', value: 'income' },
    { label: '获客成本', value: 'cost' }
  ])

  // Selected metric for channel analysis
  const selectedChannelMetric = ref('registrations')

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
    channelMetricOptions,
    selectedChannelMetric,
    filteredData
  }
}) 