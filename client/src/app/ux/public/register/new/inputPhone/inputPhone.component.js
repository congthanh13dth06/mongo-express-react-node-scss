/**
 * Created By Nguyen Cong Thanh on 20/05/2019 16:41.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import AppServices from '../../../../../app.services'
import InputPhoneHtml from '../../../../../ui/public/register/new/inputPhone/inputPhone.html'

export default class InputPhoneComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      model: new AppServices.models.register().getValueInputPhone(),
      data: new AppServices.models.register(),
      timeout: new AppServices.services.timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        phoneNumber: React.createRef(),
        lineProcess: React.createRef()
      },
      ui: {
        isShowBtn: true,
      }
    }

    this.handleRefLineProcress = this.handleRefLineProcress.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleProcess = this.handleProcess.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.handleRequest = this.handleRequest.bind(this)
    this.otpRequired = this.otpRequired.bind(this)
  }

  componentDidMount() {
    AppServices.services.logger.info('InputPhoneComponent excute componentDidMount')
    try {
      const { match, view, viewNew } = this.props;
      const { ui } = this.state
      ui.isShowBtn = false
      const data = AppServices.services.cacheLayout.get(match.url, view.new, viewNew.inputPhone)
      if (AppServices.services.helper.isNotEmpty(data)) {
        AppServices.services.logger.debug('Data Receive', data)
        this.setState({
          model: data,
          ui: ui
        })
      }
    } catch (e) {
      AppServices.services.logger.error(`InputPhoneComponent componentDidMount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    AppServices.services.logger.info('InputPhoneComponent excute UNSAFE_componentWillReceiveProps')
    try {
      const response = nextProps.messageCenterReducer
      if (this.props.messageCenterReducer !== nextProps.messageCenterReducer
        && response.key === this.state.timeout.key) {
        AppServices.services.logger.info(`InputPhoneComponent excute componentWillReceiveProps`)
        AppServices.services.logger.debug(`Receive response`, response)
        AppServices.code.process.checkCode(response, this.state, this.setState.bind(this), this.otpRequired)
        this.state.timeout.setTimeout(false)
        this.handleProcess(false)
      }
    } catch (e) {
      AppServices.services.logger.error(`InputPhoneComponent componentWillReceiveProps ${e.toString()}`)
    }
  }

  otpRequired(){
    AppServices.services.logger.info('InputPhoneComponent excute otpRequired')
    try {
      const {view,match,viewNew, handleSetViewNew} = this.props;
      const {model} = this.state;
      AppServices.services.cacheLayout.set(match.url, model, view.new, viewNew.inputPhone)
      handleSetViewNew(viewNew.otp)
    } catch (e) {
      AppServices.services.logger.error(`InputPhoneComponent otpRequired ${e.toString()}`)
    }
  }

  handleRefLineProcress(element) {
    if (element) {
      this.state.ref.lineProcess = element;
      this.state.ref.lineProcess.style.display = 'none'
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

  handleProcess(status = true) {
    AppServices.services.logger.info('InputPhoneComponent excute handleProcess')
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
      AppServices.services.logger.error(`InputPhoneComponent handleProcess ${e.toString()}`)
    }
  }

  handleRedirect(event, state) {
    AppServices.services.logger.info('InputPhoneComponent excute handleRedirect')
    AppServices.services.logger.debug('State', state)
    try {
      if (event) event.preventDefault();
      const { history } = this.props;
      AppServices.services.cacheLayout.clear()
      history.push(state)
    } catch (e) {
      AppServices.services.logger.error(`InputPhoneComponent handleRedirect ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleTimeout(event) {
    AppServices.services.logger.info('InputPhoneComponent excute handleTimeout')
    AppServices.services.logger.debug('Data', this.state.model)
    try {
      event.preventDefault();
      this.state.timeout.setTimeout()
      this.handleProcess()
    } catch (e) {
      AppServices.services.logger.error(`InputPhoneComponent handleTimeout ${e.toString()}`)
    }
  }

  handleRequest() {
    AppServices.services.logger.info('InputPhoneComponent excute handleRequest')
    try {
      const { model, data, timeout } = this.state
      const { match, view } = this.props;
      const dataCache = AppServices.services.cacheLayout.get(match.url, view.main);
      AppServices.services.logger.debug('Model', model)
      data.set('phoneNumber', model.phoneNumber, data.phoneNumber)
      data.set('identityNo', dataCache.identityNo, data.identityNo)
      data.set('identityDocument', dataCache.identityDocument, data.identityDocument)
      data.set('fullName', dataCache.fullName, data.fullName)
      AppServices.services.logger.debug('Data', data.getValueRequestSendPhone())
      this.props.sendPhone(timeout.key, data.getValueRequestSendPhone())
    } catch (e) {
      AppServices.services.logger.error(`InputPhoneComponent handleRequest`)
      AppServices.services.logger.error(`Field ${e.field} Message ${e.message}`)
      this.state.timeout.setTimeout(false, e.field, e.message)
      this.handleProcess(false)
    }
  }

  render() {

    const { model, data, timeout, ui } = this.state;
    const { localizeKey, view, handleSetView, viewNew, handleSetViewNew } = this.props;

    return (
      <InputPhoneHtml
        appServices={AppServices}
        localizeKey={localizeKey}
        model={model}
        data={data}
        timeout={timeout}
        ui={ui}

        view={view}
        handleSetView={handleSetView}
        viewNew={viewNew}
        handleSetViewNew={handleSetViewNew}
        handleRedirect={this.handleRedirect}
        handleRefLineProcress={this.handleRefLineProcress}
        handleOnChange={this.handleOnChange}
        handleTimeout={this.handleTimeout}
      />
    )
  }

}
