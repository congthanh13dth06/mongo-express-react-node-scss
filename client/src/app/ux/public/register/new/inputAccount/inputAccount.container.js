/**
 * Created By Nguyen Cong Thanh on 20/05/2019 16:41.
 *
 * Copyright Intelin 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import InputAccountComponent from './inputAccount.component'

import RegisterAction from '../../../../../store/actions/public/register.action'

const mapStateToProps = ({ messageCenterReducer, publicOtpReducer }) => {
  return {
    messageCenterReducer: messageCenterReducer,
    publicOtpReducer: publicOtpReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendAccount: (key, data) => {
      dispatch(RegisterAction.sendAccount(key, data))
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputAccountComponent))
