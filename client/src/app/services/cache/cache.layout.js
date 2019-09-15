/**
 * Created By Nguyen Cong Thanh on 10/05/2019 10:28.
 *
 * Copyright Intelin 2019.
 */

import LoggerService from '../logger/logger.service'

class CacheLayout {

  constructor() {
    if (!CacheLayout.instance) {
      this.logger = LoggerService
      this.cache = new Map([])
      CacheLayout.instance = this
    }
    return CacheLayout.instance
  }

  get(route, ...view) {
    this.logger.info('CacheLayout excute get')
    this.logger.debug('Route', route)
    this.logger.debug('Views', view)
    if (this.cache.has(route)) {
      const temp = this.cache.get(route)
      this.logger.debug('Data', temp)
      temp.data = new Map(temp.data)
      return (temp.data.has(view.join('-'))) ? temp.data.get(view.join('-')) : null;
    }
    return null
  }

  set(route, data, ...view) {
    this.logger.info('CacheLayout excute set')
    this.logger.debug('Route', route)
    this.logger.debug('Data', data)
    this.logger.debug('Views', view)
    const value = {
      view: view.join('-'),
      data: new Map([])
    };
    if (this.cache.has(route)) {
      const temp = this.cache.get(route)
      value.data = new Map(temp.data)
    }
    value.data.set(value.view, data)
    this.cache.set(route, value)
  }

  delete(key) {
    this.cache.delete(key)
  }

  clear() {
    this.cache = new Map([])
  }

}

export default new CacheLayout()
