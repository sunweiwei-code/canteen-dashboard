<template>
  <div class="big-screen">
    <!-- ===== 顶部标题栏 ===== -->
    <header class="top-bar">
      <div class="top-left">
        <span class="time-display">{{ currentDateTime }}</span>
      </div>
      <div class="top-center">
        <h1 class="main-title">食堂数据驾驶舱</h1>
      </div>
      <div class="top-right">
        <span class="weather-text">{{ data?.weather.condition }} {{ data?.weather.temperature }}°C</span>
        <span class="weather-text">空气质量：<b>{{ data?.weather.airQuality }}</b></span>
      </div>
    </header>

    <!-- ===== 主体区域：左侧3/4 (3×3) + 右侧1/4 ===== -->
    <main class="main-grid" v-if="data">
      <!-- 左侧 3×3 模块网格 -->
      <div class="left-grid">
        <!-- 1.1 菜价公示 -->
        <section class="panel" @click="openModal('foodPrice')">
          <div class="panel__title">
            <span class="icon price-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2.5"/>
                <path d="M7 9h10M7 13h10M7 17h7"/>
              </svg>
            </span>
            菜价公示
          </div>
          <div class="panel__body price-body">
            <div ref="priceChartRef" class="chart-box price-chart"></div>
            <table class="data-table price-table">
              <thead><tr><th class="col-seq">序号</th><th>日期</th><th class="col-school">学校</th><th class="col-dish">菜品</th><th>价格</th></tr></thead>
              <tbody>
                <tr v-for="(item, index) in data.foodPriceDetail.slice(0, 1)" :key="item.id">
                  <td class="col-seq">{{ index + 1 }}</td>
                  <td>{{ formatDate(item.date) }}</td>
                  <td class="col-school">{{ item.school }}</td>
                  <td class="col-dish">{{ item.dish }}</td>
                  <td><span class="price-val">¥{{ item.price }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 1.2 智慧留样 -->
        <section class="panel" @click="openModal('sampleRetention')">
          <div class="panel__title">
            <span class="icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="8" y="3" width="8" height="4" rx="1"/>
                <path d="M6 9h12l-2 13H8L6 9z"/>
              </svg>
            </span>
            智慧留样
          </div>
          <div class="panel__body sample-body">
            <div class="sample-chart-row compact">
              <div ref="sampleRingRef" class="chart-box sample-ring"></div>
              <div class="sample-legend">
                <div class="legend-item" v-for="(item, idx) in data.sampleRing" :key="idx">
                  <span class="legend-dot" :style="{ background: pieColors[idx] }"></span>
                  <span class="legend-name">{{ item.name }}</span>
                  <span class="legend-num gradient-num">{{ item.value }}</span>
                </div>
              </div>
            </div>
            <table class="data-table sample-table">
              <thead><tr><th class="col-seq">序号</th><th>餐次</th><th>时间</th><th>名称</th><th>人员</th><th>图片</th></tr></thead>
              <tbody>
                <tr v-for="(item, index) in data.sampleTable.slice(0, 1)" :key="item.id">
                  <td class="col-seq">{{ index + 1 }}</td>
                  <td><span class="tag tag-meal">{{ item.mealType }}</span></td>
                  <td>{{ item.sampleTime }}</td>
                  <td>{{ item.dishName }}</td>
                  <td>{{ item.operator }}</td>
                  <td><img :src="item.image" class="sample-thumb" @error="onImgError" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 1.3 智慧晨检 -->
        <section class="panel" @click="openModal('morningCheck')">
          <div class="panel__title panel__title--with-extra">
            <span class="title-left">
              <span class="icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="6" width="18" height="14" rx="2"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                  <path d="M12 11v6M9 14h6"/>
                </svg>
              </span>
              智慧晨检
            </span>
            <span class="title-extra">晨检人数 <b>{{ morningCount }}</b> 人</span>
          </div>
          <div class="panel__body morning-body">
            <div ref="morningChartRef" class="chart-box morning-chart compact"></div>
            <table class="data-table morning-table">
              <thead><tr><th>序号</th><th>姓名</th><th>体温</th><th>健康证</th><th>时间</th><th>图片</th></tr></thead>
              <tbody>
                <tr v-for="(item, index) in data.morningPerson.slice(0, 1)" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td :class="{ 'temp-warn': parseFloat(item.bodyTemp) > 37 }">{{ item.bodyTemp }}</td>
                  <td>{{ item.healthCert }}</td>
                  <td>{{ item.checkTime }}</td>
                  <td><img :src="item.image" class="sample-thumb" @error="onImgError" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 2.1 智慧消毒 -->
        <section class="panel" @click="openModal('disinfection')">
          <div class="panel__title">
            <span class="icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 22h10a2 2 0 0 0 2-2v-8H5v8a2 2 0 0 0 2 2z"/>
                <path d="M9 12V7a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v5"/>
                <path d="M12 4V2"/>
                <path d="M15 6h3v3"/>
              </svg>
            </span>
            智慧消毒
          </div>
          <div class="panel__body disinfection-body">
            <div class="disinfection-stats">
              <div class="disinfection-stat-card">
                <span class="stat-icon">
                  <svg viewBox="0 0 64 64" width="20" height="20" fill="none">
                    <path d="M20 58h24c3.3 0 6-2.7 6-6V28c0-3.3-2.7-6-6-6H34v-6c0-3.3 2.7-6 6-6h2c2.2 0 4-1.8 4-4s-1.8-4-4-4H24c-2.2 0-4 1.8-4 4s1.8 4 4 4h2c3.3 0 6 2.7 6 6v6H20c-3.3 0-6 2.7-6 6v24c0 3.3 2.7 6 6 6z" stroke="#36e0ff" stroke-width="3" stroke-linejoin="round"/>
                    <circle cx="44" cy="18" r="5" fill="#36e0ff"/>
                    <path d="M48 14l8-8" stroke="#36e0ff" stroke-width="3" stroke-linecap="round"/>
                    <path d="M26 34h12M26 42h12M26 50h8" stroke="#36e0ff" stroke-width="2.5" stroke-linecap="round"/>
                  </svg>
                </span>
                <div class="stat-text">
                  <div class="stat-value">{{ data.disinfectionStats.disinfectedCanteens }}</div>
                  <div class="stat-label">已消毒食堂</div>
                </div>
              </div>
              <div class="disinfection-stat-card">
                <span class="stat-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#36e0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18"/>
                    <circle cx="12" cy="15" r="4"/>
                    <path d="M12 15v2.5l1.5 1"/>
                  </svg>
                </span>
                <div class="stat-text">
                  <div class="stat-value">{{ data.disinfectionStats.duration }}</div>
                  <div class="stat-label">消毒时长</div>
                </div>
              </div>
            </div>
            <table class="data-table disinfection-table">
              <thead><tr><th class="col-seq">序号</th><th>消毒</th><th>开始</th><th>结束</th><th>时间</th><th>状态</th></tr></thead>
              <tbody>
                <tr v-for="(item, index) in data.disinfectionRecords.slice(0, 2)" :key="item.id">
                  <td class="col-seq">{{ index + 1 }}</td>
                  <td>{{ item.method }}</td>
                  <td>{{ item.startTime }}</td>
                  <td>{{ item.endTime }}</td>
                  <td>{{ item.duration }}</td>
                  <td><span :class="['tag', item.status === '合格' ? 'tag-ok' : 'tag-warn']">{{ item.status }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 2.2 意见反馈 -->
        <section class="panel" @click="openModal('feedback')">
          <div class="panel__title"><span class="icon">&#9670;</span>意见反馈</div>
          <div class="panel__body feedback-body">
            <div class="feedback-contacts">
              <div
                v-for="item in data.feedback.slice(0, 2)"
                :key="item.id"
                class="contact-card"
              >
                <div class="contact-avatar">
                  <img
                    v-if="item.avatar && !avatarError[item.id]"
                    :src="item.avatar"
                    alt="avatar"
                    @error="avatarError[item.id] = true"
                  />
                  <span v-if="!item.avatar || avatarError[item.id]">{{ item.name.charAt(0) }}</span>
                </div>
                <div class="contact-info">
                  <div class="contact-name">{{ item.name }}</div>
                  <div class="contact-role">
                    <span class="contact-icon">&#128100;</span>
                    {{ item.role }}
                  </div>
                  <div class="contact-phone">
                    <span class="contact-icon">&#9742;</span>
                    {{ item.phone }}
                  </div>
                </div>
              </div>
            </div>
            <div class="feedback-qr">
              <img :src="data.feedbackQrCode" alt="二维码" />
              <span class="qr-label">扫一扫反馈意见</span>
            </div>
          </div>
        </section>

        <!-- 2.3 智慧存样 -->
        <section class="panel" @click="openModal('sampleStorage')">
          <div class="panel__title">
            <span class="icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 20h14"/>
                <rect x="7" y="6" width="3" height="12" rx="1.5"/>
                <rect x="11" y="6" width="3" height="12" rx="1.5"/>
                <rect x="15" y="6" width="3" height="12" rx="1.5"/>
              </svg>
            </span>
            智慧存样
          </div>
          <div class="panel__body sample-storage-body compact">
            <div class="storage-day-list">
              <div v-for="day in data.sampleStorage.slice(0, 2)" :key="day.date" class="storage-day">
                <div class="day-label">{{ day.date }}</div>
                <div class="meal-cards">
                  <div
                    v-for="meal in day.meals"
                    :key="meal.mealType"
                    :class="['meal-card', meal.status === '已消样' ? 'meal-card--done' : '']"
                  >
                    <div class="meal-title">{{ meal.mealType }} {{ meal.status }}</div>
                    <div class="meal-count">{{ meal.stored }} / {{ meal.total }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3.1 智慧抓拍 -->
        <section class="panel" @click="openModal('snapshot')">
          <div class="panel__title">
            <span class="icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="6" width="18" height="13" rx="2"/>
                <circle cx="12" cy="13" r="4"/>
                <path d="M8 6l1.5-2h5L16 6"/>
              </svg>
            </span>
            智慧抓拍
          </div>
          <div class="panel__body snapshot-body compact">
            <div class="snapshot-grid">
              <div v-for="item in data.snapshotCategories" :key="item.id" class="snapshot-category">
                <div class="category-name">{{ item.name }}</div>
                <div class="category-card">
                  <span class="card-status">{{ item.status }}</span>
                  <span class="card-text">提醒</span>
                  <span class="card-count">{{ item.alertCount }}</span>
                  <span class="card-text">次</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3.2 食材采购 -->
        <section class="panel" @click="openModal('supplier')">
          <div class="panel__title">
            <span class="icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="3" width="14" height="18" rx="2"/>
                <path d="M9 7h6"/>
                <path d="M9 12l2 2 4-4"/>
                <path d="M9 17h6"/>
              </svg>
            </span>
            食材采购
          </div>
          <div class="panel__body supplier-body compact">
            <table class="supplier-table">
              <thead>
                <tr>
                  <th class="col-seq">序号</th>
                  <th>供应商名称</th>
                  <th>供货范围</th>
                  <th>当前评价</th>
                  <th>证照资质</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data.supplierTable.slice(0, 4)" :key="item.id">
                  <td class="col-seq">{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.scope }}</td>
                  <td>{{ item.evaluation }}</td>
                  <td>{{ item.licenseStatus }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 3.3 食材验收 -->
        <section class="panel" @click="openModal('acceptance')">
          <div class="panel__title">
            <span class="icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6"/>
                <path d="M9 12l2 2 4-4"/>
                <path d="M9 17h6"/>
              </svg>
            </span>
            食材验收
          </div>
          <div class="panel__body acceptance-body compact">
            <table class="acceptance-table">
              <thead>
                <tr>
                  <th class="col-seq">序号</th>
                  <th>到货时间</th>
                  <th>到货内容</th>
                  <th>质量验收</th>
                  <th>重量验收</th>
                  <th>验收人员</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data.acceptanceRecords.slice(0, 4)" :key="item.id">
                  <td class="col-seq">{{ index + 1 }}</td>
                  <td>{{ item.arrivalDate }}</td>
                  <td>{{ item.content }}</td>
                  <td>{{ item.quality }}</td>
                  <td>{{ item.weight }}</td>
                  <td>{{ item.inspector }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <!-- 右侧面板：日管控 + 智慧台账 -->
      <aside class="right-panel">
        <section class="panel daily-control-panel" @click="openModal('dailyControl')">
          <div class="panel__title panel__title--with-extra">
            <span class="title-left"><span class="icon">&#9823;</span>日管控</span>
            <span class="title-extra">
              <span class="daily-date">{{ dailyControlDate }}</span>
              <span :class="['daily-status', data.dailyControlInfo.status === '已完成' ? 'status-done' : 'status-undone']">
                {{ data.dailyControlInfo.status }}
              </span>
            </span>
          </div>
        </section>

        <section class="panel ledger-panel" @click="openModal('ledger')">
          <div class="panel__title"><span class="icon">&#9776;</span>智慧台账</div>
          <div class="ledger-table-wrap">
            <table class="ledger-table">
              <thead>
                <tr>
                  <th class="col-seq">序号</th>
                  <th class="col-name">台账名称</th>
                  <th class="col-time">更新时间</th>
                  <th class="col-done">昨日是否完成</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data.ledgerRecords.slice(0, 17)" :key="item.id">
                  <td class="col-seq">{{ index + 1 }}</td>
                  <td class="col-name">{{ item.ledgerName }}</td>
                  <td class="col-time">{{ item.updateTime }}</td>
                  <td class="col-done">
                    <span :class="['tag', item.yesterdayDone === '是' ? 'tag-ok' : 'tag-warn']">
                      {{ item.yesterdayDone }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </aside>
    </main>

    <!-- ===== Element Plus el-dialog 弹窗 ===== -->
    <el-dialog
      v-model="dialogVisible"
      :title="getModalTitle"
      width="55%"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="false"
      :draggable="false"
      destroy-on-close
      class="dashboard-dialog"
    >
      <FoodPriceModal v-if="activeModal === 'foodPrice'" :data="modalData" />
      <SampleRetentionModal v-if="activeModal === 'sampleRetention'" :data="modalData" />
      <MorningCheckModal v-if="activeModal === 'morningCheck'" :data="modalData" />
      <DisinfectionModal v-if="activeModal === 'disinfection'" :data="modalData" />
      <FeedbackModal v-if="activeModal === 'feedback'" :data="modalData" />
      <SampleStorageModal v-if="activeModal === 'sampleStorage'" :data="modalData" />
      <SnapshotModal v-if="activeModal === 'snapshot'" :data="modalData" />
      <SupplierModal v-if="activeModal === 'supplier'" :data="modalData" />
      <AcceptanceModal v-if="activeModal === 'acceptance'" :data="modalData" />
      <DailyControlModal v-if="activeModal === 'dailyControl'" :data="modalData" />
      <LedgerModal v-if="activeModal === 'ledger'" :data="modalData" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'
import { getDashboardData, fetchUpdatedData } from '@/api/dashboard'
import type { DashboardData } from '@/mock/data'
import FoodPriceModal from './modals/FoodPriceModal.vue'
import SampleRetentionModal from './modals/SampleRetentionModal.vue'
import MorningCheckModal from './modals/MorningCheckModal.vue'
import DisinfectionModal from './modals/DisinfectionModal.vue'
import FeedbackModal from './modals/FeedbackModal.vue'
import SampleStorageModal from './modals/SampleStorageModal.vue'
import SnapshotModal from './modals/SnapshotModal.vue'
import SupplierModal from './modals/SupplierModal.vue'
import AcceptanceModal from './modals/AcceptanceModal.vue'
import DailyControlModal from './modals/DailyControlModal.vue'
import LedgerModal from './modals/LedgerModal.vue'

// ===== 弹窗状态 =====
const dialogVisible = ref(false)
const activeModal = ref<string | null>(null)
const modalData = ref<any>(null)

// ===== 弹窗标题 =====
const getModalTitle = computed(() => {
  const titles: Record<string, string> = {
    foodPrice: '菜价公示明细',
    sampleRetention: '智慧留样明细',
    morningCheck: '智慧晨发明细',
    disinfection: '智慧消毒明细',
    feedback: '意见反馈明细',
    sampleStorage: '智慧存样明细',
    snapshot: '智慧抓拍明细',
    supplier: '供应商情况',
    acceptance: '货物验收情况',
    dailyControl: '日管控明细',
    ledger: '智慧台账明细'
  }
  return titles[activeModal.value || ''] || '详情'
})

// ===== 数据 =====
const data = ref<DashboardData | null>(null)
const currentDateTime = ref('')
const avatarError = reactive<Record<number, boolean>>({})

// ===== 工具函数 =====
const formatDate = (dateStr: string) => {
  const parts = dateStr.split('-')
  if (parts.length === 2) {
    return `${parseInt(parts[0])}月${parseInt(parts[1])}日`
  }
  return dateStr
}

// ===== 图表 refs =====
const priceChartRef = ref<HTMLDivElement | null>(null)
const sampleRingRef = ref<HTMLDivElement | null>(null)
const morningChartRef = ref<HTMLDivElement | null>(null)

let priceChart: echarts.ECharts | null = null
let sampleRingChart: echarts.ECharts | null = null
let morningChart: echarts.ECharts | null = null

// ===== 计算属性 =====
const dailyControlDate = computed(() => {
  if (!data.value) return ''
  return data.value.dailyControlInfo.date
})

// ===== 弹窗方法 =====
const openModal = (type: string) => {
  if (!data.value) return
  activeModal.value = type
  switch (type) {
    case 'foodPrice':
      modalData.value = data.value.foodPriceDetail
      break
    case 'sampleRetention':
      modalData.value = data.value.sampleTable
      break
    case 'morningCheck':
      modalData.value = data.value.morningPerson
      break
    case 'disinfection':
      modalData.value = data.value.disinfectionRecords
      break
    case 'feedback':
      modalData.value = data.value.feedback
      break
    case 'sampleStorage':
      modalData.value = {
        days: data.value.sampleStorage,
        records: data.value.sampleStorageRecords
      }
      break
    case 'snapshot':
      modalData.value = data.value.snapshotRecords
      break
    case 'supplier':
      modalData.value = data.value.supplierTable
      break
    case 'acceptance':
      modalData.value = data.value.acceptanceRecords
      break
    case 'dailyControl':
      modalData.value = data.value.dailyControlRecords
      break
    case 'ledger':
      modalData.value = data.value.ledgerRecords
      break
    default:
      modalData.value = null
  }
  dialogVisible.value = true
}

const closeModal = () => {
  dialogVisible.value = false
  activeModal.value = null
  modalData.value = null
}

// 监听 el-dialog 关闭（点击遮罩、按 ESC、点 X）
watch(dialogVisible, (val) => {
  if (!val) {
    activeModal.value = null
    modalData.value = null
  }
})

// ===== 时钟 =====
let timer: ReturnType<typeof setInterval> | null = null
const updateClock = () => {
  const now = new Date()
  currentDateTime.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.toLocaleTimeString('zh-CN', { hour12: false })}`
}

// ===== 图表初始化 =====
const initPriceChart = () => {
  if (!priceChartRef.value || !data.value) return
  priceChart = echarts.init(priceChartRef.value)
  const d = data.value.priceChart
  priceChart.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 87, 34, 0.9)',
      borderColor: '#ff5722',
      borderWidth: 1,
      textStyle: { color: '#fff', fontSize: 12 },
      position: function (point: number[], params: any, dom: HTMLElement, rect: any, size: any) {
        const chartHeight = 120
        if (point[1] < chartHeight / 2) {
          return [point[0] - size.contentSize[0] / 2, point[1] + 10]
        } else {
          return [point[0] - size.contentSize[0] / 2, point[1] - size.contentSize[1] - 10]
        }
      },
      formatter: (params: any) => {
        return `<strong>${params.value}元</strong>`
      }
    },
    grid: { top: 8, right: 4, bottom: 22, left: 32 },
    xAxis: {
      type: 'category',
      boundaryGap: ['5%', '5%'],
      data: d.map(i => i.date),
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
      axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 7, interval: 0 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 80,
      interval: 20,
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 7, margin: 2 }
    },
    series: [
      {
        name: '价格',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
          color: '#00e676',
          width: 2
        },
        itemStyle: { color: '#00e676', borderWidth: 1.5, borderColor: '#00e676' },
        emphasis: {
          itemStyle: { color: '#ff5722', borderColor: '#ff5722', borderWidth: 2 },
          scale: 1.5
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 230, 118, 0.3)' },
            { offset: 1, color: 'rgba(0, 230, 118, 0.02)' }
          ])
        },
        data: d.map(i => i.avgPrice * 10)
      }
    ]
  })
}

const initSampleRing = () => {
  if (!sampleRingRef.value || !data.value) return
  sampleRingChart = echarts.init(sampleRingRef.value)
  const d = data.value.sampleRing
  sampleRingChart.setOption({
    tooltip: { show: false },
    graphic: [{
      type: 'group',
      left: 'center',
      top: 'center',
      children: [
        {
          type: 'circle',
          shape: { r: 10 },
          style: { fill: 'rgba(2,19,38,.9)', stroke: 'rgba(71,168,228,.3)', lineWidth: 1 }
        },
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '三餐\n占比',
            textAlign: 'center',
            fill: '#eef8ff',
            fontSize: 9,
            lineHeight: 11,
            fontWeight: 600
          }
        }
      ]
    }],
    series: [{
      name: '留样分布', type: 'pie', radius: ['46%', '88%'], center: ['50%', '50%'], avoidLabelOverlap: false,
      label: { show: false }, emphasis: { scale: false },
      data: d.map(i => ({ name: i.name, value: i.value })),
      itemStyle: { borderColor: '#0a1628', borderWidth: 2 },
      color: ['#4facfe', '#43e97b', '#f59e0b']
    }]
  })
}

const pieColors = ['#4facfe', '#43e97b', '#f59e0b']

const onImgError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60"><rect fill="%231a2a4a" width="80" height="60"/><text x="40" y="30" fill="%23667" text-anchor="middle" font-size="10">暂无图片</text></svg>'
}

const morningCount = computed(() => data.value?.morningChart.reduce((s, i) => s + i.count, 0) ?? 0)

const initMorningChart = () => {
  if (!morningChartRef.value || !data.value) return
  morningChart = echarts.init(morningChartRef.value)
  const d = data.value.morningChart
  morningChart.setOption({
    grid: { top: 8, right: 4, bottom: 22, left: 32 },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => `${params[0].value}人`,
      backgroundColor: 'rgba(245,87,54,.92)',
      borderColor: 'rgba(245,87,54,.92)',
      textStyle: { color: '#fff', fontSize: 12 },
      padding: [4, 10],
      position: function (point: number[], _params: any, _dom: any, _rect: any, size: any) {
        const chartHeight = morningChartRef.value?.clientHeight ?? 100
        return [point[0] - size.contentSize[0] / 2, point[1] < chartHeight / 2 ? point[1] + 12 : point[1] - size.contentSize[1] - 12]
      }
    },
    xAxis: { type: 'category', data: d.map(i => i.date), axisLine: { lineStyle: { color: '#334' } }, axisLabel: { color: '#8899aa', fontSize: 7, interval: 0 }, boundaryGap: ['5%', '5%'] },
    yAxis: { type: 'value', min: 0, max: 60, interval: 20, splitLine: { lineStyle: { color: '#1a2a3a' } }, axisLabel: { color: '#8899aa', fontSize: 7, margin: 2, formatter: (value: number) => value === 0 || value === 60 ? '' : value } },
    series: [{
      name: '晨检人数', type: 'line', data: d.map(i => i.count),
      smooth: true, symbol: 'circle', symbolSize: 6,
      lineStyle: { width: 2, color: '#00e5ff' },
      itemStyle: { color: '#00e5ff', borderColor: '#fff', borderWidth: 1 },
      emphasis: { itemStyle: { color: '#ff5722', borderColor: '#fff', borderWidth: 2 }, scale: 1.5 }
    }]
  })
}

// ===== 窗口 resize =====
const handleResize = () => {
  priceChart?.resize()
  sampleRingChart?.resize()
  morningChart?.resize()
}

// ===== 生命周期 =====
onMounted(async () => {
  updateClock()
  timer = setInterval(updateClock, 1000)
  window.addEventListener('resize', handleResize)

  // 模拟接口请求：3秒后返回初始数据，再过3秒追加新数据，证实页面自动联动更新
  try {
    data.value = await getDashboardData()
    await nextTick()
    initPriceChart()
    initSampleRing()
    initMorningChart()

    // 再过3秒模拟接口返回更新数据（追加新记录），页面自动刷新无需手动改代码
    setTimeout(async () => {
      if (data.value) {
        data.value = await fetchUpdatedData(data.value)
        // 图表无需重新初始化，数据绑定已自动更新
      }
    }, 3000)
  } catch (err) {
    console.error('加载数据失败:', err)
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  window.removeEventListener('resize', handleResize)
  priceChart?.dispose()
  sampleRingChart?.dispose()
  morningChart?.dispose()
})
</script>

<style scoped lang="scss">
/* ==================== 大屏容器 ==================== */
.big-screen {
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at 50% 52%, rgba(16,102,190,.3), transparent 33%), linear-gradient(180deg, #062157 0%, #020817 56%, #040712 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  color: #eef8ff;
  position: relative;
}

/* ==================== 顶部标题栏 ==================== */
.top-bar {
  position: relative;
  z-index: 2;
  height: 64px;
  display: grid;
  grid-template-columns: 430px 1fr 430px;
  align-items: start;
  padding: 6px 28px 0;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    left: 300px;
    right: 300px;
    top: -10px;
    height: 78px;
    background: linear-gradient(90deg, transparent, rgba(23,95,196,.52), rgba(0,217,255,.2), rgba(23,95,196,.52), transparent);
    clip-path: polygon(0 0, 24% 0, 29% 58%, 34% 58%, 37% 100%, 63% 100%, 66% 58%, 71% 58%, 76% 0, 100% 0, 100% 54%, 76% 54%, 70% 84%, 30% 84%, 24% 54%, 0 54%);
    border-bottom: 2px solid rgba(31,128,255,.56);
  }
}

.top-left {
  position: relative;
  z-index: 2;
  .time-display {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
  }
}

.top-center {
  position: relative;
  text-align: center;
  .main-title {
    font-size: 32px;
    line-height: 44px;
    letter-spacing: 12px;
    font-style: italic;
    font-weight: 900;
    text-shadow: 0 3px 0 #5d7c9f, 0 0 18px #16dfff;
    color: #f5fbff;
    margin: 0;
  }
}

.top-right {
  position: relative;
  z-index: 2;
  text-align: right;
  display: flex;
  gap: 18px;
  justify-content: flex-end;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  .weather-text b {
    color: #fff;
  }
}

/* ==================== 主体网格：左侧3/4 + 右侧1/4 ==================== */
.main-grid {
  position: relative;
  z-index: 2;
  flex: 1;
  padding: 10px 30px 10px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  min-height: 0;
}

/* ==================== 左侧 3×3 网格 ==================== */
.left-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 12px;
  align-content: end;
  min-height: 0;
}

/* ==================== 右侧面板 ==================== */
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

/* ==================== 面板通用样式 ==================== */
.panel {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(71,168,228,.28);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(2,19,38,.82), rgba(2,17,31,.72));
  box-shadow: inset 0 0 24px rgba(27,172,242,.08), 0 0 18px rgba(0,0,0,.22);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: border-color .25s, box-shadow .25s;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(38,212,255,.08), transparent 34%, transparent 70%, rgba(28,121,255,.05));
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(54,224,255,.72);
    box-shadow: inset 0 0 28px rgba(27,207,242,.14), 0 0 22px rgba(0,202,255,.28);
  }
}

.panel__title {
  position: relative;
  height: 44px;
  line-height: 44px;
  padding: 0 16px 0 20px;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: .5px;
  background: linear-gradient(90deg, #155a88 0%, #133e63 48%, rgba(17,52,82,.45) 100%);
  border-radius: 8px 8px 0 0;
  box-shadow: inset 0 -1px 0 rgba(81,186,255,.18);
  flex-shrink: 0;
  color: #eef8ff;

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    margin-right: 8px;
    color: #e9fbff;
    text-shadow: 0 0 8px #38d4ff;

    svg { display: block; }
  }

  a {
    float: right;
    color: #fff;
    font-size: 13px;
    font-weight: 400;
    text-decoration: none;
  }
}

.panel__title--with-extra {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 12px;
  .title-left { display: flex; align-items: center; }
  .title-extra {
    font-size: 13px;
    font-weight: 500;
    color: #eef8ff;
    b {
      font-size: 18px;
      color: #fff;
      margin: 0 2px;
      text-shadow: 0 0 8px rgba(79,172,254,.7);
    }
  }
}

.morning-chart {
  height: 80px;
  margin-top: 6px;
  margin-bottom: 4px;

  &.compact {
    height: 70px;
    margin-top: 2px;
    margin-bottom: 4px;
  }
}

/* 智慧留样首页：一图一表 */
.sample-body {
  padding: 4px 8px 6px;
  overflow: hidden;
}
.sample-table {
  margin-top: 34px;
  font-size: 11px;
  th { height: 26px; }
  td { height: 24px; padding: 2px 4px; }
  .sample-thumb { width: 22px; height: 22px; }
}

/* 智慧晨检首页：一图一表 */
.morning-body {
  padding: 4px 8px 6px;
  overflow: hidden;
}
.morning-table {
  margin-top: 4px;
  font-size: 11px;
  th { height: 26px; }
  td { height: 24px; padding: 2px 4px; }
  .sample-thumb { width: 22px; height: 22px; }
}

.panel__body {
  position: relative;
  flex: 1;
  padding: 8px 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

/* ==================== 表格通用 ==================== */
.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 12px;
  color: #eaf6ff;
  margin-top: 4px;

  th {
    height: 36px;
    color: #22a9ff;
    background: rgba(4,43,73,.72);
    font-weight: 800;
    border-left: 1px solid rgba(31,113,170,.22);
  }

  td {
    height: 28px;
    background: rgba(8,37,62,.72);
    border-top: 1px solid rgba(38,130,197,.24);
    border-left: 1px solid rgba(31,113,170,.22);
    white-space: nowrap;
    transition: background .25s ease, color .25s ease;
  }

  tr:hover td {
    background: rgba(16,72,112,.82);
    color: #fff;
  }
}

/* 菜价公示表格列宽 */
.col-seq { width: 10%; }
.col-school { width: 30%; }
.col-dish { width: 24%; }

/* 智慧留样 饼图+图例 */
.sample-chart-row {
  display: flex;
  align-items: center;
  gap: 4px;
  .chart-box { flex: 0 0 56%; height: 90px; margin-top: 0; }

  &.compact {
    .chart-box { flex: 0 0 54%; height: 68px; }
    .sample-legend { gap: 3px; }
    .legend-item { font-size: 9px; }
    .legend-num { font-size: 14px; min-width: 16px; }
  }
}
.sample-legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  .legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 9px;
  }
  .legend-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .legend-name { color: #8899aa; white-space: nowrap; }
  .legend-num {
    font-weight: 700;
    font-size: 14px;
    min-width: 18px;
  }
}
.gradient-num {
  background: linear-gradient(180deg, #4facfe 0%, #fff 50%, #4facfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.sample-thumb {
  width: 28px; height: 28px;
  border-radius: 4px;
  object-fit: cover;
  vertical-align: middle;
}

/* ==================== 图表容器 ==================== */
.chart-box {
  width: 100%;
  height: 100px;
  flex-shrink: 0;
  margin-top: 12px;
  &.small {
    height: 70px;
    margin-top: 8px;
  }
}

/* 菜价公示首页：一图一表 */
.price-body {
  padding: 4px 8px 6px;
  overflow: hidden;
}
.price-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg { display: block; }
}
.price-chart {
  height: 78px;
  margin-top: 8px;
}
.price-table {
  margin-top: 10px;
  font-size: 11px;
  th { height: 28px; }
  td { height: 26px; }
}

/* ==================== 标签 ==================== */
.tag {
  font-size: 9px;
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
}
.tag-meal { background: rgba(79,172,254,.12); color: #4facfe; }
.tag-ok { background: rgba(67,233,123,.12); color: #43e97b; }
.tag-err { background: rgba(245,87,108,.12); color: #f5576c; }
.tag-warn { background: rgba(245,158,11,.12); color: #f59e0b; }
.tag-gray { background: rgba(122,139,166,.12); color: #7a8ba6; }
.tag-blue { background: rgba(79,172,254,.12); color: #4facfe; }
.price-cell { color: #ff9f1c; font-weight: 600; }
.price-val { color: #f59e0b; font-weight: 600; }
.temp-warn { color: #f5576c !important; }
.supplier-name { max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ==================== 指标面板 ==================== */
.indicator-row {
  display: flex;
  gap: 12px;
  justify-content: space-around;
  padding: 6px 0;
  flex-shrink: 0;
}
.indicator-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.indicator-val {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.1;
  color: #8fffff;
  text-shadow: 0 0 10px rgba(20,248,255,.8);

  small {
    font-size: 11px;
    font-weight: 400;
    margin-left: 2px;
    text-shadow: none;
  }
}
.indicator-label {
  font-size: 10px;
  color: #7a8ba6;
}

/* ==================== 智慧消毒 指标卡片 ==================== */
.disinfection-body {
  gap: 6px;
  padding: 6px 8px;
  overflow: hidden;
}
.disinfection-stats {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}
.disinfection-stat-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(90deg, rgba(7,58,97,.72), rgba(4,38,68,.72));
  border: 1px solid rgba(71,168,228,.22);
  border-radius: 8px;
  padding: 8px 10px;
}
.stat-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(54,224,255,.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #36e0ff;
  background: rgba(4,43,73,.5);
  flex-shrink: 0;

  svg {
    display: block;
  }
}
.stat-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.stat-value {
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
}
.stat-label {
  font-size: 11px;
  color: #8899aa;
}
.disinfection-table {
  margin-top: 2px;
  font-size: 11px;
  th { height: 26px; }
  td { height: 24px; padding: 2px 4px; }
}

/* ==================== 意见反馈 ==================== */
.feedback-body {
  flex-direction: row;
  gap: 10px;
  padding: 8px;
}
.feedback-contacts {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}
.contact-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(8, 30, 52, 0.72);
  border: 1px solid rgba(71, 168, 228, 0.22);
  border-radius: 8px;
  padding: 8px 10px;
  min-height: 0;
}
.contact-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #4facfe, #667eea);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.contact-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.contact-name {
  font-size: 14px;
  font-weight: 700;
  color: #eef8ff;
  line-height: 1.2;
}
.contact-role,
.contact-phone {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #a0b4cc;
  line-height: 1.2;
}
.contact-icon {
  font-size: 11px;
  color: #4facfe;
}
.feedback-qr {
  width: 100px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-left: 10px;
  border-left: 1px solid rgba(38, 130, 197, 0.24);

  img {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    background: #fff;
    object-fit: contain;
  }
}
.qr-label {
  font-size: 10px;
  color: #a0b4cc;
  text-align: center;
  line-height: 1.2;
}

/* ==================== 智慧存样 ==================== */
.sample-storage-body {
  padding: 8px 10px;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(30,120,255,.2); border-radius: 2px; }

  &.compact {
    padding: 6px 8px;
    overflow: hidden;

    .storage-day-list { gap: 8px; }
    .storage-day { gap: 5px; }
    .day-label { font-size: 13px; }
    .meal-cards { gap: 6px; }
    .meal-card {
      min-height: 44px;
      padding: 5px 3px;
      gap: 2px;
      .meal-title { font-size: 10px; }
      .meal-count { font-size: 13px; }
    }
  }
}
.storage-day-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.storage-day {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.day-label {
  font-size: 13px;
  font-weight: 700;
  color: #eef8ff;
}
.meal-cards {
  display: flex;
  gap: 8px;
}
.meal-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 6px 4px;
  border-radius: 6px;
  background: rgba(67,233,123,.15);
  border: 1px solid rgba(67,233,123,.25);
  color: #fff;
  min-height: 48px;
  transition: all .2s;

  &:hover { filter: brightness(1.15); }

  .meal-title {
    font-size: 11px;
    font-weight: 600;
    line-height: 1.2;
    text-align: center;
  }

  .meal-count {
    font-size: 14px;
    font-weight: 800;
    line-height: 1.2;
  }
}
.meal-card--done {
  background: rgba(245,158,11,.25);
  border-color: rgba(245,158,11,.5);
}

/* ==================== 智慧抓拍 ==================== */
.snapshot-body {
  padding: 8px 10px;

  &.compact {
    padding: 5px 6px;
    overflow: hidden;

    .snapshot-grid { gap: 6px 8px; }
    .snapshot-category { gap: 3px; }
    .category-name { font-size: 10px; }
    .category-card {
      padding: 5px 4px;
      gap: 4px;
      border-radius: 4px;
    }
    .card-status { font-size: 10px; }
    .card-text { font-size: 10px; }
    .card-count { font-size: 14px; }
  }
}
.snapshot-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 12px;
  height: 100%;
}
.snapshot-category {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.category-name {
  font-size: 12px;
  font-weight: 700;
  color: #eef8ff;
}
.category-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 6px;
  border-radius: 6px;
  background: rgba(67,233,123,.15);
  border: 1px solid rgba(67,233,123,.25);
  color: #fff;
  transition: all .2s;

  &:hover { filter: brightness(1.15); }
}
.card-status {
  font-size: 12px;
  font-weight: 600;
}
.card-text {
  font-size: 12px;
}
.card-count {
  font-size: 18px;
  font-weight: 800;
  color: #43e97b;
  line-height: 1;
}

/* ==================== 食材采购 ==================== */
.supplier-body {
  padding: 4px 6px;
  overflow: hidden;

  &.compact { padding: 4px 6px; }
}
.supplier-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  color: #eaf6ff;
  text-align: center;

  thead th {
    height: 28px;
    color: #22a9ff;
    font-weight: 700;
    background: rgba(4,43,73,.65);
    border-bottom: 1px solid rgba(38,130,197,.24);
  }

  tbody td {
    padding: 7px 4px;
    background: rgba(8,37,62,.6);
    border-top: 1px solid rgba(38,130,197,.18);
  }

  tbody tr:hover td {
    background: rgba(16,72,112,.75);
    color: #fff;
  }

  .col-seq { width: 40px; }
}

/* ==================== 食材验收 ==================== */
.acceptance-body {
  padding: 4px 6px;
  overflow: hidden;

  &.compact { padding: 4px 6px; }
}
.acceptance-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  color: #eaf6ff;
  text-align: center;

  thead th {
    height: 28px;
    color: #22a9ff;
    font-weight: 700;
    background: rgba(4,43,73,.65);
    border-bottom: 1px solid rgba(38,130,197,.24);
  }

  tbody td {
    padding: 6px 3px;
    background: rgba(8,37,62,.6);
    border-top: 1px solid rgba(38,130,197,.18);
  }

  tbody tr:hover td {
    background: rgba(16,72,112,.75);
    color: #fff;
  }

  .col-seq { width: 34px; }
}

/* ==================== 右侧日管控 - 仅标题栏 ==================== */
.daily-control-panel {
  height: 54px;
  min-height: 54px;
  flex-shrink: 0;

  .panel__title {
    height: 100%;
    line-height: 54px;
    border-radius: 8px;
    font-size: 18px;
  }
}

.daily-date {
  margin-right: 10px;
  color: #eef8ff;
}

.daily-status {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;

  &.status-done {
    background: rgba(67,233,123,.18);
    color: #43e97b;
  }

  &.status-undone {
    background: rgba(245,87,54,.18);
    color: #f5576c;
  }
}

/* ==================== 右侧台账面板 ==================== */
.ledger-panel {
  flex: 1;
  min-height: 0;
}

.ledger-table-wrap {
  flex: 1;
  overflow: hidden;
  padding: 4px 0;
}

.ledger-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  color: #eaf6ff;
  table-layout: fixed;

  thead th {
    text-align: left;
    padding: 6px 8px;
    color: #22a9ff;
    font-weight: 800;
    background: rgba(4,43,73,.72);
    border-bottom: 1px solid rgba(38,130,197,.24);
    position: sticky;
    top: 0;
    border-left: 1px solid rgba(31,113,170,.22);
  }

  tbody td {
    padding: 5px 6px;
    background: rgba(8,37,62,.72);
    border-top: 1px solid rgba(38,130,197,.24);
    border-left: 1px solid rgba(31,113,170,.22);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  tbody tr:hover td {
    background: rgba(16,72,112,.82);
    color: #fff;
  }

  .col-seq { width: 22%; text-align: center; }
  .col-name { width: 34%; }
  .col-time { width: 24%; }
  .col-done { width: 20%; text-align: center; }
}

/* ==================== Element Plus 弹窗覆盖 ==================== */
:deep(.el-dialog) {
  background: linear-gradient(180deg, rgba(2,19,38,.96), rgba(2,12,24,.92)) !important;
  border: 2px solid rgba(22,134,210,.9) !important;
  border-radius: 8px !important;
  box-shadow: 0 0 28px rgba(0,133,255,.38), inset 0 0 36px rgba(0,142,255,.1) !important;
  margin: 0 auto !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  height: 600px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
}

:deep(.el-dialog__header) {
  padding: 0 14px !important;
  height: 44px;
  background: linear-gradient(90deg, #155d91 0%, #113e69 54%, #0a2b4e 100%) !important;
  border-bottom: 1px solid rgba(78,187,255,.45) !important;
  border-radius: 6px 6px 0 0 !important;
  margin-right: 0 !important;
  display: flex;
  align-items: center;
}

:deep(.el-dialog__title) {
  font-size: 15px !important;
  font-weight: 800 !important;
  color: #fff !important;
}

:deep(.el-dialog__headerbtn) {
  top: 5px !important;
  right: 14px !important;
  width: 34px !important;
  height: 34px !important;
  border: none !important;
  background: transparent !important;
  border-radius: 0 !important;

  &:hover {
    background: transparent !important;
  }
}

:deep(.el-dialog__close) {
  color: #fff !important;
  font-size: 30px !important;
}

:deep(.el-dialog__body) {
  flex: 1;
  overflow: hidden;
  padding: 20px;
  color: #eef8ff;
}

:deep(.el-dialog__overlay) {
  background: rgba(1,8,20,.48) !important;
  backdrop-filter: blur(2px);
}

/* ==================== Element Plus 表格覆盖 ==================== */
:deep(.el-table) {
  --el-table-bg-color: transparent;
  --el-table-tr-bg-color: transparent;
  --el-table-header-bg-color: rgba(4,43,73,.72);
  --el-table-row-hover-bg-color: rgba(16,72,112,.82);
  --el-table-border-color: rgba(31,113,170,.22);
  --el-table-text-color: #eaf6ff;
  --el-table-header-text-color: #22a9ff;
  background-color: transparent !important;
  color: #eaf6ff;

  &::before, &::after { display: none; }
  .el-table__inner-wrapper::before { display: none; }

  th.el-table__cell {
    background-color: rgba(4,43,73,.72) !important;
    color: #22a9ff !important;
    font-weight: 800;
    border-bottom-color: rgba(38,130,197,.24) !important;
  }

  td.el-table__cell {
    background-color: rgba(8,37,62,.72) !important;
    border-bottom-color: rgba(38,130,197,.24) !important;
  }

  .el-table__row:hover > td.el-table__cell {
    background-color: rgba(16,72,112,.82) !important;
    color: #fff !important;
  }
}

:deep(.el-dialog__body) {
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: rgba(30,120,255,.2);
    border-radius: 3px;
    &:hover { background: rgba(30,120,255,.35); }
  }
}
</style>
