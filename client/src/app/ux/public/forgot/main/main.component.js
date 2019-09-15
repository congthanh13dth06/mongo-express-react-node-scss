/**
 * Created By Nguyen Cong Thanh on 15/05/2019 16:45.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import ForgotMainHtml from '../../../../ui/public/forgot/main/main.html'
import AppServices from '../../../../app.services'

export default class ForgotMainComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      model: new AppServices.models.forgot().getValueMain(),
      data: new AppServices.models.forgot(),
      timeout: new AppServices.services.timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        lineProcess: React.createRef(),
      },
      ui: {
        list: AppServices.enums.forgot.IDENTITY_DOCUMENT,
        current: AppServices.enums.forgot.IDENTITY_DOCUMENT[0],
        isShowBtn: true
      }
    }

    // console.log(this.state)
    this.handleRefLineProcress = this.handleRefLineProcress.bind(this)
    this.handleProcess = this.handleProcess.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.handleRequest = this.handleRequest.bind(this)
    this.otpRequired = this.otpRequired.bind(this)
  }

  componentDidMount() {
    this.state.model.identityDocument = this.state.ui.current.value;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    AppServices.services.logger.info('ForgotMainComponent excute UNSAFE_componentWillReceiveProps')
    try {
      const response = nextProps.messageCenterReducer
      if (this.props.messageCenterReducer !== nextProps.messageCenterReducer
        && response.key === this.state.timeout.key) {
        AppServices.services.logger.info(`ForgotMainComponent excute componentWillReceiveProps`)
        AppServices.services.logger.debug(`Receive response`, response)
        const { view, handleSetView } = this.props;
        AppServices.code.process.checkCode(response, this.state, this.setState.bind(this), this.otpRequired)
        this.state.timeout.setTimeout(false)
        this.handleProcess(false)
      }
    } catch (e) {
      AppServices.services.logger.error(`ForgotMainComponent componentWillReceiveProps ${e.toString()}`)
    }
  }


  otpRequired(){
    try {
      const {view,match,viewNew, handleSetView} = this.props;
      const {model} = this.state;

      // AppServices.services.cacheLayout.set(match.url, model, view.new, viewNew.inputPhone)
      handleSetView(view.otp)
    } catch (e) {
      AppServices.services.logger.error(`ForgotComponent otpRequired ${e.toString()}`)
    }
  }


  handleRefLineProcress(element) {
    if (element) {
      this.state.ref.lineProcess = element;
      this.state.ref.lineProcess.style.display = 'none'
    }
  }

  handleProcess(status = true) {
    AppServices.services.logger.info('ForgotMainComponent excute handleProcess')
    try {
      this.state.ref.lineProcess.style.display = 'none'
      this.state.ref.lineProcess.style.width = '0%';
      this.state.ref.lineProcess.style.transitionDuration = '0s'
      if (status) {
        this.state.ref.lineProcess.style.display = 'block'
        setTimeout(() => {
          this.state.ref.lineProcess.style.width = "100%";
          this.state.ref.lineProcess.style.transitionDuration = `${AppServices.config.app.REQUEST_TIMEOUT / 1000}s`
        }, 0)
      }
    } catch (e) {
      AppServices.services.logger.error(`ForgotMainComponent handleProcess ${e.toString()}`)
    }
  }

  handleRedirect(event, state) {
    AppServices.services.logger.info('ForgotMainComponent excute handleRedirect')
    AppServices.services.logger.debug('State', state)
    try {
      if (event) event.preventDefault();
      const { history } = this.props;
      history.push(state)
    } catch (e) {
      AppServices.services.logger.error(`ForgotMainComponent handleRedirect ${e.toString()}`)
    }
  }

  handleOnChange(event) {
    const { value, name } = event.target;
    const { model, data, timeout, ui } = this.state;
    model[name] = value
    timeout.field = '';
    timeout.message = '';
    ui.isShowBtn = (Object.values(model).findIndex(item => item.toString() === '') != -1)
    this.setState((prevState) => ({
      model: model,
      ui: ui
    }))
  }

  handleTimeout(event) {
    AppServices.services.logger.info('ForgotMainComponent excute handleTimeout')
    AppServices.services.logger.debug('Data', this.state.model)
    try {
      event.preventDefault();
      this.state.timeout.setTimeout()
      this.handleProcess()
    } catch (e) {
      AppServices.services.logger.error(`ForgotMainComponent handleTimeout ${e.toString()}`)
    }
  }

  handleRequest() {
    AppServices.services.logger.info('ForgotMainComponent excute handleRequest')
    try {
      const { model, data, timeout } = this.state
      AppServices.services.logger.debug('Model', model)
      data.set('phoneNumber', model.phoneNumber, data.phoneNumber)
      data.set('identityDocument', model.identityDocument, data.identityDocument)
      data.set('identityNo', model.identityNo, data.identityNo)
      AppServices.services.logger.debug('Data', data.getValueForgot())
      this.props.sendInfo(timeout.key, data.getValueForgot())
    } catch (e) {
      AppServices.services.logger.error(`ForgotMainComponent handleRequest`)
      AppServices.services.logger.error(`Field ${e.field} Message ${e.message}`)
      this.state.timeout.setTimeout(false, e.field, e.message)
      this.handleProcess(false)
    }
  }

  render() {

    const { localizeKey } = this.props;
    const { model, data, timeout, ui } = this.state;

    return (
      <ForgotMainHtml
        appServices={AppServices}
        localizeKey={localizeKey}
        model={model}
        data={data}
        timeout={timeout}
        ui={ui}

        handleRefLineProcress={this.handleRefLineProcress}
        handleRedirect={this.handleRedirect}
        handleOnSubmit={this.handleTimeout}
        handleOnChange={this.handleOnChange}
      />
    )
  }

}
