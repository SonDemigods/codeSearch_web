import { api } from './index'

// 获取番号列表
export const getInfoList = (page = 1, pageSize = 10, keyword = '') => {
  let url = `info?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
  return api.get(url)
}

// 根据id获取番号信息
export const getInfoById = (id) => {
  let url = `info/${id}`
  return api.get(url)
}

// 新增番号信息
export const createInfo = (info) => {
  let url = 'info'
  let data = {...info}
  return api.post(url, data)
}

// 更新番号信息
export const updateInfo = (info) => {
  let url = 'info'
  let data = {...info}
  return api.put(url, data)
}

// 根据id删除番号信息
export const deleteInfo = (id) => {
  let url = 'info'
  let data = {id}
  return api.delete(url, data)
}
