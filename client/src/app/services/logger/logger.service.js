/**
 * Created By Nguyen Cong Thanh on 11/04/2019 15:01.
 *
 * Copyright Intelin 2019.
 */

import EnvConfig from '../../../config/env.conf.json'

const getTime = () => {
  const date = new Date()
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`
}

class LoggerService {

  constructor() {
    if (!LoggerService.instance) {
      this.logs = EnvConfig[EnvConfig.CURRENT].LOG
      LoggerService.instance = this
    }
    return LoggerService.instance
  }

  info(content) {
    if (this.logs.includes('INFO')) {
      console.info(`[${getTime()}]-[INFO]: \n`, JSON.stringify(content, null, 2))
    }
  }

  debug(message, content) {
    if (this.logs.includes('DEBUG')) {
      console.debug(`[${getTime()}]-[DEBUG]: ${message} \n`, JSON.stringify(content, null, 3))
    }
  }

  trace(content) {
    if (this.logs.includes('TRACE')) {
      console.trace(`[${getTime()}]-[TRACE]: \n`, JSON.stringify(content, null, 2))
    }
  }

  warn(content) {
    if (this.logs.includes('WARN')) {
      console.warn(`[${getTime()}]-[WARN]: \n`, JSON.stringify(content, null, 2))
    }
  }

  error(content) {
    if (this.logs.includes('ERROR')) {
      console.error(`[${getTime()}]-[ERROR]: \n`, JSON.stringify(content, null, 2))
    }
  }

  log(content) {
    if (this.logs.includes('LOG')) {
      console.log(`[${getTime()}]-[LOG]: \n`, content)
    }
  }

  table(content) {
    if (this.logs.includes('TABLE')) {
      console.table(`[${getTime()}]-[TABLE]: \n`, content);
    }
  }
}

export default new LoggerService()
