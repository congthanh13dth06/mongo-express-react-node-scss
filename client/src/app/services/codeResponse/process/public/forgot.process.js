/**
 * Created By Nguyen Cong Thanh on 17/05/2019 15:24.
 *
 * Copyright Intelin 2019.
 */


import LoggerService from '../../../logger/logger.service'
import HelperService from '../../../helper/helper.service'
import MessageCode from '../../message/message.code'

class ForgotProcess {

  constructor() {
    if (!ForgotProcess.instance) {
      this.messageCode = MessageCode;
      this.logger = LoggerService
      this.helper = HelperService
      ForgotProcess.instance = this
    }
    return ForgotProcess.instance
  }

  sendInfoSuccess(props) {
    this.logger.info('ForgotProcess excute sendInfoSuccess')
    try {
      const [response, state, setState, view, handleSetView] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      this.logger.debug('props', view)
      setTimeout(() => {
        // this.cacheLayout.set(this.cacheEnum.REGISTER_MAIN,state.model)
        // handleSetView(view.otp)
      }, 0)

    } catch (e) {
      this.logger.error(`ForgotProcess sendInfoSuccess ${e.toString()}`)
    }
  }
   

  responseUserNotFound(props){
    this.logger.info('ForgotProcess excute responseUserNotFound')
    try {
      const [response, state, setState, view, handleSetView] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(() => {
        state.timeout.setTimeout(false, "all", this.messageCode[response.code]) 
      }, 0)
    } catch (e) {
      this.logger.error(`ForgotProcess responseUserNotFound ${e.toString()}`)
      
    }
  }

  updatePasswordFailed(props){
    this.logger.info('ForgotProcess excute updatePasswordFailed')
    try {
      const [response, state, setState, view, handleSetView] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(() => {
        state.timeout.setTimeout(false, "all", this.messageCode[response.code]) 
      }, 0)
    } catch (e) {
      this.logger.error(`ForgotProcess updatePasswordFailed ${e.toString()}`)
      
    }
  }

  forgotPasswordSendSuccess(props){
    this.logger.info('ForgotProcess excute forgotPasswordSendSuccess')
    try {
      const [response, state, setState, view, handleSetView] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(() => {
        // state.timeout.setTimeout(false, "all", this.messageCode[response.code]) 
        handleSetView()
      }, 0)
    } catch (e) {
      this.logger.error(`ForgotProcess forgotPasswordSendSuccess ${e.toString()}`)
      
    }
  }
  
  getUsername(props){
    this.logger.info('ForgotProcess excute getUsername')
    try {
      const [response, state, setState, handleResponseCodeGetUsername] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(() => {
        handleResponseCodeGetUsername(response.data)
        state.timeout.setTimeout(false) 
      }, 0)
    } catch (e) {
      this.logger.error(`ForgotProcess getUsername ${e.toString()}`)
      
    }
  }
}

export default new ForgotProcess()

