
import BaseApiService from '../base.api'

class RegisterApiService extends BaseApiService {

  constructor() {
    if (!RegisterApiService.instance) {
      super();
      RegisterApiService.instance = this
    }
    return RegisterApiService.instance
  }

  checkLicense = function* getAll(payload) {
    this.logger.info('RegisterApiService excute checkLicense')
    this.logger.debug('Receive payload', payload)
    try {
      const options = {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        data: payload,
        url: this.apiConstant.USER.REGISTERED
      }
      return yield this.request(options)
        .then((this.response.bind(this)))
    } catch (e) {
      this.logger.error(`RegisterApiService checkLicense ${e.toString()}`)
      return null
    }
  }


  sendPhone = function* getAll(payload) {
    this.logger.info('RegisterApiService excute sendPhone')
    this.logger.debug('Receive payload', payload)
    try {
      const options = {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        data: payload,
        url: this.apiConstant.USER.REGISTER
      }
      return yield this.request(options)
        .then((this.response.bind(this)))
    } catch (e) {
      this.logger.error(`RegisterApiService sendPhone ${e.toString()}`)
      return null
    }
  }

  sendAccount = function* getAll(payload) {
    this.logger.info('RegisterApiService excute sendAccount')
    this.logger.debug('Receive payload', payload)
    try {
      const options = {
        method: 'put',
        headers: {
          'content-type': 'application/json'
        },
        data: payload,
        url: this.apiConstant.USER.REGISTER
      }
      return yield this.request(options)
        .then((this.response.bind(this)))
    } catch (e) {
      this.logger.error(`RegisterApiService sendAccount ${e.toString()}`)
      return null
    }
  }

  sendSchedule = function* getAll(payload) {
    this.logger.info('RegisterApiService excute sendSchedule')
    this.logger.debug('Receive payload', payload)
    try {
      const options = {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        data: payload,
        url: this.apiConstant.USER.REGISTER_SCHEDULE
      }
      return yield this.request(options)
        .then((this.response.bind(this)))
    } catch (e) {
      this.logger.error(`RegisterApiService sendSchedule ${e.toString()}`)
      return null
    }
  }
}

export default new RegisterApiService()
