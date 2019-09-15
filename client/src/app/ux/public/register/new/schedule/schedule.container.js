/**
 * Created By Nguyen Cong Thanh on 20/05/2019 17:17.
 *
 * Copyright Intelin 2019.
 */
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import ScheduleComponent from './schedule.component'

import RegisterAction from '../../../../../store/actions/public/register.action'

const mapStateToProps = ({ messageCenterReducer}) => {
  return {
    messageCenterReducer: messageCenterReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendSchedule: (key, data) => {
      dispatch(RegisterAction.sendSchedule(key, data))
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScheduleComponent))
