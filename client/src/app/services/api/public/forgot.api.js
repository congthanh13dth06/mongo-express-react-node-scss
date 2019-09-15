/**
 * Created By Nguyen Cong Thanh on 17/05/2019 10:15.
 *
 * Copyright Intelin 2019.
 */

import BaseApiService from '../base.api'

class ForgotApiService extends BaseApiService {

  constructor() {
    if (!ForgotApiService.instance) {
      super();
      ForgotApiService.instance = this
    }
    return ForgotApiService.instance
  }

  sendInfo = function* getAll(payload) {
    this.logger.info('ForgotApiService excute sendInfo')
    this.logger.debug('Receive payload', payload)
    try {
      const options = {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        data: payload,
        url: this.apiConstant.USER.FORGOT
      }
      return yield this.request(options)
        .then((this.response.bind(this)))
    } catch (e) {
      this.logger.error(`ForgotApiService sendInfo ${e.toString()}`)
      return null
    }
  }

  sendPassword = function* getAll(payload) {
    this.logger.info('ForgotApiService excute sendPassword')
    this.logger.debug('Receive payload', payload)
    try {
      const options = {
        method: 'put',
        headers: {
          'content-type': 'application/json'  
        },
        data: payload,
        url: this.apiConstant.USER.UPDATE_PASSWORD
      }
      return yield this.request(options)
        .then((this.response.bind(this)))
    } catch (e) {
      this.logger.error(`ForgotApiService sendPassword ${e.toString()}`)
      return null
    }
  }

  getUsername = function* getAll(payload) {
    this.logger.info('ForgotApiService excute getUsername')
    this.logger.debug('Receive payload', payload)
    try {
      const options = {
        method: 'get',
        headers: {
          'content-type': 'application/json'  
        },
        url: `${this.apiConstant.USER.FORGOT}/${payload.refKey}`
      }
      return yield this.request(options)
        .then((this.response.bind(this)))
    } catch (e) {
      this.logger.error(`ForgotApiService getUsername ${e.toString()}`)
      return null
    }
  }


}

export default new ForgotApiService()
