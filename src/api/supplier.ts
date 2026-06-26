import { get } from './request'
import type { SupplierTableItem } from '@/mock/data'

/**
 * 食材采购 - 后端接口集合
 */

/**
 * GET /api/supplier/list
 * 返回供应商列表，用于首页表格和弹窗明细
 */
export function getSupplierList(): Promise<SupplierTableItem[]> {
  return get<SupplierTableItem[]>('/supplier/list')
}
