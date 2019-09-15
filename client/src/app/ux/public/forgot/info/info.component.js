/**
 * Created By Nguyen Cong Thanh on 17/05/2019 16:34.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import ForgotInfoHtml from '../../../../ui/public/forgot/info/info.html'
import AppServices from '../../../../app.services'
import { da } from 'date-fns/locale'

export default class ForgotInfoComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      model: new AppServices.models.forgot().getValueInfo(),
      data: new AppServices.models.forgot(),
      timeout: new AppServices.services.timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        lineProcess: React.createRef(),
      },
      ui: {
        isShowPassword: false,
        isShowBtn: true
      }
    }

    // console.log(this.state)
    this.handleOnShowPassword = this.handleOnShowPassword.bind(this)
    this.handleRefLineProcress = this.handleRefLineProcress.bind(this)
    this.handleProcess = this.handleProcess.bind(this)
    this.handleRedirectViewMain = this.handleRedirectViewMain.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.handleRequest = this.handleRequest.bind(this)
    this.handleGetUsername = this.handleGetUsername.bind(this)
    this.handleResponseCodeGetUsername = this.handleResponseCodeGetUsername.bind(this)
  }

  componentDidMount() {
    const {model,ui} = this.state;
    const {publicOtpReducer, match, viewNew } = this.props;
    ui.isShowBtn = false
    model.refKey = publicOtpReducer.refKey
    this.setState({
      model: model
    })
    this.handleGetUsername()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    AppServices.services.logger.info('ForgotInfoComponent excute UNSAFE_componentWillReceiveProps')
    try {
      const response = nextProps.messageCenterReducer
      if (this.props.messageCenterReducer !== nextProps.messageCenterReducer
        && response.key === this.state.timeout.key) {
        AppServices.services.logger.info(`ForgotInfoComponent excute componentWillReceiveProps`)
        AppServices.services.logger.debug(`Receive response`, response)
        const { view, handleSetView } = this.props;
        AppServices.code.process.checkCode(response, this.state, this.setState.bind(this), this.handleResponseCodeGetUsername)
        this.state.timeout.setTimeout(false)
        this.handleProcess(false)
      }
    } catch (e) {
      AppServices.services.logger.error(`ForgotInfoComponent componentWillReceiveProps ${e.toString()}`)
    }
  }

  handleResponseCodeGetUsername(data){
    AppServices.services.logger.info('ForgotInfoComponent excute handleResponseCodeGetUsername')
    try {
      const {model} = this.state
      model.username = data.username
      this.setState({
        model: model
      })
    } catch (e) {
      AppServices.services.logger.error(`ForgotInfoComponent handleResponseCodeGetUsername ${e.toString()}`)
    }
  }

  handleRedirectViewMain(event) {
    event.preventDefault()
    const { view, handleSetView } = this.props;
    handleSetView(view.main)
  }

  handleOnShowPassword(event) {
    event.preventDefault()
    const { ui } = this.state
    ui.isShowPassword = !ui.isShowPassword
    this.setState((preState) => ({
      ui: ui
    }))
  }

  handleRefLineProcress(element) {
    if (element) {
      this.state.ref.lineProcess = element;
      this.state.ref.lineProcess.style.display = 'none'
    }
  }

  handleProcess(status = true) {
    AppServices.services.logger.info('ForgotInfoComponent excute handleProcess')
    AppServices.services.logger.trace('ForgotInfoComponent excute handleProcess')
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
      AppServices.services.logger.error(`ForgotInfoComponent handleProcess ${e.toString()}`)
    }
  }

  handleRedirect(event, state) {
    AppServices.services.logger.info('ForgotInfoComponent excute handleRedirect')
    AppServices.services.logger.trace('ForgotInfoComponent excute handleRedirect')
    AppServices.services.logger.debug('State', state)
    try {
      if (event) event.preventDefault();
      const { history } = this.props;
      history.push(state)
    } catch (e) {
      AppServices.services.logger.error(`ForgotInfoComponent handleRedirect ${e.toString()}`)
    }
  }

  handleOnChange(event) {
    const { value, name } = event.target;
    const { model, data, timeout, ui } = this.state;
    model[name] = value
    timeout.field = '';
    timeout.message = '';
    ui.isShowBtn = (Object.values(model).findIndex(item => item === '') != -1)
    this.setState((prevState) => ({
      model: model,
      ui: ui
    }))
  }

  handleTimeout(event) {
    AppServices.services.logger.info('ForgotInfoComponent excute handleTimeout')
    AppServices.services.logger.debug('Data', this.state.model)
    try {
      event.preventDefault();
      this.state.timeout.setTimeout()
      this.handleProcess()
    } catch (e) {
      AppServices.services.logger.error(`ForgotInfoComponent handleTimeout ${e.toString()}`)
    }
  }

  handleRequest() {
    AppServices.services.logger.info('ForgotInfoComponent excute handleRequest')
    AppServices.services.logger.trace('ForgotInfoComponent excute handleRequest')
    try {
      const { model, data, timeout } = this.state
      AppServices.services.logger.debug('Model', model)
      data.set('password', model.password, data.password)
      data.set('username', model.username, data.username)
      data.set('refKey', model.refKey, data.refKey)
      AppServices.services.logger.debug('Data', data.getValueRequestInfo())
      this.props.sendPassword(timeout.key, data.getValueRequestInfo())
    } catch (e) {
      AppServices.services.logger.error(`ForgotInfoComponent handleRequest`)
      AppServices.services.logger.error(`Field ${e.field} Message ${e.message}`)
      this.state.timeout.setTimeout(false, e.field, e.message)
      this.handleProcess(false)
    }
  }

  handleGetUsername(){
    AppServices.services.logger.info('ForgotInfoComponent excute handleGetUsername')
    try {
      const { model, data, timeout } = this.state
      AppServices.services.logger.debug('Model', model)
      data.set('refKey', model.refKey, data.refKey)
      AppServices.services.logger.debug('Data', data.getValueRequestUsername())
      this.props.getUsername(timeout.key, data.getValueRequestUsername())
    } catch (e) {
      AppServices.services.logger.error(`ForgotInfoComponent handleGetUsername`)
      AppServices.services.logger.error(`Field ${e.field} Message ${e.message}`)
      this.state.timeout.setTimeout(false, e.field, e.message)
      this.handleProcess(false)
    }
  }

  render() {

    const { localizeKey } = this.props;
    const { model, data, timeout, ui } = this.state;

    return (
      <ForgotInfoHtml
        appServices={AppServices}
        localizeKey={localizeKey}
        model={model}
        data={data}
        timeout={timeout}
        ui={ui}

        handleRedirect={this.handleRedirect}
        handleRefLineProcress={this.handleRefLineProcress}
        handleRedirectViewMain={this.handleRedirectViewMain}
        handleOnSubmit={this.handleTimeout}
        handleOnChange={this.handleOnChange}
        handleOnShowPassword={this.handleOnShowPassword}
      />
    )
  }

}
