/**
 * Created By Nguyen Cong Thanh on 13/05/2019 13:42.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import OtpHtml from '../../../ui/public/otp/otp.html'
import AppServices from '../../../app.services'
import OtpLocalize from './otp.localize'

export default class OtpComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      model: new AppServices.models.publicOtp().getValue(),
      data: new AppServices.models.publicOtp(),
      timeout: new AppServices.services.timeout(this.setState.bind(this), this.handleSendOtp.bind(this)),
      ref: {
        code: [],
        lineProcess: React.createRef(),
        funcLineProcess: null
      },
      config: AppServices.config.app.OTP.PUBLIC,
      ui: {
        idProgressBar: `#${AppServices.services.helper.generateKey()}`,
        isShowResendOtp: false
      }
    }

    this.handleCountDown = this.handleCountDown.bind(this)
    this.handleRefOtp = this.handleRefOtp.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnResendOTP = this.handleOnResendOTP.bind(this)
    this.handleSendOtp = this.handleSendOtp.bind(this)
    this.handleRefLineProcess = this.handleRefLineProcess.bind(this)
  }

  componentDidMount() {
    this.state.ref.code[0].focus();
    try {
      const {model} = this.state;
      const {publicOtpReducer,apiLink} = this.props;
      model.timeCodeExpire = publicOtpReducer.timeCodeExpire
      model.contact = publicOtpReducer.contact
      model.length = publicOtpReducer.length
      model.otpKey = publicOtpReducer.otpKey
      model.isEmail = publicOtpReducer.isEmail
      model.apiLink = apiLink
      this.setState({
        model: model
      })
    } catch (e) {
      AppServices.services.logger.error(`OtpComponent componentDidMount ${e.toString()}`)
    }
  }

  componentDidUpdate() {
    this.state.ref.code[this.state.ref.code.length - 1].focus()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    AppServices.services.logger.info('OtpComponent excute UNSAFE_componentWillReceiveProps')
    try {
      const response = nextProps.messageCenterReducer
      if (this.props.messageCenterReducer !== nextProps.messageCenterReducer
        && response.key === this.state.timeout.key) {
        AppServices.services.logger.info(`OtpComponent excute componentWillReceiveProps`)
        AppServices.services.logger.debug(`Receive response`, response)
        AppServices.code.process.checkCode(response, this.state, this.setState.bind(this), this.props.handleOnSuccess)
        this.state.timeout.setTimeout(false)
      }
    } catch (e) {
      AppServices.services.logger.error(`OtpComponent componentWillReceiveProps ${e.toString()}`)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.ref.funcLineProcess)
  }

  handleRefOtp(key, input) {
    this.state.ref.code[key] = React.createRef()
    this.state.ref.code[key] = input
  }

  handleRefLineProcess(element) {
    this.state.ref.lineProcess = element
    this.handleCountDown()
  }

  handleCountDown() {
    AppServices.services.logger.info('OtpComponent excute handleCountDown')
    try {
      const { lineProcess } = this.state.ref;
      if (lineProcess) {
        lineProcess.style.width = "0%";
        lineProcess.style.transitionDuration = `0s`
        this.setState((prevState) => ({
          ui: {
            ...prevState.ui,
            isShowResendOtp: false
          }
        }))
        setTimeout(() => {
          lineProcess.style.width = "100%";
          lineProcess.style.transitionDuration = `${this.state.config.TIME_SHOW_RESEND / 1000}s`
          this.state.ref.funcLineProcess = setTimeout(() => {
            this.setState((prevState) => ({
              ui: {
                ...prevState.ui,
                isShowResendOtp: true
              }
            }))
          }, this.state.config.TIME_SHOW_RESEND)
        }, 5)
      }
    } catch (e) {
      AppServices.services.logger.error(`OtpComponent handleCountDown ${e.toString()}`)
    }
  }

  handleOnChange(event) {
    AppServices.services.logger.info('OtpComponent excute handleOnResendOTP')
    AppServices.services.logger.debug('Receive Code', event.target.value)
    try {
      const { timeout, model } = this.state
      timeout.status = false;
      timeout.field = '';
      timeout.message = '';
      this.setState((preState) => ({
        timeout: timeout,
      }))
      model.code = event.target.value
      if (model.code.length === model.length) {
        timeout.setTimeout()

      }
    } catch (e) {
      AppServices.services.logger.error(`OtpComponent handleOnChange ${e.toString()}`)
      this.state.timeout.setTimeout(false, e.key, e.message)
    }
  }

  handleSendOtp(){
    AppServices.services.logger.info('OtpComponent excute handleSendOtp')
    try {
      const { model, data, timeout } = this.state

      data.set('otpKey', model.otpKey, data.otpKey)
      data.set('code', model.code, data.code)
      data.set('apiLink', model.apiLink, data.apiLink)
      AppServices.services.logger.debug('Data', data.getValueRequestOTP())
      this.props.send(timeout.key, data.getValueRequestOTP())
    } catch (e) {
      AppServices.services.logger.error(`OtpComponent handleSendOtp`)
      AppServices.services.logger.error(`Field ${e.field} Message ${e.message}`)
      this.state.timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnResendOTP(event) {
    AppServices.services.logger.info('OtpComponent excute handleOnResendOTP')
    try {
      event.preventDefault()
      this.handleCountDown()
      this.props.resend('Otp Key')
    } catch (e) {
      AppServices.services.logger.error(`OtpComponent handleOnResendOTP ${e.toString()}`)
    }
  }

  render() {

    const { handleOnClose, handleOnSuccess } = this.props
    const { model } = this.state

    return (
      <OtpHtml
        timeout={this.state.timeout}
        config={this.state.config}
        ui={this.state.ui}
        handleOnClose={handleOnClose}
        handleOnChange={this.handleOnChange}
        handleOnResendOTP={this.handleOnResendOTP}
        refInput={this.handleRefOtp}
        handleRefLineProcess={this.handleRefLineProcess}
        model={model}
       />
    )
  }

}
