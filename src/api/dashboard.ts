/**
 * 数据服务层
 * =====================
 * 当前使用 Mock 数据，通过 setTimeout 模拟接口请求。
 * 3秒后返回初始数据，再过3秒追加一条新数据，
 * 证实页面数据自动联动更新，无需手动修改前端代码。
 *
 * 当后端 API 就绪后，将对应方法中的 mockData 替换为 axios 请求即可。
 */
import { mockDashboardData, type DashboardData } from '@/mock/data'
import { getFoodPriceSummary, type FoodPriceSummary } from './food-price'
import { getSampleRetentionSummary, type SampleRetentionSummary } from './sample-retention'
import { getMorningCheckSummary, type MorningCheckSummary } from './morning-check'
import { getDailyControlSummary, type DailyControlSummary } from './daily-control'
import { getLedgerRecords } from './ledger'
import { getDisinfectionSummary, type DisinfectionSummary } from './disinfection'
import { getFeedbackList, getFeedbackQrCode } from './feedback'
import { getSampleStorageSummary, type SampleStorageSummary } from './sample-storage'
import { getSnapshotSummary, type SnapshotSummary } from './snapshot'
import { getSupplierList } from './supplier'
import { getAcceptanceRecords } from './acceptance'

/**
 * 模拟接口请求：3秒后返回初始数据
 * 未来食安平台同学提供真实数据接口后，替换为 axios 调用即可
 */
export async function getDashboardData(): Promise<DashboardData> {
  const data: DashboardData = await new Promise((resolve) => {
    setTimeout(() => {
      // 深拷贝初始数据，避免直接修改原始 mock 常量
      resolve(JSON.parse(JSON.stringify(mockDashboardData)))
    }, 3000)
  })

  // ===== 菜价公示：真实接口就绪后自动覆盖 mock 数据 =====
  try {
    const foodPrice: FoodPriceSummary = await getFoodPriceSummary()
    if (foodPrice) {
      data.priceChart = foodPrice.chart ?? data.priceChart
      data.foodPriceDetail = foodPrice.detail ?? data.foodPriceDetail
    }
  } catch (err) {
    console.warn('[菜价公示] 接口未就绪，使用 mock 数据:', err)
  }

  // ===== 智慧留样：真实接口就绪后自动覆盖 mock 数据 =====
  try {
    const sample: SampleRetentionSummary = await getSampleRetentionSummary()
    if (sample) {
      data.sampleRing = sample.ring ?? data.sampleRing
      data.sampleTable = sample.records ?? data.sampleTable
    }
  } catch (err) {
    console.warn('[智慧留样] 接口未就绪，使用 mock 数据:', err)
  }

  // ===== 智慧晨检：真实接口就绪后自动覆盖 mock 数据 =====
  try {
    const morning: MorningCheckSummary = await getMorningCheckSummary()
    if (morning) {
      data.morningChart = morning.chart ?? data.morningChart
      data.morningPerson = morning.records ?? data.morningPerson
    }
  } catch (err) {
    console.warn('[智慧晨检] 接口未就绪，使用 mock 数据:', err)
  }

  // ===== 日管控：真实接口就绪后自动覆盖 mock 数据 =====
  try {
    const daily: DailyControlSummary = await getDailyControlSummary()
    if (daily) {
      data.dailyControlInfo = daily.info ?? data.dailyControlInfo
      data.dailyControlRecords = daily.records ?? data.dailyControlRecords
      data.dailyControlCheck = daily.checks ?? data.dailyControlCheck
    }
  } catch (err) {
    console.warn('[日管控] 接口未就绪，使用 mock 数据:', err)
  }

  // ===== 智慧台账：真实接口就绪后自动覆盖 mock 数据 =====
  try {
    const ledger = await getLedgerRecords()
    if (ledger) {
      data.ledgerRecords = ledger ?? data.ledgerRecords
    }
  } catch (err) {
    console.warn('[智慧台账] 接口未就绪，使用 mock 数据:', err)
  }

  // ===== 智慧消毒：真实接口就绪后自动覆盖 mock 数据 =====
  try {
    const disinfection: DisinfectionSummary = await getDisinfectionSummary()
    if (disinfection) {
      data.disinfectionStats = {
        disinfectedCanteens: disinfection.disinfectedCanteens ?? data.disinfectionStats.disinfectedCanteens,
        duration: disinfection.duration ?? data.disinfectionStats.duration
      }
      data.disinfectionRecords = disinfection.records ?? data.disinfectionRecords
    }
  } catch (err) {
    console.warn('[智慧消毒] 接口未就绪，使用 mock 数据:', err)
  }

  // ===== 意见反馈：真实接口就绪后自动覆盖 mock 数据 =====
  try {
    const [feedbackList, feedbackQr] = await Promise.all([
      getFeedbackList(),
      getFeedbackQrCode()
    ])
    if (feedbackList) {
      data.feedback = feedbackList ?? data.feedback
    }
    if (feedbackQr) {
      data.feedbackQrCode = feedbackQr ?? data.feedbackQrCode
    }
  } catch (err) {
    console.warn('[意见反馈] 接口未就绪，使用 mock 数据:', err)
  }

  // ===== 智慧存样：真实接口就绪后自动覆盖 mock 数据 =====
  try {
    const sampleStorage: SampleStorageSummary = await getSampleStorageSummary()
    if (sampleStorage) {
      data.sampleStorage = sampleStorage.days ?? data.sampleStorage
      data.sampleStorageRecords = sampleStorage.records ?? data.sampleStorageRecords
    }
  } catch (err) {
    console.warn('[智慧存样] 接口未就绪，使用 mock 数据:', err)
  }

  // ===== 智慧抓拍：真实接口就绪后自动覆盖 mock 数据 =====
  try {
    const snapshot: SnapshotSummary = await getSnapshotSummary()
    if (snapshot) {
      data.snapshotCategories = snapshot.categories ?? data.snapshotCategories
      data.snapshotRecords = snapshot.records ?? data.snapshotRecords
    }
  } catch (err) {
    console.warn('[智慧抓拍] 接口未就绪，使用 mock 数据:', err)
  }

  // ===== 食材采购：真实接口就绪后自动覆盖 mock 数据 =====
  try {
    const supplierList = await getSupplierList()
    if (supplierList) {
      data.supplierTable = supplierList ?? data.supplierTable
    }
  } catch (err) {
    console.warn('[食材采购] 接口未就绪，使用 mock 数据:', err)
  }

  // ===== 食材验收：真实接口就绪后自动覆盖 mock 数据 =====
  try {
    const acceptanceList = await getAcceptanceRecords()
    if (acceptanceList) {
      data.acceptanceRecords = acceptanceList ?? data.acceptanceRecords
    }
  } catch (err) {
    console.warn('[食材验收] 接口未就绪，使用 mock 数据:', err)
  }

  return data
}

/**
 * 模拟数据更新：追加一条新记录，用于验证数据联动
 * 在 onMounted 3秒初始加载后再延迟3秒调用
 */
export async function fetchUpdatedData(current: DashboardData): Promise<DashboardData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = { ...current }

      // 向菜价公示表格追加一条新数据
      data.foodPriceDetail = [
        ...data.foodPriceDetail,
        {
          id: data.foodPriceDetail.length + 1,
          date: '06-21',
          school: '第一食堂',
          dish: '新增菜品（接口更新）',
          price: 7.5,
          publisher: '系统',
          reviewer: '管理员'
        }
      ]

      // 向智慧留样表格追加一条新记录
      data.sampleTable = [
        ...data.sampleTable,
        {
          id: data.sampleTable.length + 1,
          mealType: '午餐',
          dishName: '接口新增菜品',
          sampleTime: '12:00',
          operator: '系统',
          status: '留样中',
          sampleWeight: '125g',
          retentionPeriod: '48小时',
          temperature: '0-8°C'
        }
      ]

      // 向日管控追加一条新检查项
      data.dailyControlCheck = [
        ...data.dailyControlCheck,
        {
          id: data.dailyControlCheck.length + 1,
          checkItem: '接口新增检查项',
          standard: '自动验证标准',
          result: '合格',
          status: 'normal' as const,
          checker: '系统',
          checkTime: '2026-06-21 09:00'
        }
      ]

      resolve(data)
    }, 3000)
  })
}
