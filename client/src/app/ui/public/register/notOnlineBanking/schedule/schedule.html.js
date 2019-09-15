/**
 * Created By Nguyen Cong Thanh on 22/05/2019 11:15.
 *
 * Copyright Intelin 2019.
 */

 import React, { Component, Fragment } from 'react'

 import Button from '../../../base/button/button.component';
 import Input from '../../../base/input/input.component';
 import Select from '../../../base/input/select.component';
 import Svg from '../../../base/svg/file.svg'
 import Style from '../../register.styles'
 import Cleave from 'cleave.js/dist/cleave'

 export default class ScheduleHtml extends Component {

   render() {

     const { appServices, localizeKey, model, data, timeout, ui, viewNotOnlineBanking, handleSetViewNotOnlineBanking, handleRedirect, handleRefLineProcress, handleOnChange, handleOnBlur, handleTimeout } = this.props;

     return (
       <div className={Style.REGISTER}>
         <div className={Style.HEADER}>
           <div>
             <a href="javascript:" className={`${Style.HEADER_ICON_LEFT} ${timeout.status ? Style.DISABLED : ''}`} onClick={(event) => {event.preventDefault(); handleSetViewNotOnlineBanking(viewNotOnlineBanking.notiFail)}}>{Svg.BACK.content}
               <span>{appServices.services.localize.getLocalize(localizeKey.COMMON_BACK)}</span></a>
           </div>
           <div>
             <a className={`${Style.HEADER_ICON_RIGHT} ${timeout.status ? Style.DISABLED : ''}`} href=""
               onClick={(event) => {handleRedirect(event, `${appServices.constant.router.PUBLIC}${appServices.constant.router.LOGIN}`)}}
             ><span>{appServices.services.localize.getLocalize(localizeKey.REGISTER_BUTTON_LOGIN)}</span></a>
           </div>
         </div>
         <div className={Style.PROGRESS_BAR}>
             <div className={Style.LINE_PROCESS} ref={handleRefLineProcress} />
         </div>
         <div className={Style.TITLE}>
           <p>{appServices.services.localize.getLocalize(localizeKey.REGISTER_HEADER_REGISTER)}</p>
         </div>
         <div className={Style.CAPTION} style={{'maxWidth': '330px'}}>
           <p>{appServices.services.localize.getLocalize(localizeKey.REGISTER_LETS_SCHEDULE)}</p>
         </div>
         <div className={Style.FORM_FOGOT}>
           <form>
             <div className={Style.FORM_ERROR}>
               <p>{(timeout.field === 'all') ? appServices.services.localize.getLocalize(timeout.message) : null}</p>
             </div>
             <Select.primary
               style={{"marginBottom": "20px", "maxHeight": "130px"}}
               text={appServices.services.localize.getLocalize(localizeKey.REGISTER_PROVINCE_CITY)}
               iconLeft={Svg.PROVINCE}
               iconRight={Svg.DROP_DOWN}
               disabled={timeout.status}
               list={ui.listCity}
               current={ui.currentCity}
               name="provinceCity"
             />
             <Select.primary
               style={{"marginBottom": "20px", "maxHeight": "130px"}}
               text={appServices.services.localize.getLocalize(localizeKey.REGISTER_BRANCH_WILL_COME)}
               iconLeft={Svg.BRANCH}
               iconRight={Svg.DROP_DOWN}
               disabled={timeout.status}
               list={ui.listBranch}
               current={ui.currentBranch}
               name="branchWillCome"
             />
             <Input.dateInline
               style={{"marginBottom": "10px", "minHeight": "416px", "maxHeight": "416px"}}
               className="register-new-schedule-date"
               text={appServices.services.localize.getLocalize(localizeKey.REGISTER_DATE_WILL_COME)}
               placeholder={appServices.services.localize.getLocalize(localizeKey.REGISTER_PLACEHOLDER_DATE_WILL_COME)}
               iconLeft={Svg.SCHEDULE}
               value={model.date}
               name="date"
               onChange={handleOnChange}
               onBlur={handleOnBlur}
               error={{status: (timeout.field == 'date'), message: appServices.services.localize.getLocalize(timeout.message)}}
               date={{
                 status: true,
                 selected: model.dateSelected,
                 minDate: new Date(ui.isMinDate),
                 options: {date: true, datePattern: ['d', 'm', 'Y']},
                 onChange: (date) => {
                   model.dateSelected = date;
                   handleOnChange({
                     target: {
                       value: appServices.services.helper.getDate(date),
                       name: 'date'
                     }
                   })
                 }
               }}
               disabled={timeout.status}
             />
             <Button.primary
               style={{width: '100%'}}
               text={appServices.services.localize.getLocalize(localizeKey.REGISTER_BUTTON_NEXT)}
               onClick={handleTimeout}
               disabled={timeout.status}
             />
           </form>
         </div>
       </div>
     )
   }

 }
