/**
 * Created By Nguyen Cong Thanh on 09/04/2019 17:27.
 *
 * Copyright Intelin 2019.
 */

import AppConfig from '../../../config/app.conf.json'
import LoggerService from '../logger/logger.service'
import HelperService from '../helper/helper.service'
import LocalizeKey from '../constants/localize'

export default class TimeoutService {

  constructor(setState, callback = () => {}) {
    this.key = '';
    this.status = false;
    this.field = '';
    this.message = '';
    this.timeout = null;
    this.setState = setState;
    this.callback = callback;

    this.setTimeout = this.setTimeout.bind(this)
  }

  setTimeout(status = true, field = '', message = '') {
    LoggerService.info('TimeoutService excute setTimeout')
    try {
      this.setState((prevState) => ({
        timeout: {
          ...prevState.timeout,
          key: (status) ? HelperService.generateKey() : '',
          status: status,
          field: field,
          message: message,
          setTimeout: prevState.timeout.setTimeout.bind(this)
        }
      }), (status) ? this.callback : () => {})
      clearTimeout(this.timeout)
      if (status) {
        this.timeout = setTimeout(() => {
          this.setTimeout(false, 'all', LocalizeKey.COMMON_SYSTEM_BUSY)
        }, AppConfig.REQUEST_TIMEOUT)
      }
    } catch (e) {
      LoggerService.error(e.toString())
    }
  }

}
