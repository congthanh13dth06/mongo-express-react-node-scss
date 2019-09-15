/**
 * Created By Nguyen Cong Thanh on 09/05/2019 11:26.
 *
 * Copyright Intelin 2019.
 */

import BaseApiService from '../base.api'

class LoginApiService extends BaseApiService {

  constructor() {
    if (!LoginApiService.instance) {
      super();
      LoginApiService.instance = this
    }
    return LoginApiService.instance
  }

  checkUsername = function* checkUsername(payload) {
    this.logger.info('LoginApiService excute checkUsername')
    this.logger.debug('Receive payload', payload)
    try {
      // this.logger.log({
      //   "Browser CodeName": navigator.appCodeName,
      //   "Browser Name": navigator.appName,
      //   "Browser Version": navigator.appVersion,
      //   "Browser Enabled": navigator.cookieEnabled,
      //   "Browser Language": navigator.language,
      //   "Browser Online": navigator.onLine,
      //   "Platform": navigator.platform,
      //   "User-agent": navigator.userAgent,
      // })
      const options = {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'device-info': 'Linux:x86_64:Chrome:74:Unknown',
          'device-ip-address': '162.158.217.8',
          'app-version': `${this.config.VERSION}:WebUser`,
          'push-key': ''
        },
        data: payload,
        url: this.apiConstant.USER.AUTH
      }
      return yield this.request(options)
        .then((this.response.bind(this)))
    } catch (e) {
      this.logger.error(`LoginApiService checkUsername ${e.toString()}`)
      return null
    }
  }

  checkPassword = function* checkPassword(payload, collationId) {
    this.logger.info('LoginApiService excute checkPassword')
    this.logger.debug('Receive payload', payload)
    try {
      const token = payload.token
      delete payload['token']
      payload.password = "eOItdkLUath2SVp+CsmEkz4mywIusDm/hODY9J1yedZLUK3P/6DIeEv35XvoKDvFv5rjTE5kK/drouNjYQwoBnVP/qgwQBvL6LjyRFeqBejKnz6n7BR8GrzSxKdDdukdc4OjquEAkhUsoMGadcNmWwmIMGG+rI8NsRh9mdDxy1rLKq9AtEzNG9hYvLip9FQ8mBxbyia+h4XUp0iPPrfoemX1Svs9grwhx0u1/A9bGFb0pWLliDBMb7IPvhyyzTusFsUu6wAlblakCylhJ0Ox4FGK+GXcLQN+lFjnHBojyawLiy4FQEWWed94jxP1/0u5Wg8l1+1qYpIuAEvmDa/w1g=="
      const options = {
        method: 'put',
        headers: {
          'content-type': 'application/json',
          'token': token,
          'collation-id': collationId
        },
        data: payload,
        url: this.apiConstant.USER.AUTH
      }
      return yield this.request(options)
        .then((this.response.bind(this)))
    } catch (e) {
      this.logger.error(`LoginApiService checkPassword ${e.toString()}`)
      return null
    }
  }

  trustDevice = function* trustDevice(payload) {
    this.logger.info('LoginApiService excute trustDevice')
    this.logger.debug('Receive payload', payload)
    try {
      const options = {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        data: undefined,
        url: this.apiConstant.USER.DEVICE
      }
      return yield this.request(options)
        .then((this.response.bind(this)))
    } catch (e) {
      this.logger.error(`LoginApiService trustDevice ${e.toString()}`)
      return null
    }
  }

}

export default new LoginApiService()
