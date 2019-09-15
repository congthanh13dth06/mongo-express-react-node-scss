/**
 * Created By Nguyen Cong Thanh on 10/09/2019 14:11.
 *
 * Copyright Intelin 2019.
 */

'use strict'

class LoggerService {

  constructor() {
    if (!LoggerService.instance) {

      LoggerService.instance = this
    }
    return LoggerService.instance
  }

}

export default new LoggerService();
