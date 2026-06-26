import { get } from './request'
import type { AcceptanceRecord } from '@/mock/data'

/**
 * 食材验收 - 后端接口集合
 */

/**
 * GET /api/acceptance/records
 * 返回食材验收记录，用于首页表格和弹窗明细
 */
export function getAcceptanceRecords(): Promise<AcceptanceRecord[]> {
  return get<AcceptanceRecord[]>('/acceptance/records')
}
