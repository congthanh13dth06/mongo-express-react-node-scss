/**
 * Created By Nguyen Cong Thanh on 12/09/2019 17:56.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import AppServices from '../../../../app.services'
import PasswordHtml from '../../../../ui/public/login/password/password.html'

export default class PasswordComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      model: new AppServices.models.login().getValuePassword(),
      data: new AppServices.models.login(),
      timeout: new AppServices.services.timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        password: React.createRef(),
        lineProcess: React.createRef()
      },
      ui: {
        isShowBtn: true,
        isShowPassword: false
      }
    }

    this.handleOnShowPassword = this.handleOnShowPassword.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.handleRefLineProcress = this.handleRefLineProcress.bind(this)
    this.handleOnBack = this.handleOnBack.bind(this)
  }

  componentDidMount() {
    AppServices.services.logger.info('PasswordComponent excute componentDidMount')
    try {
      const { match, view } = this.props;
      const { data } = this.state;
      const dataCacheLayout = AppServices.services.cacheLayout.get(match.url, view.username)
      if (AppServices.services.helper.isNotEmpty(dataCacheLayout)) {
        AppServices.services.logger.debug('Data Cache Layout', dataCacheLayout)
        data.set('username', dataCacheLayout.username, data.username)
        data.set('token', dataCacheLayout.token, data.token)
        this.setState({
          data: data
        })
      }
    } catch (e) {
      AppServices.services.logger.error(`PasswordComponent componentDidMount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    AppServices.services.logger.info('PasswordComponent excute UNSAFE_componentWillReceiveProps')
    try {
      const response = nextProps.messageCenterReducer
      if (this.props.messageCenterReducer !== nextProps.messageCenterReducer
        && response.key === this.state.timeout.key) {
        AppServices.services.logger.info(`PasswordComponent excute componentWillReceiveProps`)
        AppServices.services.logger.debug(`Receive response`, response)
        AppServices.code.process.checkCode(response, this.state, this.setState.bind(this))
        this.state.timeout.setTimeout(false)
        this.handleProcess(false)
      }
    } catch (e) {
      AppServices.services.logger.error(`PasswordComponent componentWillReceiveProps ${e.toString()}`)
    }
  }

  handleRefLineProcress(element) {
    if (element) {
      this.state.ref.lineProcess = element
      this.state.ref.lineProcess.style.display = 'none'
    }
  }

  handleProcess(status = true) {
    AppServices.services.logger.info('PasswordComponent excute handleProcess')
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
      AppServices.services.logger.error(`PasswordComponent handleProcess ${e.toString()}`)
    }
  }


  handleOnBlur(event) {
    AppServices.services.logger.info('PasswordComponent excute handleOnBlur')
    AppServices.services.logger.debug('Data', this.state.model)
    try {
      const { model, data } = this.state
      const { name } = event.target
      data.set('password', model.password, data.password)
      this.setState((preState) => ({
        timeout: {
          ...preState.timeout,
          field: '',
          message: ''
        },
        ui: {
          ...preState.ui,
          isShowBtn: false
        }
      }))
    } catch (e) {
      AppServices.services.logger.error(`PasswordComponent handleOnBlur ${e.toString()}`)
      AppServices.services.logger.error(`Field ${e.field} Message ${e.message}`)
      this.state.timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChange(event) {
    const { model, timeout, ui } = this.state
    model.password = event.target.value
    timeout.status = false;
    timeout.field = '';
    timeout.message = '';
    ui.isShowBtn = true
    this.setState((preState) => ({
      model: model,
      timeout: timeout,
      ui: ui
    }))
  }

  handleChangeLanguage(event) {
    AppServices.services.logger.info('PasswordComponent excute handleChangeLanguage')
    try {
      event.preventDefault();
      AppServices.services.localize.changeLanguage()
      this.setState(this.state)
    } catch (e) {
      AppServices.services.logger.error(`PasswordComponent handleChangeLanguage ${e.toString()}`)
    }
  }

  handleRedirect(event, state) {
    AppServices.services.logger.info('PasswordComponent excute handleRedirect')
    AppServices.services.logger.debug('State', state)
    try {
      if (event) event.preventDefault();
      const { history } = this.props;
      history.push(state)
    } catch (e) {
      AppServices.services.logger.error(`PasswordComponent handleRedirect ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleTimeout(event) {
    AppServices.services.logger.info('PasswordComponent excute handleTimeout')
    AppServices.services.logger.debug('Data', this.state.model)
    try {
      event.preventDefault();
      this.state.timeout.setTimeout()
      this.handleProcess()
    } catch (e) {
      AppServices.services.logger.error(`PasswordComponent handleTimeout ${e.toString()}`)
    }
  }

  handleOnShowPassword(event) {
    event.preventDefault()
    const { ui } = this.state
    ui.isShowPassword = !ui.isShowPassword
    this.setState((preState) => ({
      ui: ui
    }))
  }

  handleOnBack(event) {
    AppServices.services.logger.info('PasswordComponent excute handleOnBack')
    try {
      event.preventDefault()
      const { view, handleSetView } = this.props
      handleSetView(view.username)
    } catch (e) {
      AppServices.services.logger.error(`PasswordComponent handleOnBack ${e.toString()}`)
    }
  }

  handleRequest() {
    AppServices.services.logger.info('PasswordComponent excute handleRequest')
    try {
      const { data } = this.state
      AppServices.services.logger.debug('Data', data.getValueRequestCheckPassword())
      this.props.checkPassword(this.state.timeout.key, data.getValueRequestCheckPassword())
    } catch (e) {
      AppServices.services.logger.error(`PasswordComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
      this.handleProcess(false)
    }
  }

  render() {

    const { model, data, timeout, ui, ref } = this.state;
    const { localizeKey } = this.props;

    return (
      <Fragment>
        <PasswordHtml
        appServices={AppServices}
        model={model}
        localizeKey={localizeKey}
        data={data}
        timeout={timeout}
        ui={ui}
        refLogin={ref}

        handleOnBack={this.handleOnBack}
        handleChangeLanguage={this.handleChangeLanguage}
        handleOnChange={this.handleOnChange}
        handleOnBlur={this.handleOnBlur}
        handleOnShowPassword={this.handleOnShowPassword}
        handleOnSubmit={this.handleTimeout}
        handleRedirect={this.handleRedirect}
        handleRefLineProcress={this.handleRefLineProcress}
        />
      </Fragment>
    )

  }

}
