import { get } from './request'
import type { SnapshotCategory, SnapshotRecord } from '@/mock/data'

/**
 * 智慧抓拍 - 后端接口集合
 */
export interface SnapshotSummary {
  /** 抓拍监控分类，用于首页卡片 */
  categories: SnapshotCategory[]
  /** 抓拍记录，用于弹窗表格 */
  records: SnapshotRecord[]
}

/**
 * GET /api/snapshot/summary
 * 返回抓拍分类 + 抓拍记录
 */
export function getSnapshotSummary(): Promise<SnapshotSummary> {
  return get<SnapshotSummary>('/snapshot/summary')
}

/**
 * GET /api/snapshot/categories
 * 仅返回抓拍监控分类
 */
export function getSnapshotCategories(): Promise<SnapshotCategory[]> {
  return get<SnapshotCategory[]>('/snapshot/categories')
}

/**
 * GET /api/snapshot/records
 * 仅返回抓拍记录
 */
export function getSnapshotRecords(): Promise<SnapshotRecord[]> {
  return get<SnapshotRecord[]>('/snapshot/records')
}
