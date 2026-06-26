<template>
  <div class="food-price-board">
    <!-- 全局水印 -->
    <div class="watermark">预览版 Preview</div>
    
    <!-- 卡片容器 -->
    <div class="card-container">
      <!-- 标题区域 -->
      <div class="title-bar">
        <div class="title-left">
          <span class="title-icon">📊</span>
        </div>
        <div class="title-center">
          <h1 class="main-title">菜价公示</h1>
        </div>
        <div class="title-right"></div>
      </div>
      
      <!-- 上半区·七日价格趋势面积图 -->
      <div class="chart-section">
        <div class="section-header">
          <span class="section-title">七日价格趋势</span>
        </div>
        <div ref="chartRef" class="chart-container"></div>
      </div>
      
      <!-- 下半区·菜品明细表格 -->
      <div class="table-section">
        <div class="section-header">
          <span class="section-title">菜品明细</span>
        </div>
        <div class="table-container">
          <table class="food-table">
            <thead>
              <tr>
                <th>序号</th>
                <th>日期</th>
                <th>学校</th>
                <th>菜品</th>
                <th>价格</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableData" :key="index" :class="index % 2 === 0 ? 'even' : 'odd'">
                <td>{{ index + 1 }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.school }}</td>
                <td>{{ item.dish }}</td>
                <td class="price-cell">{{ item.price }}元</td>
              </tr>
              <!-- 空行 -->
              <tr v-for="n in 3" :key="'empty-' + n" class="empty-row">
                <td colspan="5"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// ===== Mock数据配置 =====
const MockData = {
  // 日期列表
  dateList: ['05-06', '05-07', '05-08', '05-09', '05-10', '05-11', '05-12'],
  // 价格数据
  priceData: [6.2, 5.8, 6.5, 7.1, 6.8, 5.5, 6.0],
  // 菜品明细
  tableData: [
    { date: '05-12', school: '第一食堂', dish: '辣椒炒肉', price: 5.0 },
    { date: '05-12', school: '第二食堂', dish: '番茄炒蛋', price: 4.5 },
    { date: '05-13', school: '第一食堂', dish: '蒜蓉时蔬', price: 3.0 },
    { date: '05-13', school: '第三食堂', dish: '红烧排骨', price: 8.0 },
    { date: '05-12', school: '第二食堂', dish: '清炒虾仁', price: 12.0 }
  ]
}

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 表格数据
const tableData = ref(MockData.tableData)

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 159, 28, 0.9)',
      borderColor: '#ff9f1c',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      },
      formatter: (params: any) => {
        const data = params[0]
        return `${data.name}<br/>价格: <strong>${data.value}元</strong>`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: MockData.dateList,
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)'
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 10,
      interval: 2,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        formatter: '{value}元'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        name: '价格',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#00f2fe' },
            { offset: 1, color: '#4facfe' }
          ]),
          width: 3
        },
        itemStyle: {
          color: '#fff',
          borderWidth: 2,
          borderColor: '#00f2fe'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 242, 254, 0.3)' },
            { offset: 1, color: 'rgba(79, 172, 254, 0.05)' }
          ])
        },
        data: MockData.priceData
      }
    ]
  }
  
  chartInstance.setOption(option)
}

// 响应式处理
const handleResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<style scoped>
.food-price-board {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a192f 0%, #112240 100%);
  padding: 40px;
  position: relative;
  overflow: hidden;
}

/* 全局水印 */
.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-15deg);
  font-size: 120px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.03);
  pointer-events: none;
  z-index: 1;
}

/* 卡片容器 */
.card-container {
  position: relative;
  z-index: 10;
  background: linear-gradient(135deg, rgba(10, 25, 47, 0.9) 0%, rgba(17, 34, 64, 0.9) 100%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* 标题区域 */
.title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  background: linear-gradient(90deg, #00b4d8 0%, #0077b6 100%);
}

.title-left {
  width: 60px;
}

.title-icon {
  font-size: 32px;
}

.title-center {
  flex: 1;
  text-align: center;
}

.main-title {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 8px;
  margin: 0;
  text-shadow: 0 0 20px rgba(0, 242, 254, 0.5);
}

.title-right {
  width: 60px;
}

/* 图表区域 */
.chart-section {
  padding: 20px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-header {
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #e0f2fe;
  padding-left: 12px;
  border-left: 3px solid #00b4d8;
}

.chart-container {
  height: 300px;
}

/* 表格区域 */
.table-section {
  padding: 20px 30px;
}

.table-container {
  overflow-x: auto;
}

.food-table {
  width: 100%;
  border-collapse: collapse;
}

.food-table th {
  background: rgba(224, 242, 254, 0.15);
  color: #4facfe;
  font-weight: 600;
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
}

.food-table td {
  padding: 12px 16px;
  color: #fff;
  font-size: 13px;
}

.food-table tbody tr.even {
  background: #1e293b;
}

.food-table tbody tr.odd {
  background: #0f172a;
}

.food-table tbody tr.empty-row td {
  height: 40px;
  background: transparent;
}

.price-cell {
  color: #ff9f1c;
  font-weight: 600;
}

/* 表格边框 */
.food-table th,
.food-table td {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.food-table th:last-child,
.food-table td:last-child {
  text-align: right;
}
</style>