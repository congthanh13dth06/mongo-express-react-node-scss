/**
 * Created By Nguyen Cong Thanh on 14/05/2019 09:24.
 *
 * Copyright Intelin 2019.
 */

import LoggerService from '../../../logger/logger.service'
import HelperService from '../../../helper/helper.service'
import MessageCode from '../../message/message.code'

class OtpProcess {

  constructor() {
    if (!OtpProcess.instance) {
      this.messageCode = MessageCode;
      this.logger = LoggerService
      this.helper = HelperService
      OtpProcess.instance = this
    }
    return OtpProcess.instance
  }

  otpRequired(props) {
    this.logger.info('OtpProcess excute otpRequired')
    try {
      const [response, state, setState, otpRequired] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(otpRequired, 0)
    } catch (e) {
      this.logger.error(`OtpProcess otpRequired ${e.toString()}`)
    }
  }

  otpSuccess(props){
    this.logger.info('OtpProcess excute otpSuccess')
    try {
      const [response, state, setState, otpSuccess] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(otpSuccess, 0)
    } catch (e) {
      this.logger.error(`OtpProcess otpSuccess ${e.toString()}`)
    }
  }

}

export default new OtpProcess()
