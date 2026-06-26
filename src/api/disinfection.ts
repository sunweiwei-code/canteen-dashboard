import { get } from './request'
import type { DisinfectionRecord } from '@/mock/data'

/**
 * 智慧消毒 - 后端接口集合
 */
export interface DisinfectionSummary {
  /** 已消毒食堂 / 总食堂，如 25/28 */
  disinfectedCanteens: string
  /** 消毒时长，如 30 min */
  duration: string
  /** 消毒记录，用于首页表格和弹窗 */
  records: DisinfectionRecord[]
}

/**
 * GET /api/disinfection/summary
 * 返回消毒指标 + 消毒记录
 */
export function getDisinfectionSummary(): Promise<DisinfectionSummary> {
  return get<DisinfectionSummary>('/disinfection/summary')
}
