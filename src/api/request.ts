import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
})

request.interceptors.request.use(
  (config) => {
    // 后续可加 token、签名等统一处理
    return config
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 假设后端统一返回 { code: 200, data: any, msg: '' }
    const { data } = response
    if (data && data.code !== 200) {
      return Promise.reject(new Error(data.msg || '请求失败'))
    }
    return data.data
  },
  (error) => Promise.reject(error)
)

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return request.get(url, config)
}

export async function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return request.post(url, data, config)
}

export default request
