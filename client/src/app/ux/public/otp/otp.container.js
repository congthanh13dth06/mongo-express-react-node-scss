/**
 * Created By Nguyen Cong Thanh on 13/05/2019 13:42.
 *
 * Copyright Intelin 2019.
 */

import { connect } from 'react-redux';

import OtpComponent from './otp.component'

import PublicOtpAction from '../../../store/actions/public/otp.action'

const mapStateToProps = ({ messageCenterReducer, publicOtpReducer }) => {
  return {
    messageCenterReducer: messageCenterReducer,
    publicOtpReducer: publicOtpReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    resend: (otpKey) => {
      dispatch(PublicOtpAction.resend(otpKey))
    },
    send: (key, data) => {
      dispatch(PublicOtpAction.send(key, data))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OtpComponent)
