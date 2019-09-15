/**
 * Created By Nguyen Cong Thanh on 20/05/2019 10:50.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import AppServices from '../../../../app.services'
import RegisterMainHtml from '../../../../ui/public/register/main/main.html'

export default class RegisterMainComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      model: new AppServices.models.register().getValueMain(),
      data: new AppServices.models.register(),
      timeout: new AppServices.services.timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        fullName: React.createRef(),
        lineProcess: React.createRef()
      },
      ui: {
        list: AppServices.enums.forgot.IDENTITY_DOCUMENT,
        current: AppServices.enums.forgot.IDENTITY_DOCUMENT[0],
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
    AppServices.services.logger.info(`RegisterMainComponent excute componentDidMount`)
    try {
      this.state.model.identityDocument = this.state.ui.current.value;
      const { match, view } = this.props;
      const { ui } = this.state;
      const data = AppServices.services.cacheLayout.get(match.url, view.main)
      if (AppServices.services.helper.isNotEmpty(data)) {
        AppServices.services.logger.debug('Data Receive', data)
        ui.isShowBtn = false
        this.setState({
          model: data,
          ui: ui
        })
      }
    } catch (e) {
      AppServices.services.logger.error(`RegisterMainComponent componentDidMount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    AppServices.services.logger.info(`RegisterMainComponent excute UNSAFE_componentWillReceiveProps`)
    try {
      const response = nextProps.messageCenterReducer
      if (this.props.messageCenterReducer !== nextProps.messageCenterReducer
        && response.key === this.state.timeout.key) {
        AppServices.services.logger.info(`RegisterMainComponent excute componentWillReceiveProps`)
        AppServices.services.logger.debug(`Receive response`, response)
        AppServices.code.process.checkCode(response, this.state, this.setState.bind(this), this.otpRequired, this.props.handleSetView, this.props.view, this.props.match)
        this.state.timeout.setTimeout(false)
        this.handleProcess(false)
      }
    } catch (e) {
      AppServices.services.logger.error(`RegisterMainComponent componentWillReceiveProps ${e.toString()}`)
    }
  }

  otpRequired(){
    try {
      const {view, match, handleSetView} = this.props;
      const {model} = this.state;

      AppServices.services.cacheLayout.set(match.url, model, view.main)
      handleSetView(view.otp)
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
    AppServices.services.logger.info('RegisterMainComponent excute handleProcess')
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
      AppServices.services.logger.error(`RegisterMainComponent handleProcess ${e.toString()}`)
    }
  }

  handleRedirect(event, state) {
    AppServices.services.logger.info('RegisterMainComponent excute handleRedirect')
    AppServices.services.logger.debug('State', state)
    try {
      if (event) event.preventDefault();
      const { history } = this.props;
      AppServices.services.cacheLayout.clear()
      history.push(state)
    } catch (e) {
      AppServices.services.logger.error(`RegisterMainComponent handleRedirect ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleTimeout(event) {
    AppServices.services.logger.info('RegisterMainComponent excute handleTimeout')
    AppServices.services.logger.debug('Data', this.state.model)
    try {
      event.preventDefault();
      this.state.timeout.setTimeout()
      this.handleProcess()
    } catch (e) {
      AppServices.services.logger.error(`RegisterMainComponent handleTimeout ${e.toString()}`)
    }
  }

  handleRequest() {
    AppServices.services.logger.info('RegisterMainComponent excute handleRequest')
    try {
      const { model, data, timeout } = this.state
      AppServices.services.logger.debug('Model', model)
      data.set('fullName', model.fullName, data.fullName)
      data.set('identityDocument', model.identityDocument, data.identityDocument)
      data.set('identityNo', model.identityNo, data.identityNo)
      AppServices.services.logger.debug('Data', data.getValueRequestCheckLicense())
      this.props.sendInfo(timeout.key, data.getValueRequestCheckLicense())
    } catch (e) {
      AppServices.services.logger.error(`RegisterMainComponent handleRequest`)
      AppServices.services.logger.error(`Field ${e.field} Message ${e.message}`)
      this.state.timeout.setTimeout(false, e.field, e.message)
      this.handleProcess(false)
    }
  }

  render() {

    const { model, data, timeout, ref, ui } = this.state;
    const { localizeKey, view, handleSetView } = this.props;

    return (
      <RegisterMainHtml
        appServices={AppServices}
        localizeKey={localizeKey}
        model={model}
        data={data}
        timeout={timeout}
        ui={ui}

        handleRedirect={this.handleRedirect}
        handleRefLineProcress={this.handleRefLineProcress}
        handleOnChange={this.handleOnChange}
        handleTimeout={this.handleTimeout}
      />
    )
  }

}
