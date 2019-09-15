/**
 * Created By Nguyen Cong Thanh on 22/05/2019 11:17.
 *
 * Copyright Intelin 2019.
 */

 import React, { Component, Fragment } from 'react'

 import AppServices from '../../../../../app.services'
 import ScheduleHtml from '../../../../../ui/public/register/notOnlineBanking/schedule/schedule.html'

 export default class ScheduleComponent extends Component {

   constructor(props) {
     super(props)

     this.state = {
       model: new AppServices.models.register().getValueSchedule(),
       data: new AppServices.models.register(),
       timeout: new AppServices.services.timeout(this.setState.bind(this), this.handleRequest.bind(this)),
       ref: {
         phoneNumber: React.createRef(),
         lineProcess: React.createRef()
       },
       ui: {
        listCity: AppServices.enums.register.CITY,
        currentCity: AppServices.enums.register.CITY[0],
        listBranch: AppServices.enums.register.BRANCH[0].text,
        currentBranch: AppServices.enums.register.BRANCH[0].text[0],
         isMinDate: AppServices.services.moment().add('days', 1).format(),
         isShowBtn: true,
         isShowPassword: false
       }
     }

     this.handleRefLineProcress = this.handleRefLineProcress.bind(this)
     this.handleOnChange = this.handleOnChange.bind(this)
     this.handleOnBlur = this.handleOnBlur.bind(this)
     this.handleProcess = this.handleProcess.bind(this)
     this.handleRedirect = this.handleRedirect.bind(this)
     this.handleTimeout = this.handleTimeout.bind(this)
     this.handleRequest = this.handleRequest.bind(this)
     this.handleResponseCode = this.handleResponseCode.bind(this)
   }

   componentDidMount() {
     const { model } = this.state;
     model.dateSelected = new Date(AppServices.services.moment().add('days', 1).format())
     model.date = AppServices.services.helper.getDate(new Date(AppServices.services.moment().add('days', 1).format()))
     this.setState((prevState) => ({
       model: model
     }))
   }

   UNSAFE_componentWillReceiveProps(nextProps) {
     AppServices.services.logger.info('ScheduleComponent excute UNSAFE_componentWillReceiveProps')
     try {
       const response = nextProps.messageCenterReducer
       if (this.props.messageCenterReducer !== nextProps.messageCenterReducer
         && response.key === this.state.timeout.key) {
         AppServices.services.logger.info(`ScheduleComponent excute componentWillReceiveProps`)
         AppServices.services.logger.debug(`Receive response`, response)
         AppServices.code.process.checkCode(response, this.state, this.setState.bind(this), this.handleResponseCode)
         this.state.timeout.setTimeout(false)
         this.handleProcess(false)
       }
     } catch (e) {
       AppServices.services.logger.error(`ScheduleComponent componentWillReceiveProps ${e.toString()}`)
     }
   }

   handleResponseCode() {
    try {
      const{handleSetViewNotOnlineBanking, viewNotOnlineBanking} = this.props
      AppServices.services.cacheLayout.clear()
      handleSetViewNotOnlineBanking(viewNotOnlineBanking.notiSuccess)
    } catch (e) {
      AppServices.services.logger.error(`ScheduleComponent handleResponseCode ${e.toString()}`)
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

   handleOnBlur(event) {
     try {
       const { value, name } = event.target;
       const { localizeKey } = this.props;
       AppServices.services.validator.isNotEmpty('date', value, localizeKey.REGISTER_VALIDATION_DATE_WILL_COME_INVALID)
       AppServices.services.validator.isDateRegisterBooking('date', value, localizeKey.REGISTER_VALIDATION_DATE_WILL_COME_INVALID)
       const { model } = this.state;
       model.dateSelected = new Date(AppServices.services.helper.formatDate(value))
       this.setState((prevState) => ({
         model: model
       }))
     } catch (e) {
       AppServices.services.logger.error(`ScheduleComponent handleOnBlur`)
       AppServices.services.logger.error(`Field ${e.field} Message ${e.message}`)
       this.state.timeout.setTimeout(false, e.field, e.message)
     }
   }

   handleProcess(status = true) {
     AppServices.services.logger.info('ScheduleComponent excute handleProcess')
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
       AppServices.services.logger.error(`ScheduleComponent handleProcess ${e.toString()}`)
     }
   }

   handleRedirect(event, state) {
     AppServices.services.logger.info('ScheduleComponent excute handleRedirect')
     AppServices.services.logger.debug('State', state)
     try {
       if (event) event.preventDefault();
       const { history } = this.props;
       history.push(state)
     } catch (e) {
       AppServices.services.logger.error(`ScheduleComponent handleRedirect ${e.toString()}`)
       this.state.timeout.setTimeout(false)
     }
   }

   handleTimeout(event) {
     AppServices.services.logger.info('ScheduleComponent excute handleTimeout')
     AppServices.services.logger.debug('Data', this.state.model)
     try {
       event.preventDefault();
       this.state.timeout.setTimeout()
       this.handleProcess()
     } catch (e) {
       AppServices.services.logger.error(`ScheduleComponent handleTimeout ${e.toString()}`)
     }
   }

   handleRequest() {
     AppServices.services.logger.info('ScheduleComponent excute handleRequest')
     try {
       const { model, data, timeout } = this.state
       const { view,match } = this.props

       const dataCacheFail = AppServices.services.cacheLayout.get(match.url, view.notOnlineBanking)

       data.set('meetingAt', AppServices.services.helper.formatDate(model.date).getTime(), data.meetingAt)
       data.set('branch', 'dia chi', data.branch)
       data.set('fullName', dataCacheFail.fullName, data.fullName)
       data.set('phoneNumber', dataCacheFail.phoneNumber, data.phoneNumber)
       data.set('identityNo', dataCacheFail.identityNo, data.identityNo)


       AppServices.services.logger.debug('Data', data.getValueRequestSchedule())
       this.props.sendSchedule(timeout.key, data.getValueRequestSchedule())
     } catch (e) {
       AppServices.services.logger.error(`ScheduleComponent handleRequest`)
       AppServices.services.logger.error(`Field ${e.field} Message ${e.message}`)
       this.state.timeout.setTimeout(false, e.field, e.message)
       this.handleProcess(false)
     }
   }

   render() {

     const { model, data, timeout, ui } = this.state;
     const { localizeKey, viewNotOnlineBanking, handleSetViewNotOnlineBanking } = this.props;

     return (
       <ScheduleHtml
         appServices={AppServices}
         localizeKey={localizeKey}
         model={model}
         data={data}
         timeout={timeout}
         ui={ui}

         viewNotOnlineBanking={viewNotOnlineBanking}
         handleSetViewNotOnlineBanking={handleSetViewNotOnlineBanking}
         handleRedirect={this.handleRedirect}
         handleRefLineProcress={this.handleRefLineProcress}
         handleOnChange={this.handleOnChange}
         handleOnBlur={this.handleOnBlur}
         handleTimeout={this.handleTimeout}
       />
     )
   }

 }
