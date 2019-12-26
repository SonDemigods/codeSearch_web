import { api } from './index'

// 获取番号列表
export const getList = (page = 1, pageSize = 10, keyword = '') => {
  let url = `info?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
  return api.get(url)
}
