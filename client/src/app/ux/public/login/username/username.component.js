/**
 * Created By Nguyen Cong Thanh on 12/09/2019 17:56.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import AppServices from '../../../../app.services'

import UsernameHtml from '../../../../ui/public/login/username/username.html'

export default class UsernameComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      model: new AppServices.models.login().getValueUsername(),
      data: new AppServices.models.login(),
      timeout: new AppServices.services.timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        username: React.createRef(),
        lineProcess: React.createRef()
      },
      ui: {
        isShowBtn: true,
      }
    }

    this.handleOnClearUsername = this.handleOnClearUsername.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.handleRefLineProcress = this.handleRefLineProcress.bind(this)
    this.handleProcess = this.handleProcess.bind(this)
  }

  componentDidMount() {
    AppServices.services.logger.info('UsernameComponent excute componentDidMount')
    try {
      const { match, view } = this.props;
      const { model, ui } = this.state;
      const dataCacheLayout = AppServices.services.cacheLayout.get(match.url, view.username)
      if (AppServices.services.helper.isNotEmpty(dataCacheLayout)) {
        AppServices.services.logger.debug('Data Cache Layout', dataCacheLayout)
        model.username = dataCacheLayout.username
        this.setState({
          model: model
        })
        this.handleOnBlur()
      }
    } catch (e) {
      AppServices.services.logger.error(`UsernameComponent componentDidMount ${e.toString()}`)
    }
  }

  componentDidUpdate() {}

  UNSAFE_componentWillReceiveProps(nextProps) {
    AppServices.services.logger.info('UsernameComponent excute UNSAFE_componentWillReceiveProps')
    try {
      const response = nextProps.messageCenterReducer
      if (this.props.messageCenterReducer !== nextProps.messageCenterReducer
        && response.key === this.state.timeout.key) {
        AppServices.services.logger.info(`UsernameComponent excute componentWillReceiveProps`)
        AppServices.services.logger.debug(`Receive response`, response)
        AppServices.code.process.checkCode(response, this.state, this.setState.bind(this), this.props.handleSetView, this.props.view, this.props.match)
        this.state.timeout.setTimeout(false)
        this.handleProcess(false)
      }
    } catch (e) {
      AppServices.services.logger.error(`UsernameComponent componentWillReceiveProps ${e.toString()}`)
    }
  }

  handleRefLineProcress(element) {
    if (element) {
      this.state.ref.lineProcess = element
      this.state.ref.lineProcess.style.display = 'none'
    }
  }

  handleProcess(status = true) {
    AppServices.services.logger.info('UsernameComponent excute handleProcess')
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
      AppServices.services.logger.error(`UsernameComponent handleProcess ${e.toString()}`)
    }
  }

  handleOnBlur(event) {
    AppServices.services.logger.info('UsernameComponent excute handleOnBlur')
    AppServices.services.logger.debug('Data', this.state.model)
    try {
      const { model, data } = this.state
      data.set('username', model.username, data.username)
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
      AppServices.services.logger.error(`UsernameComponent handleOnBlur ${e.toString()}`)
      AppServices.services.logger.error(`Field ${e.field} Message ${e.message}`)
      this.state.timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChange(event) {
    const { model, timeout, ui } = this.state
    model.username = event.target.value
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
    AppServices.services.logger.info('UsernameComponent excute handleChangeLanguage')
    try {
      event.preventDefault();
      AppServices.services.localize.changeLanguage()
      this.setState(this.state)
    } catch (e) {
      AppServices.services.logger.error(`UsernameComponent handleChangeLanguage ${e.toString()}`)
    }
  }

  handleRedirect(event, state) {
    AppServices.services.logger.info('UsernameComponent excute handleRedirect')
    AppServices.services.logger.debug('State', state)
    try {
      if (event) event.preventDefault();
      const { history } = this.props;
      history.push(state)
    } catch (e) {
      AppServices.services.logger.error(`UsernameComponent handleRedirect ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleTimeout(event) {
    AppServices.services.logger.info('UsernameComponent excute handleTimeout')
    AppServices.services.logger.debug('Data', this.state.model)
    try {
      event.preventDefault();
      this.state.timeout.setTimeout()
      this.handleProcess()
    } catch (e) {
      AppServices.services.logger.error(`UsernameComponent handleTimeout ${e.toString()}`)
    }
  }

  handleOnClearUsername(event) {
    event.preventDefault()
    this.handleOnChange({
      target: {
        name: 'username',
        value: ''
      }
    })
  }

  handleRequest() {
    AppServices.services.logger.info('UsernameComponent excute handleRequest')
    try {
      const { data } = this.state
      AppServices.services.logger.debug('Data', data.getValueRequestCheckUsername())
      this.props.checkUsername(this.state.timeout.key, data.getValueRequestCheckUsername())
    } catch (e) {
      AppServices.services.logger.error(`UsernameComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
      this.handleProcess(false)
    }
  }

  render() {

    const { model, data, timeout, ui, ref } = this.state;
    const { localizeKey } = this.props;

    return (
      <Fragment>
        <UsernameHtml
          appServices={AppServices}
          model={model}
          localizeKey={localizeKey}
          data={data}
          timeout={timeout}
          ui={ui}
          refLogin={ref}

          handleChangeLanguage={this.handleChangeLanguage}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          handleOnClearUsername={this.handleOnClearUsername}
          handleOnSubmit={this.handleTimeout}
          handleRedirect={this.handleRedirect}
          handleRefLineProcress={this.handleRefLineProcress}
        />
      </Fragment>
    )

  }

}
