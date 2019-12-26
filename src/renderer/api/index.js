import HttpRequest from './core'
import config from '../config'

export const api = new HttpRequest(config.baseUrl)
