import { get } from './request'
import type { LedgerRecord } from '@/mock/data'

/**
 * 智慧台账 - 后端接口集合
 */

/**
 * GET /api/ledger/records
 * 返回台账记录列表
 */
export function getLedgerRecords(): Promise<LedgerRecord[]> {
  return get<LedgerRecord[]>('/ledger/records')
}
