import { get } from './request'
import type { PriceChartPoint, FoodPriceDetailItem } from '@/mock/data'

/**
 * 菜价公示 - 后端接口集合
 */
export interface FoodPriceSummary {
  /** 近7天菜价折线数据 */
  chart: PriceChartPoint[]
  /** 最新菜品明细，用于表格和弹窗 */
  detail: FoodPriceDetailItem[]
}

/**
 * GET /api/food-price/summary
 * 返回折线图数据 + 菜品明细
 */
export function getFoodPriceSummary(): Promise<FoodPriceSummary> {
  return get<FoodPriceSummary>('/food-price/summary')
}

/**
 * GET /api/food-price/chart
 * 仅返回折线图数据
 */
export function getFoodPriceChart(): Promise<PriceChartPoint[]> {
  return get<PriceChartPoint[]>('/food-price/chart')
}

/**
 * GET /api/food-price/detail
 * 仅返回菜品明细
 */
export function getFoodPriceDetail(): Promise<FoodPriceDetailItem[]> {
  return get<FoodPriceDetailItem[]>('/food-price/detail')
}
