/**
 * Created By Nguyen Cong Thanh on 18/04/2019 10:55.
 *
 * Copyright Intelin 2019.
 */

import VertxEventbus from 'vertx3-eventbus-client'

import Config from '../../../config/app.conf.json'
import LoggerService from '../logger/logger.service'

class VertxService {

  constructor() {
    if (!VertxService.instance) {
      this.vertx = null
      this.logger = LoggerService
      VertxService.instance = this
    }
    return this.VertxService
  }

  connect() {
    try {
      this.vertx = new VertxEventbus(Config.ENV[Config.APP.ENV].VERTX, {"vertxbus_ping_interval": 10000})
      this.vertx.enableReconnect(true)
      this.vertx.onopen = () => {
        this.logger.info('Vertx on open')
        // this.logger.log(this.vertx)
        this.vertx.registerHandler('doannh.bbbb', (error, message) => {
          if (error) {
            this.logger.error(`Receive message channel doannh ${error.toString()}`)
          } else {
            this.logger.info('Receive message Vertx Event Bus channel doannh.bbbb')
            this.logger.debug('Message', message)
          }
        });
      }

      this.vertx.onerror = (event) => {
        this.logger.error(`Vertx on error: ${JSON.stringify(event)}`)
      }

      this.vertx.onclose = (event) => {
        this.logger.warn(`Vertx on close ${JSON.stringify(event)}`)
      }

    } catch (e) {
      this.logger.error(`Vertx connect error: ${e.toString()}`)
    }
  }

  send(channel, content) {
    try {
      if (!this.vertx) {
        throw new Error('vertx not connect')
      }
      this.vertx.send(channel, content)
    } catch (e) {
      this.logger.error(`Vertx send data error: ${e.toString()}`)
    }
  }

  close() {
    try {
      this.vertx.close()
      this.vertx = null;
    } catch (e) {
      this.logger.error(`Vertx close error: ${e.toString()}`)
    }
  }

}

export default new VertxService()
