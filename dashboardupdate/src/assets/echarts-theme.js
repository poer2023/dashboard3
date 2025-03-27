// Custom ECharts theme to match our design system
export const customEChartsTheme = {
  color: [
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
  ],
  backgroundColor: 'rgba(0, 0, 0, 0)',
  textStyle: {
    fontFamily: "'Inter', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif",
    color: '#4a5568'
  },
  title: {
    textStyle: {
      color: '#1a202c'
    },
    subtextStyle: {
      color: '#718096'
    }
  },
  line: {
    itemStyle: {
      borderWidth: 1
    },
    lineStyle: {
      width: 2
    },
    symbolSize: 4,
    symbol: 'circle',
    smooth: true
  },
  radar: {
    itemStyle: {
      borderWidth: 1
    },
    lineStyle: {
      width: 2
    },
    symbolSize: 4,
    symbol: 'circle',
    smooth: true
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: '#e2e8f0'
    }
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#e2e8f0'
    }
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#e2e8f0'
    }
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#e2e8f0'
    }
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#e2e8f0'
    }
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#e2e8f0'
    }
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#e2e8f0'
    }
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#e2e8f0'
    }
  },
  candlestick: {
    itemStyle: {
      color: '#e53e3e',
      color0: '#48bb78',
      borderColor: '#e53e3e',
      borderColor0: '#48bb78',
      borderWidth: 1
    }
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#e2e8f0'
    },
    lineStyle: {
      width: 1,
      color: '#e2e8f0'
    },
    symbolSize: 4,
    symbol: 'circle',
    smooth: true,
    color: [
      '#5a67d8', // primary
      '#38b2ac', // secondary
      '#48bb78', // success
      '#ed8936', // warning
      '#e53e3e'  // danger
    ],
    label: {
      color: '#4a5568'
    }
  },
  map: {
    itemStyle: {
      normal: {
        areaColor: '#f7fafc',
        borderColor: '#e2e8f0',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: '#c3dafe',
        borderColor: '#5a67d8',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#4a5568'
        }
      },
      emphasis: {
        textStyle: {
          color: '#1a202c'
        }
      }
    }
  },
  geo: {
    itemStyle: {
      normal: {
        areaColor: '#f7fafc',
        borderColor: '#e2e8f0',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: '#c3dafe',
        borderColor: '#5a67d8',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#4a5568'
        }
      },
      emphasis: {
        textStyle: {
          color: '#1a202c'
        }
      }
    }
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#718096'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#edf2f7']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#f7fafc']
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#718096'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#edf2f7']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#f7fafc']
      }
    }
  },
  logAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#718096'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#edf2f7']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#f7fafc']
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#718096'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#edf2f7']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#f7fafc']
      }
    }
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: '#718096'
      },
      emphasis: {
        borderColor: '#5a67d8'
      }
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '8%',
    containLabel: true
  },
  legend: {
    textStyle: {
      color: '#4a5568'
    },
    itemGap: 12,
    itemWidth: 15,
    itemHeight: 10
  },
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: {
      color: '#1a202c'
    },
    axisPointer: {
      lineStyle: {
        color: '#e2e8f0',
        width: 1
      },
      crossStyle: {
        color: '#e2e8f0',
        width: 1
      },
      shadowStyle: {
        color: 'rgba(150,150,150,0.1)'
      }
    }
  },
  timeline: {
    lineStyle: {
      color: '#5a67d8',
      width: 1
    },
    itemStyle: {
      normal: {
        color: '#5a67d8',
        borderWidth: 1
      },
      emphasis: {
        color: '#5a67d8'
      }
    },
    controlStyle: {
      normal: {
        color: '#5a67d8',
        borderColor: '#5a67d8',
        borderWidth: 0.5
      },
      emphasis: {
        color: '#5a67d8',
        borderColor: '#5a67d8',
        borderWidth: 0.5
      }
    },
    checkpointStyle: {
      color: '#5a67d8',
      borderColor: '#3182ce'
    },
    label: {
      normal: {
        textStyle: {
          color: '#4a5568'
        }
      },
      emphasis: {
        textStyle: {
          color: '#4a5568'
        }
      }
    }
  },
  visualMap: {
    color: ['#5a67d8', '#c3dafe']
  },
  dataZoom: {
    backgroundColor: 'rgba(247,250,252,0)',
    dataBackgroundColor: '#edf2f7',
    fillerColor: 'rgba(90,103,216,0.2)',
    handleColor: '#5a67d8',
    handleSize: '100%',
    textStyle: {
      color: '#718096'
    }
  },
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: '#4a5568'
        }
      },
      emphasis: {
        textStyle: {
          color: '#4a5568'
        }
      }
    }
  }
}; 