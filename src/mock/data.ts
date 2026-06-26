/**
 * Mock 数据集 - 食堂数据驾驶舱（深蓝科技风可视化大屏版）
 * ============================
 * 此文件为前端假数据集，当后端接口就绪后，
 * 仅需修改 src/api/dashboard.ts 中的数据获取方式即可切换为真实API数据。
 */

// ==================== 天气数据 ====================
export interface WeatherData {
  condition: string
  temperature: number
  airQuality: string
  icon: string
}
export const mockWeather: WeatherData = {
  condition: '晴',
  temperature: 30,
  airQuality: '优',
  icon: 'Sunny'
}

// ==================== 菜价公示 - 折线图 + 表格 ====================
export interface PriceChartPoint {
  date: string
  早餐均价: number
  午餐均价: number
  晚餐均价: number
  avgPrice: number  // 新增：均价用于面积图
}
export interface PriceTableItem {
  id: number
  dishName: string
  category: string
  price: number
  canteen: string
  trend: 'up' | 'down' | 'flat'
}
// 菜品明细接口
export interface FoodPriceDetailItem {
  id: number
  date: string
  school: string
  dish: string
  price: number
  publisher: string
  reviewer: string
}
export const mockPriceChart: PriceChartPoint[] = [
  { date: '05-06', 早餐均价: 4.5, 午餐均价: 11.2, 晚餐均价: 10.8, avgPrice: 6.2 },
  { date: '05-07', 早餐均价: 4.3, 午餐均价: 11.5, 晚餐均价: 10.5, avgPrice: 5.8 },
  { date: '05-08', 早餐均价: 4.6, 午餐均价: 10.9, 晚餐均价: 11.0, avgPrice: 6.5 },
  { date: '05-09', 早餐均价: 4.4, 午餐均价: 11.3, 晚餐均价: 10.6, avgPrice: 7.1 },
  { date: '05-10', 早餐均价: 4.7, 午餐均价: 11.0, 晚餐均价: 10.9, avgPrice: 6.8 },
  { date: '05-11', 早餐均价: 4.5, 午餐均价: 11.4, 晚餐均价: 10.7, avgPrice: 5.5 },
  { date: '05-12', 早餐均价: 4.6, 午餐均价: 11.1, 晚餐均价: 11.2, avgPrice: 6.0 }
]
export const mockPriceTable: PriceTableItem[] = [
  { id: 1, dishName: '红烧肉', category: '荤菜', price: 12, canteen: '一食堂', trend: 'flat' },
  { id: 2, dishName: '宫保鸡丁', category: '荤菜', price: 10, canteen: '一食堂', trend: 'down' },
  { id: 3, dishName: '清炒时蔬', category: '素菜', price: 5, canteen: '一食堂', trend: 'flat' },
  { id: 4, dishName: '番茄蛋汤', category: '汤类', price: 3, canteen: '一食堂', trend: 'flat' },
  { id: 5, dishName: '鱼香肉丝', category: '荤菜', price: 11, canteen: '一食堂', trend: 'up' }
]
// 菜品明细数据
export const mockFoodPriceDetail: FoodPriceDetailItem[] = [
  { id: 1, date: '05-12', school: '第一食堂', dish: '辣椒炒肉', price: 5.0, publisher: '张三', reviewer: '李四' },
  { id: 2, date: '05-12', school: '第二食堂', dish: '番茄炒蛋', price: 4.5, publisher: '王五', reviewer: '赵六' },
  { id: 3, date: '05-13', school: '第一食堂', dish: '蒜蓉时蔬', price: 3.0, publisher: '张三', reviewer: '李四' },
  { id: 4, date: '05-13', school: '第三食堂', dish: '红烧排骨', price: 8.0, publisher: '钱七', reviewer: '孙八' },
  { id: 5, date: '05-12', school: '第二食堂', dish: '清炒虾仁', price: 12.0, publisher: '王五', reviewer: '赵六' },
  { id: 6, date: '05-12', school: '第一食堂', dish: '红烧肉', price: 12.0, publisher: '张三', reviewer: '李四' },
  { id: 7, date: '05-12', school: '第二食堂', dish: '宫保鸡丁', price: 10.0, publisher: '王五', reviewer: '赵六' },
  { id: 8, date: '05-13', school: '第一食堂', dish: '清炒时蔬', price: 5.0, publisher: '张三', reviewer: '李四' },
  { id: 9, date: '05-13', school: '第三食堂', dish: '番茄蛋汤', price: 3.0, publisher: '钱七', reviewer: '孙八' },
  { id: 10, date: '05-12', school: '第二食堂', dish: '鱼香肉丝', price: 11.0, publisher: '王五', reviewer: '赵六' }
]

// ==================== 智慧留样 - 环形图 + 表格 ====================
export interface SampleRingData {
  name: string
  value: number
}
export interface SampleTableItem {
  id: number
  mealType: string
  dishName: string
  sampleTime: string
  operator: string
  status: string
  sampleWeight?: string
  retentionPeriod?: string
  temperature?: string
  image?: string
}
export const mockSampleRing: SampleRingData[] = [
  { name: '早餐留样', value: 8 },
  { name: '午餐留样', value: 15 },
  { name: '晚餐留样', value: 12 }
]
const foodCategories = ['biryani','burger','butter-chicken','dessert','dosa','idly','pasta','pizza','rice','samosa']
const foodImageUrls = Array.from({ length: 24 }, (_, i) => {
  const cat = foodCategories[i % foodCategories.length]
  const num = Math.floor(i / foodCategories.length) + 1
  return `https://foodish-api.com/images/${cat}/${cat}${num}.jpg`
})

const sampleDishNames = ['小笼包','红烧肉','番茄蛋汤','宫保鸡丁','豆浆油条','清蒸鱼','鸡蛋灌饼','土豆烧牛肉','蒜蓉西兰花','麻辣香锅','煎饼果子','糖醋排骨','鱼香肉丝','肉包子','麻婆豆腐','回锅肉','烧麦','红烧狮子头','干煸四季豆','南瓜粥','孜然羊肉','酸菜鱼','韭菜盒子','京酱肉丝']
const sampleMealTypes = ['早餐','午餐','午餐','晚餐','早餐','午餐','早餐','午餐','午餐','晚餐','早餐','午餐','晚餐','早餐','午餐','晚餐','早餐','午餐','晚餐','早餐','午餐','晚餐','早餐','晚餐']
const sampleTimes = ['07:30','11:30','11:30','17:30','07:30','11:30','07:15','11:36','11:36','17:36','07:20','11:36','17:25','07:20','11:36','17:36','07:15','11:36','17:36','07:20','11:36','17:36','07:15','17:36']
const sampleOperators = ['刘佳','陈敏','陈敏','刘佳','刘佳','陈敏','王芳','陈敏','陈敏','王芳','刘佳','陈敏','王芳','刘佳','陈敏','王芳','刘佳','陈敏','王芳','刘佳','陈敏','王芳','刘佳','王芳']
const sampleWeights = ['125g','150g','200ml','150g','250ml','200g','180g','200g','130g','250g','200g','180g','160g','150g','140g','170g','120g','220g','130g','300ml','190g','300g','160g','180g']

export const mockSampleTable: SampleTableItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  mealType: sampleMealTypes[i],
  dishName: sampleDishNames[i],
  sampleTime: sampleTimes[i],
  operator: sampleOperators[i],
  status: '留样中',
  sampleWeight: sampleWeights[i],
  retentionPeriod: '48小时',
  temperature: '0-8°C',
  image: foodImageUrls[i]
}))

// ==================== 智慧晨检 - 折线图 + 人员表 ====================
export interface MorningChartPoint {
  date: string
  count: number
}
export interface MorningPersonItem {
  id: number
  name: string
  department: string
  bodyTemp: string
  healthCert: string
  result: string
  staffName?: string
  handWound?: string
  uniform?: string
  checkTime?: string
  image?: string
}
export const mockMorningChart: MorningChartPoint[] = [
  { date: '05-01', count: 32 },
  { date: '05-02', count: 58 },
  { date: '05-03', count: 38 },
  { date: '05-04', count: 21 },
  { date: '05-05', count: 44 },
  { date: '05-06', count: 56 },
  { date: '05-07', count: 33 }
]
const morningNames = ['张三','李四','王五','赵六','钱七']
const morningDepartments = ['后厨','后厨','前厅','后厨','前厅']
const morningTemps = ['36.2°C','36.5°C','36.1°C','37.1°C','36.3°C']
const morningResults = ['通过','通过','通过','异常','通过']
const morningCheckTimes = ['7:36','7:38','7:40','7:42','7:45']

export const mockMorningPerson: MorningPersonItem[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: morningNames[i],
  staffName: morningNames[i],
  department: morningDepartments[i],
  bodyTemp: morningTemps[i],
  healthCert: '合格',
  result: morningResults[i],
  handWound: morningResults[i] === '异常' ? '有' : '无',
  uniform: morningResults[i] === '异常' ? '不整洁' : '整洁',
  checkTime: morningCheckTimes[i],
  image: `https://loremflickr.com/120/90/thermometer,person?lock=${i + 1}`
}))

// ==================== 智慧消毒 - 指标 + 记录表 ====================
export interface DisinfectionStats {
  disinfectedCanteens: string // e.g. "25/28"
  duration: string             // e.g. "30 min"
}
export interface DisinfectionRecord {
  id: number
  date: string       // 消毒日期，如 5月15日
  method: string     // 消毒方式
  startTime: string  // 开始时间
  endTime: string    // 结束时间
  duration: string   // 时长
  status: string     // 状态
}
export const mockDisinfectionStats: DisinfectionStats = {
  disinfectedCanteens: '25/28',
  duration: '30 min'
}
export const mockDisinfectionRecords: DisinfectionRecord[] = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  date: '5月15日',
  method: '紫外灯',
  startTime: '16:40',
  endTime: '16:40',
  duration: '30min',
  status: '合格'
}))

// ==================== 意见反馈 ====================
export interface FeedbackItem {
  id: number
  name: string
  avatar: string
  role: string
  phone: string
  content: string
  time: string
  status: string
  feedbackTime: string
  questionType: string
  handler: string
  reviewer: string
  qrcode?: string
  type?: string
  severity?: string
  submitTime?: string
  reply?: string
}

const feedbackContacts = [
  { name: '张丽丽', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', role: '食堂负责人', phone: '13256568989' },
  { name: '李立峰', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', role: '食堂食安员', phone: '13256568989' },
  { name: '张同学', avatar: '', role: '学生', phone: '137****9012' },
  { name: '赵老师', avatar: '', role: '教师', phone: '136****3456' },
  { name: '陈同学', avatar: '', role: '学生', phone: '135****9012' },
  { name: '周老师', avatar: '', role: '教师', phone: '134****5678' }
]
const feedbackQuestionTypes = ['口味问题', '卫生问题', '服务问题', '菜品质量', '建议', '其他']
const feedbackHandlers = ['张三', '李四', '王五', '赵六', '钱七', '孙八']
const feedbackReviewers = ['张三', '李四', '王五', '赵六', '钱七', '孙八']
const feedbackContents = [
  '午餐红烧肉偏咸，建议减盐',
  '建议增加素食选项',
  '餐具清洁度不够',
  '排队时间过长',
  '建议增加夜宵供应',
  '菜品温度不够热',
  '米饭有点硬',
  '希望多出水果',
  '汤品太淡',
  '辣椒炒肉太辣'
]

export const mockFeedback: FeedbackItem[] = Array.from({ length: 120 }, (_, i) => {
  const contact = feedbackContacts[i % feedbackContacts.length]
  const typeIdx = i % feedbackQuestionTypes.length
  return {
    id: i + 1,
    name: contact.name,
    avatar: contact.avatar,
    role: contact.role,
    phone: contact.phone,
    content: feedbackContents[i % feedbackContents.length],
    time: '12:00',
    status: i < 110 ? '已处理' : '处理中',
    feedbackTime: '5月15日',
    questionType: feedbackQuestionTypes[typeIdx],
    handler: feedbackHandlers[i % feedbackHandlers.length],
    reviewer: feedbackReviewers[i % feedbackReviewers.length],
    type: feedbackQuestionTypes[typeIdx],
    severity: typeIdx === 1 ? '严重' : '一般',
    submitTime: '2026-05-15 12:00',
    reply: ''
  }
})

const feedbackQrCodeSvg = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><path d="M8 8h28v28H8zm4 4v20h20V12zm4 4h12v12H16zm48-12h28v28H64zm4 4v20h20V12zm4 4h12v12H72zM8 64h28v28H8zm4 4v20h20V68zm4 4h12v12H16zm28-4h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8zm24 0h8v8h-8zM52 80h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8zM52 52h8v8h-8zm12 0h8v8h-8zm36 0h8v8h-8zM80 64h8v8h-8zm12 0h8v8h-8zM80 80h8v8h-8z" fill="black"/></svg>')}`

export interface SampleStorageMeal {
  mealType: string
  status: string
  stored: number
  total: number
}

export interface SampleStorageBlock {
  date: string
  fridgeTemp?: string
  meals: SampleStorageMeal[]
}

export interface SampleStorageRecord {
  id: number
  openDate: string
  openTime: string
  opener: string
}

export const mockSampleStorage: SampleStorageBlock[] = [
  {
    date: '5月28日',
    fridgeTemp: '5°C',
    meals: [
      { mealType: '早餐', status: '存样中', stored: 25, total: 28 },
      { mealType: '中餐', status: '已消样', stored: 25, total: 28 },
      { mealType: '晚餐', status: '存样中', stored: 25, total: 28 }
    ]
  },
  {
    date: '5月29日',
    meals: [
      { mealType: '早餐', status: '存样中', stored: 25, total: 28 },
      { mealType: '中餐', status: '已消样', stored: 25, total: 28 },
      { mealType: '晚餐', status: '存样中', stored: 25, total: 28 }
    ]
  },
  {
    date: '5月30日',
    meals: [
      { mealType: '早餐', status: '存样中', stored: 25, total: 28 },
      { mealType: '中餐', status: '已消样', stored: 25, total: 28 },
      { mealType: '晚餐', status: '存样中', stored: 25, total: 28 }
    ]
  }
]

export const mockSampleStorageRecords: SampleStorageRecord[] = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  openDate: '5月15日',
  openTime: '16:40',
  opener: '张三'
}))

// ==================== 智慧抓拍 - 违规监控 ====================
export interface SnapshotAlert {
  id: number
  area: string
  type: string
  count: number
  severity: 'low' | 'mid' | 'high'
  lastTime: string
  time?: string
  description?: string
  aiResult?: string
  alertLevel?: string
}
export const mockSnapshotAlerts: SnapshotAlert[] = [
  { id: 1, area: '后厨操作区', type: '未佩戴口罩', count: 3, severity: 'high', lastTime: '10:15:42', time: '10:15:42', description: '工作人员未佩戴口罩', aiResult: '违规', alertLevel: 'danger' },
  { id: 2, area: '后厨操作区', type: '未戴厨师帽', count: 1, severity: 'mid', lastTime: '09:30:18', time: '09:30:18', description: '工作人员未戴厨师帽', aiResult: '预警', alertLevel: 'warning' },
  { id: 3, area: '售餐区', type: '未戴手套', count: 2, severity: 'mid', lastTime: '11:22:05', time: '11:22:05', description: '售餐人员未戴手套', aiResult: '预警', alertLevel: 'warning' },
  { id: 4, area: '仓库', type: '鼠患风险', count: 1, severity: 'low', lastTime: '08:00:33', time: '08:00:33', description: '仓库发现鼠患迹象', aiResult: '合规', alertLevel: 'normal' },
  { id: 5, area: '后厨操作区', type: '吸烟检测', count: 0, severity: 'low', lastTime: '07:50:00', time: '07:50:00', description: '未检测到吸烟行为', aiResult: '合规', alertLevel: 'normal' },
  { id: 6, area: '售餐区', type: '异物检测', count: 0, severity: 'low', lastTime: '07:55:00', time: '07:55:00', description: '未检测到异物', aiResult: '合规', alertLevel: 'normal' }
]

export interface SnapshotCategory {
  id: number
  name: string
  status: string
  alertCount: number
}

export const mockSnapshotCategories: SnapshotCategory[] = [
  { id: 1, name: '口罩佩戴', status: '监控中', alertCount: 9 },
  { id: 2, name: '抽烟行为', status: '监控中', alertCount: 9 },
  { id: 3, name: '工服穿戴', status: '监控中', alertCount: 9 },
  { id: 4, name: '鼠患识别', status: '监控中', alertCount: 9 },
  { id: 5, name: '帽子穿戴', status: '监控中', alertCount: 9 },
  { id: 6, name: '生人识别', status: '监控中', alertCount: 9 }
]

export interface SnapshotRecord {
  id: number
  captureDate: string
  captureTime: string
  problem: string
  imageUrl: string
}

const snapshotProblems = ['未戴口罩', '未戴工服', '未戴帽子', '吸烟行为', '鼠患风险', '生人闯入']
export const mockSnapshotRecords: SnapshotRecord[] = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  captureDate: '5月15日',
  captureTime: '16:40',
  problem: snapshotProblems[i % snapshotProblems.length],
  imageUrl: `https://loremflickr.com/320/240/canteen,kitchen?lock=${i + 1}`
}))

// ==================== 智慧环境 - 温湿度/燃气烟雾 ====================
export interface EnvData {
  temperature: number
  humidity: number
  gasLevel: string
  smokeLevel: string
  pm25: number
  noise: number
}
export const mockEnvData: EnvData = {
  temperature: 24.5,
  humidity: 58,
  gasLevel: '正常',
  smokeLevel: '正常',
  pm25: 35,
  noise: 62
}

// ==================== 食材采购 - 供应商表格 ====================
export interface SupplierTableItem {
  id: number
  name: string
  scope: string
  evaluation: string
  licenseStatus: string
  reviewer: string
}

export const mockSupplierTable: SupplierTableItem[] = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  name: '益海嘉里广州公司',
  scope: '米面粮油',
  evaluation: '良好',
  licenseStatus: '完备',
  reviewer: '张三'
}))

// ==================== 食材验收 - 到货记录 ====================
export interface AcceptanceRecord {
  id: number
  arrivalDate: string
  content: string
  supplier: string
  quality: string
  weight: string
  inspector: string
}

export const mockAcceptanceRecords: AcceptanceRecord[] = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  arrivalDate: i < 6 ? '5月12日' : '5月15日',
  content: '米面粮油',
  supplier: '益海嘉里广州公司',
  quality: i < 6 ? '质量合格' : '质量合格，无劣质品',
  weight: i < 6 ? '重量一致' : '重量与采购一致',
  inspector: i < 6 ? '李四' : '张三'
}))

// ==================== 智慧仓储 ====================
export interface StorageStats {
  staple: { rice: number; flour: number; oil: number; unit: string }
  nonStaple: { meat: number; vegetable: number; seasoning: number; unit: string }
}
export const mockStorageStats: StorageStats = {
  staple: { rice: 2500, flour: 800, oil: 320, unit: 'kg' },
  nonStaple: { meat: 450, vegetable: 1200, seasoning: 180, unit: 'kg' }
}

// ==================== 日管控 + 智慧台账（右侧竖栏） ====================
export interface DailyControlInfo {
  /** 日期，如 5月30日 */
  date: string
  /** 状态：已完成 / 未完成 */
  status: string
}
export interface DailyControlRecord {
  id: number
  /** 学校/单位 */
  school: string
  /** 食堂/类型 */
  canteen: string
  /** 完成数 / 总数 */
  progress: string
  /** 日期 */
  date: string
}
export interface DailyControlCheckItem {
  id: number
  checkItem: string
  standard: string
  result: string
  status: 'normal' | 'warning' | 'danger'
  checker: string
  checkTime?: string
}
export interface LedgerRecord {
  id: number
  ledgerName: string
  updateTime: string
  yesterdayDone: string
  detail?: string
}
export const mockDailyControlInfo: DailyControlInfo = {
  date: '5月30日',
  status: '已完成'
}
export const mockDailyControlRecords: DailyControlRecord[] = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  school: '广州一中',
  canteen: '一食堂日管控',
  progress: '25 / 28',
  date: '2026-06-01'
}))
export const mockDailyControlCheck: DailyControlCheckItem[] = [
  { id: 1, checkItem: '食品经营许可证', standard: '证照齐全有效', result: '合格', status: 'normal', checker: '李伟', checkTime: '2026-05-16 08:00' },
  { id: 2, checkItem: '从业人员健康证', standard: '全员有效期内', result: '合格', status: 'normal', checker: '李伟', checkTime: '2026-05-16 08:05' },
  { id: 3, checkItem: '原材料索证索票', standard: '票证齐全', result: '部分缺失', status: 'warning', checker: '王芳', checkTime: '2026-05-16 08:10' },
  { id: 4, checkItem: '食品添加剂管理', standard: '五专管理', result: '合格', status: 'normal', checker: '王芳', checkTime: '2026-05-16 08:15' },
  { id: 5, checkItem: '冷藏冷冻设备温度', standard: '-18°C/0-8°C', result: '超标', status: 'danger', checker: '张明', checkTime: '2026-05-16 08:20' },
  { id: 6, checkItem: '餐具消毒', standard: '≥100°C 10min', result: '合格', status: 'normal', checker: '张明', checkTime: '2026-05-16 08:25' },
  { id: 7, checkItem: '环境卫生', standard: '整洁无积水', result: '合格', status: 'normal', checker: '李伟', checkTime: '2026-05-16 08:30' },
  { id: 8, checkItem: '从业人员个人卫生', standard: '工服整洁戴口罩', result: '合格', status: 'normal', checker: '李伟', checkTime: '2026-05-16 08:35' },
  { id: 9, checkItem: '食品留样', standard: '≥125g/份 48h', result: '合格', status: 'normal', checker: '王芳', checkTime: '2026-05-16 08:40' },
  { id: 10, checkItem: '废弃物处理', standard: '日产日清', result: '合格', status: 'normal', checker: '张明', checkTime: '2026-05-16 08:45' }
]
export const mockLedgerRecords: LedgerRecord[] = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  ledgerName: i % 2 === 0 ? '消毒台账' : '留样台账',
  updateTime: '16:40',
  yesterdayDone: '是',
  detail: '查看详情'
}))

// ==================== 聚合导出 ====================
export interface DashboardData {
  weather: WeatherData
  priceChart: PriceChartPoint[]
  priceTable: PriceTableItem[]
  foodPriceDetail: FoodPriceDetailItem[]  // 新增：菜品明细
  sampleRing: SampleRingData[]
  sampleTable: SampleTableItem[]
  morningChart: MorningChartPoint[]
  morningPerson: MorningPersonItem[]
  disinfectionStats: DisinfectionStats
  disinfectionRecords: DisinfectionRecord[]
  feedback: FeedbackItem[]
  feedbackQrCode: string
  sampleStorage: SampleStorageBlock[]
  sampleStorageRecords: SampleStorageRecord[]
  snapshotAlerts: SnapshotAlert[]
  snapshotCategories: SnapshotCategory[]
  snapshotRecords: SnapshotRecord[]
  envData: EnvData
  supplierTable: SupplierTableItem[]
  acceptanceRecords: AcceptanceRecord[]
  storageStats: StorageStats
  dailyControlInfo: DailyControlInfo
  dailyControlRecords: DailyControlRecord[]
  dailyControlCheck: DailyControlCheckItem[]
  ledgerRecords: LedgerRecord[]
}

export const mockDashboardData: DashboardData = {
  weather: mockWeather,
  priceChart: mockPriceChart,
  priceTable: mockPriceTable,
  foodPriceDetail: mockFoodPriceDetail,  // 新增
  sampleRing: mockSampleRing,
  sampleTable: mockSampleTable,
  morningChart: mockMorningChart,
  morningPerson: mockMorningPerson,
  disinfectionStats: mockDisinfectionStats,
  disinfectionRecords: mockDisinfectionRecords,
  feedback: mockFeedback,
  feedbackQrCode: feedbackQrCodeSvg,
  sampleStorage: mockSampleStorage,
  sampleStorageRecords: mockSampleStorageRecords,
  snapshotAlerts: mockSnapshotAlerts,
  snapshotCategories: mockSnapshotCategories,
  snapshotRecords: mockSnapshotRecords,
  envData: mockEnvData,
  supplierTable: mockSupplierTable,
  acceptanceRecords: mockAcceptanceRecords,
  storageStats: mockStorageStats,
  dailyControlInfo: mockDailyControlInfo,
  dailyControlRecords: mockDailyControlRecords,
  dailyControlCheck: mockDailyControlCheck,
  ledgerRecords: mockLedgerRecords
}
