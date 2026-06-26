import { get } from './request'
import type { MorningChartPoint, MorningPersonItem } from '@/mock/data'

/**
 * 智慧晨检 - 后端接口集合
 * 后端按以下格式提供数据即可，前端自动渲染
 */
export interface MorningCheckSummary {
  /** 今日晨检总人数，显示在标题右侧 */
  totalCount: number
  /** 近7天晨检人数趋势，用于折线图 */
  chart: MorningChartPoint[]
  /** 最新晨检记录，用于表格展示 */
  records: MorningPersonItem[]
}

/**
 * GET /api/morning-check/summary
 * 返回今日总数 + 趋势图 + 人员记录
 */
export function getMorningCheckSummary(): Promise<MorningCheckSummary> {
  return get<MorningCheckSummary>('/morning-check/summary')
}

/**
 * GET /api/morning-check/chart
 * 仅返回近7天趋势图
 */
export function getMorningCheckChart(): Promise<MorningChartPoint[]> {
  return get<MorningChartPoint[]>('/morning-check/chart')
}

/**
 * GET /api/morning-check/records
 * 仅返回晨检人员记录
 */
export function getMorningCheckRecords(): Promise<MorningPersonItem[]> {
  return get<MorningPersonItem[]>('/morning-check/records')
}
