import {
  Message
} from 'view-design'
import axios from 'axios'
import qs from 'qs'

class HttpRequest {
  constructor (baseUrl = 'http:127.0.0.1:8080') {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      withCredentials: true
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url)
        const {
          data,
          status
        } = res
        return {
          data,
          status
        }
      },
      error => {
        let _error = JSON.parse(JSON.stringify(error))
        let msg = ''
        switch (_error.request.status) {
          case 400:
            msg = '请求错误'
            break

          case 401:
            msg = '未授权，请登录'
            break

          case 403:
            msg = '拒绝访问'
            break

          case 404:
            msg = `请求地址出错: ${_error.config.url}`
            break

          case 408:
            msg = '请求超时'
            break

          case 500:
            msg = '服务器内部错误'
            break

          case 501:
            msg = '服务未实现'
            break

          case 502:
            msg = '网关错误'
            break

          case 503:
            msg = '服务不可用'
            break

          case 504:
            msg = '网关超时'
            break

          case 505:
            msg = 'HTTP版本不受支持'
            break

          // case 0:
          //   msg = '跨域测试错误'
          //   break

          default:
            msg = '未知错误'
        }
        Message.error(msg)
        this.destroy(url)
        return Promise.reject(error)
      }
    )
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
  get (url) {
    const config = {
      url,
      method: 'get'
    }
    return this.request(config)
  }
  post (url, data) {
    const _data = qs.stringify(data, {
      arrayFormat: 'repeat'
    })
    const config = {
      url,
      data: _data,
      method: 'post'
    }
    return this.request(config)
  }
  put (url, data) {
    const _data = qs.stringify(data, {
      arrayFormat: 'repeat'
    })
    const config = {
      url,
      data: _data,
      method: 'put'
    }
    return this.request(config)
  }
  delete (url, data) {
    const _data = qs.stringify(data, {
      arrayFormat: 'repeat'
    })
    const config = {
      url,
      data: _data,
      method: 'delete'
    }
    return this.request(config)
  }
}

export default HttpRequest
