/**
 * Created By Nguyen Cong Thanh on 20/05/2019 16:41.
 *
 * Copyright Intelin 2019.
 */
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import InputPhoneComponent from './inputPhone.component'

import RegisterAction from '../../../../../store/actions/public/register.action'

const mapStateToProps = ({messageCenterReducer}) => {
  return {
    messageCenterReducer: messageCenterReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendPhone: (key, data) => {
      dispatch(RegisterAction.sendPhone(key, data))
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputPhoneComponent))
