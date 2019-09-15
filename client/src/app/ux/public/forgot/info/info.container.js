/**
 * Created By Nguyen Cong Thanh on 17/05/2019 16:33.
 *
 * Copyright Intelin 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import ForgotInfoComponent from './info.component'

import ForgotActon from '../../../../store/actions/public/forgot.action'

const mapStateToProps = ({ messageCenterReducer, publicOtpReducer}) => {
  return {
    messageCenterReducer: messageCenterReducer,
    publicOtpReducer: publicOtpReducer,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendPassword: (key, data) => {
      dispatch(ForgotActon.sendPassword(key, data))
    },
    getUsername: (key, data) => {
      dispatch(ForgotActon.getUsername(key, data))
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotInfoComponent))
