import { get } from './request'
import type { SampleRingData, SampleTableItem } from '@/mock/data'

/**
 * 智慧留样 - 后端接口集合
 */
export interface SampleRetentionSummary {
  /** 三餐数据占比分析 */
  ring: SampleRingData[]
  /** 最新留样记录，用于表格和弹窗 */
  records: SampleTableItem[]
}

/**
 * GET /api/sample-retention/summary
 * 返回饼图数据 + 留样记录
 */
export function getSampleRetentionSummary(): Promise<SampleRetentionSummary> {
  return get<SampleRetentionSummary>('/sample-retention/summary')
}

/**
 * GET /api/sample-retention/ring
 * 仅返回三餐占比数据
 */
export function getSampleRetentionRing(): Promise<SampleRingData[]> {
  return get<SampleRingData[]>('/sample-retention/ring')
}

/**
 * GET /api/sample-retention/records
 * 仅返回留样记录
 */
export function getSampleRetentionRecords(): Promise<SampleTableItem[]> {
  return get<SampleTableItem[]>('/sample-retention/records')
}
