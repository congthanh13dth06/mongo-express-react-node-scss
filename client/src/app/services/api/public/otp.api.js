/**
 * Created By Nguyen Cong Thanh on 09/05/2019 11:26.
 *
 * Copyright Intelin 2019.
 */

import BaseApiService from '../base.api'

class OtpApiService extends BaseApiService {

  constructor() {
    if (!OtpApiService.instance) {
      super();
      OtpApiService.instance = this
    }
    return OtpApiService.instance
  }

  send = function* getAll(payload) {
    this.logger.info('OtpApiService excute send')
    this.logger.debug('Receive payload', payload)
    try {
      const apiLink =  payload.apiLink
      delete payload['apiLink']
      const options = {
        method: 'put',
        headers: {
          'content-type': 'application/json'
        },
        data: payload,
        url:apiLink
      }
      return yield this.request(options)
        .then((this.response.bind(this)))
    } catch (e) {
      this.logger.error(`OtpApiService send ${e.toString()}`)
      return null
    }
  }

  // responseCheckUsername = (response) => {
  //   this.logger.info('OtpApiService excute responseCheckUsername')
  //   this.logger.debug('Receive response', response)
  //   try {
  //     this.validatorCommonResponse.common(response)
  //     return response.data
  //   } catch (e) {
  //     this.logger.error(`OtpApiService responseCheckUsername ${e.message.toString()}`)
  //     return null
  //   }
  // }

}

export default new OtpApiService()
