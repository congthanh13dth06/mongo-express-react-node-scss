/**
 * Created By Nguyen Cong Thanh on 10/05/2019 10:40.
 *
 * Copyright Intelin 2019.
 */

import LoggerService from '../../../logger/logger.service'
import HelperService from '../../../helper/helper.service'
import MessageCode from '../../message/message.code'
import CacheLayout from '../../../cache/cache.layout'

class LoginProcess {

  constructor() {
    if (!LoginProcess.instance) {
      this.messageCode = MessageCode;
      this.logger = LoggerService
      this.helper = HelperService
      this.cacheLayout = CacheLayout
      LoginProcess.instance = this
    }
    return LoginProcess.instance
  }

  // accountLocked(props) {
  //   this.logger.info('LoginProcess excute accountLocked')
  //   try {
  //     const [response, state, setState] = props;
  //     this.logger.debug('Receive response', response)
  //     this.logger.debug('Receive response code message', this.messageCode[response.code])
  //     setState((prevState) => ({
  //       ui: {
  //         ...prevState.ui,
  //         isShowAccountLocked: true
  //       }
  //     }), () => {
  //       setTimeout(() => {
  //         state.timeout.setTimeout(false)
  //       }, 0)
  //     })
  //   } catch (e) {
  //     this.logger.error(`LoginProcess accountLocked ${e.toString()}`)
  //   }
  // }

  checkUsernameNotExist(props) {
    this.logger.info('LoginProcess excute checkUsernameNotExist')
    try {
      const [response, state, setState] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(() => {
        state.timeout.setTimeout(false, 'username', this.messageCode[response.code])
        state.ref.username.focus()
      }, 0)
    } catch (e) {
      this.logger.error(`LoginProcess checkUsernameNotExist ${e.toString()}`)
    }
  }

  checkUsernameSuccess(props) {
    this.logger.info('LoginProcess excute checkUsernameSuccess')
    try {
      const [response, state, setState, handleSetView, view, match] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      state.data.set('username', response.data.username, state.data.username)
      state.data.set('token', response.data.token, state.data.token)
      setTimeout(() => {
        this.cacheLayout.set(match.url, {...state.data.getValueUsername(), ...state.data.getValueToken()}, view.username)
        handleSetView(view.password)
      }, 0)
    } catch (e) {
      this.logger.error(`LoginProcess checkUsernameSuccess ${e.toString()}`)
    }
  }

  checkPasswordIncorrect(props) {
    this.logger.info('LoginProcess excute checkPasswordIncorrect')
    try {
      const [response, state, setState] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
      setTimeout(() => {
        state.timeout.setTimeout(false, 'password', this.messageCode[response.code])
        state.ref.password.focus()
      }, 0)
    } catch (e) {
      this.logger.error(`LoginProcess checkPasswordIncorrect ${e.toString()}`)
    }
  }

  checkPasswordSuccess(props) {
    this.logger.info('LoginProcess excute checkPasswordSuccess')
    try {
      const [response, state, setState] = props;
      this.logger.debug('Receive response', response)
      this.logger.debug('Receive response code message', this.messageCode[response.code])
    } catch (e) {
      this.logger.error(`LoginProcess checkPasswordSuccess ${e.toString()}`)
    }
  }

}

export default new LoginProcess()
