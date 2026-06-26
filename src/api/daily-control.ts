import { get } from './request'
import type { DailyControlInfo, DailyControlRecord, DailyControlCheckItem } from '@/mock/data'

/**
 * 日管控 - 后端接口集合
 */
export interface DailyControlSummary {
  /** 日管控概览：日期 + 完成状态 */
  info: DailyControlInfo
  /** 日管控卡片记录，用于弹窗 */
  records: DailyControlRecord[]
  /** 日管控检查明细 */
  checks: DailyControlCheckItem[]
}

/**
 * GET /api/daily-control/summary
 * 返回日管控概览 + 卡片记录 + 检查明细
 */
export function getDailyControlSummary(): Promise<DailyControlSummary> {
  return get<DailyControlSummary>('/daily-control/summary')
}

/**
 * GET /api/daily-control/info
 * 仅返回日管控概览（日期 + 状态）
 */
export function getDailyControlInfo(): Promise<DailyControlInfo> {
  return get<DailyControlInfo>('/daily-control/info')
}

/**
 * GET /api/daily-control/records
 * 仅返回日管控卡片记录
 */
export function getDailyControlRecords(): Promise<DailyControlRecord[]> {
  return get<DailyControlRecord[]>('/daily-control/records')
}

/**
 * GET /api/daily-control/checks
 * 仅返回日管控检查明细
 */
export function getDailyControlChecks(): Promise<DailyControlCheckItem[]> {
  return get<DailyControlCheckItem[]>('/daily-control/checks')
}
