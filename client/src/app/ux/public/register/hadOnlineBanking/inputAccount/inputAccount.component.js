/**
 * Created By Nguyen Cong Thanh on 20/05/2019 16:41.
 *
 * Copyright Intelin 2019.
 */

 import React, { Component, Fragment } from 'react'

 import AppServices from '../../../../../app.services'
 import InputAccountHtml from '../../../../../ui/public/register/hadOnlineBanking/inputAccount/inputAccount.html'

 export default class InputAccountComponent extends Component {

   constructor(props) {
     super(props)

     this.state = {
       model: new AppServices.models.register().getValueInputAccount(false),
       data: new AppServices.models.register(),
       timeout: new AppServices.services.timeout(this.setState.bind(this), this.handleRequest.bind(this)),
       ref: {
         phoneNumber: React.createRef(),
         lineProcess: React.createRef()
       },
       ui: {
         isShowBtn: true,
         isShowPassword: false
       }
     }

     this.handleOnShowPassword = this.handleOnShowPassword.bind(this)
     this.handleRefLineProcress = this.handleRefLineProcress.bind(this)
     this.handleOnChange = this.handleOnChange.bind(this)
     this.handleProcess = this.handleProcess.bind(this)
     this.handleRedirect = this.handleRedirect.bind(this)
     this.handleTimeout = this.handleTimeout.bind(this)
     this.handleRequest = this.handleRequest.bind(this)
     this.handleResponseCode = this.handleResponseCode.bind(this)
   }

   componentDidMount() {
    AppServices.services.logger.info('InputAccountComponent excute componentDidMount')
    try {
      const {model,ui} = this.state;
      const {publicOtpReducer, match, viewHadOnlineBanking } = this.props;
      ui.isShowBtn = false
      const data = AppServices.services.cacheLayout.get(match.url, viewHadOnlineBanking.inputAccount)
      if (AppServices.services.helper.isNotEmpty(data)) {
        AppServices.services.logger.debug('Data Receive', data)
        this.setState({
          model: data,
          ui: ui
        })
      } else {
        model.refNo = publicOtpReducer.refKey
        this.setState({
          model: model
        })
      }
    } catch (e) {
      AppServices.services.logger.error(`InputAccountComponent componentDidMount ${e.toString()}`)
    }
  }

   UNSAFE_componentWillReceiveProps(nextProps) {
     AppServices.services.logger.info('InputAccountComponent excute UNSAFE_componentWillReceiveProps')
     try {
       const response = nextProps.messageCenterReducer
       if (this.props.messageCenterReducer !== nextProps.messageCenterReducer
         && response.key === this.state.timeout.key) {
         AppServices.services.logger.info(`InputAccountComponent excute componentWillReceiveProps`)
         AppServices.services.logger.debug(`Receive response`, response)
         AppServices.code.process.checkCode(response, this.state, this.setState.bind(this), this.handleResponseCode)
         this.state.timeout.setTimeout(false)
         this.handleProcess(false)
       }
     } catch (e) {
       AppServices.services.logger.error(`InputAccountComponent componentWillReceiveProps ${e.toString()}`)
     }
   }

   handleResponseCode() {
     AppServices.services.logger.info('InputAccountComponent excute handleResponseCode')
    try {
      const{model} = this.state;
      const{match,view,viewHadOnlineBanking,handleSetViewHadOnlineBanking} = this.props
      AppServices.services.cacheLayout.clear()
      handleSetViewHadOnlineBanking(viewHadOnlineBanking.noti)
    } catch (e) {
      AppServices.services.logger.error(`InputAccountComponent handleResponseCode ${e.toString()}`)
    }
   }

   handleRefLineProcress(element) {
     if (element) {
       this.state.ref.lineProcess = element;
       this.state.ref.lineProcess.style.display = 'none'
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
     AppServices.services.logger.info('InputAccountComponent excute handleProcess')
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
       AppServices.services.logger.error(`InputAccountComponent handleProcess ${e.toString()}`)
     }
   }

   handleRedirect(event, state) {
     AppServices.services.logger.info('InputAccountComponent excute handleRedirect')
     AppServices.services.logger.debug('State', state)
     try {
       if (event) event.preventDefault();
       const { history } = this.props;
       AppServices.services.cacheLayout.clear()
       history.push(state)
     } catch (e) {
       AppServices.services.logger.error(`InputAccountComponent handleRedirect ${e.toString()}`)
       this.state.timeout.setTimeout(false)
     }
   }

   handleTimeout(event) {
     AppServices.services.logger.info('InputAccountComponent excute handleTimeout')
     AppServices.services.logger.debug('Data', this.state.model)
     try {
       event.preventDefault();
       this.state.timeout.setTimeout()
       this.handleProcess()
     } catch (e) {
       AppServices.services.logger.error(`InputAccountComponent handleTimeout ${e.toString()}`)
     }
   }

   handleRequest() {
     AppServices.services.logger.info('InputAccountComponent excute handleRequest')
     try {
       const { model, data, timeout } = this.state
       AppServices.services.logger.debug('Model', model)
       data.set('username', model.username, data.username)
       data.set('password', model.password, data.password)
       data.set('refNo', model.refNo, data.refNo)
       AppServices.services.logger.debug('Data', data.getValueRequestUpdateRegisterUserAfterOtp())
       this.props.sendAccount(timeout.key, data.getValueRequestUpdateRegisterUserAfterOtp())
     } catch (e) {
       AppServices.services.logger.error(`InputAccountComponent handleRequest`)
       AppServices.services.logger.error(`Field ${e.field} Message ${e.message}`)
       this.state.timeout.setTimeout(false, e.field, e.message)
       this.handleProcess(false)
     }
   }

   render() {

     const { model, data, timeout, ui } = this.state;
     const { localizeKey, view, handleSetView, viewNew, handleSetViewNew } = this.props;

     return (
       <InputAccountHtml
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
         handleOnShowPassword={this.handleOnShowPassword}
         handleRedirect={this.handleRedirect}
         handleRefLineProcress={this.handleRefLineProcress}
         handleOnChange={this.handleOnChange}
         handleTimeout={this.handleTimeout}
       />
     )
   }

 }
