/**
 * Created By Nguyen Cong Thanh on 13/05/2019 08:51.
 *
 * Copyright Intelin 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import ForgotMainComponent from './main.component'

import ForgotActon from '../../../../store/actions/public/forgot.action'

const mapStateToProps = ({ messageCenterReducer }) => {
  return {
    messageCenterReducer: messageCenterReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendInfo: (key, data) => {
      dispatch(ForgotActon.sendInfo(key, data))
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotMainComponent))
