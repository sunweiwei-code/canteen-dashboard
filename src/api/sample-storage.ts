import { get } from './request'
import type { SampleStorageBlock, SampleStorageRecord } from '@/mock/data'

/**
 * 智慧存样 - 后端接口集合
 */
export interface SampleStorageSummary {
  /** 各日期存样状态，用于首页和弹窗左侧 */
  days: SampleStorageBlock[]
  /** 冰箱开门记录，用于弹窗右侧表格 */
  records: SampleStorageRecord[]
}

/**
 * GET /api/sample-storage/summary
 * 返回存样状态 + 开门记录
 */
export function getSampleStorageSummary(): Promise<SampleStorageSummary> {
  return get<SampleStorageSummary>('/sample-storage/summary')
}

/**
 * GET /api/sample-storage/days
 * 仅返回各日期存样状态
 */
export function getSampleStorageDays(): Promise<SampleStorageBlock[]> {
  return get<SampleStorageBlock[]>('/sample-storage/days')
}

/**
 * GET /api/sample-storage/records
 * 仅返回开门记录
 */
export function getSampleStorageRecords(): Promise<SampleStorageRecord[]> {
  return get<SampleStorageRecord[]>('/sample-storage/records')
}
