/**
 * Created By Nguyen Cong Thanh on 10/05/2019 10:40.
 *
 * Copyright Intelin 2019.
 */

import LoggerService from '../../../logger/logger.service'
import HelperService from '../../../helper/helper.service'
import MessageCode from '../../message/message.code'
import CacheLayout from '../../../cache/cache.layout'

class RegisterProcess {

  constructor() {
    if (!RegisterProcess.instance) {
      this.messageCode = MessageCode;
      this.logger = LoggerService
      this.helper = HelperService
      this.cacheLayout = CacheLayout
      RegisterProcess.instance = this
    }
    return RegisterProcess.instance
  }

  checkLicenseDuplicate(props) {
    this.logger.info('RegisterProcess excute checkLicenseDuplicate')
    try {
      const [response, state, setState] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(() => {
        state.timeout.setTimeout(false, 'identityNo', this.messageCode[response.code])
      }, 0)
    } catch (e) {
      this.logger.error(`RegisterProcess checkLicenseDuplicate ${e.toString()}`)
    }
  }

  checkLicense_4041(props) {
    this.logger.info('RegisterProcess excute checkLicense_4041')
    try {
      const [response, state, setState, otpRequired, handleSetView, view, match] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(() => {
        this.cacheLayout.set(match.url, state.model, view.main)
        handleSetView(view.new)
      }, 0)
    } catch (e) {
      this.logger.error(`RegisterProcess checkLicense_4041 ${e.toString()}`)
    }
  }

  updateUserAfterOtp(props) {
    this.logger.info('RegisterProcess excute updateUserAfterOtp')
    try {
      const [response, state, setState, handleResponseCode] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(() => {
        handleResponseCode()
      }, 0)
    } catch (e) {
      this.logger.error(`RegisterProcess updateUserAfterOtp ${e.toString()}`)
    }
  }

  duplicateUsername(props) {
    this.logger.info('RegisterProcess excute duplicateUsername')
    try {
      const [response, state, setState] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(() => {
        state.timeout.setTimeout(false, 'username', this.messageCode[response.code])
      }, 0)
    } catch (e) {
      this.logger.error(`RegisterProcess duplicateUsername ${e.toString()}`)
    }
  }

  meetingSchedule(props) {
    this.logger.info('RegisterProcess excute meetingSchedule')
    try {
      const [response, state, setState, handleResponseCode] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(() => {
       handleResponseCode()
      }, 0)
    } catch (e) {
      this.logger.error(`RegisterProcess meetingSchedule ${e.toString()}`)
    }
  }

  notOnlineBanking(props) {
    this.logger.info('RegisterProcess excute notOnlineBanking')
    try {
      const [response, state, setState, otpRequired, handleSetView, view, match] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(() => {
        state.data.set('fullName', response.data.cusName, state.data.fullName)
        state.data.set('phoneNumber', response.data.phone, state.data.phoneNumber)
        state.data.set('identityNo', response.data.license, state.data.identityNo)
        this.cacheLayout.set(match.url, {...state.data.getValueMain(),...state.data.getValueInputPhone()}, view.notOnlineBanking )
        handleSetView(view.notOnlineBanking)
      }, 0)
    } catch (e) {
      this.logger.error(`RegisterProcess notOnlineBanking ${e.toString()}`)
    }
  }
}

export default new RegisterProcess()
