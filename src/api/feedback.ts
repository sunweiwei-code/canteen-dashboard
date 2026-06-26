import { get } from './request'
import type { FeedbackItem } from '@/mock/data'

/**
 * 意见反馈 - 后端接口集合
 */

/**
 * GET /api/feedback/list
 * 返回意见反馈列表，用于首页联系人卡片和弹窗表格
 */
export function getFeedbackList(): Promise<FeedbackItem[]> {
  return get<FeedbackItem[]>('/feedback/list')
}

/**
 * GET /api/feedback/qrcode
 * 返回反馈二维码图片地址或 Base64 字符串
 */
export function getFeedbackQrCode(): Promise<string> {
  return get<string>('/feedback/qrcode')
}
