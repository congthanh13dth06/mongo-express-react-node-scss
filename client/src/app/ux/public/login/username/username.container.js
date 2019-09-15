/**
 * Created By Nguyen Cong Thanh on 12/09/2019 17:56.
 *
 * Copyright Intelin 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import UsernameComponent from './username.component'

import LoginAction from '../../../../store/actions/public/login.action'

const mapStateToProps = ({messageCenterReducer}) => {
  return {
    messageCenterReducer: messageCenterReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkUsername: (key, username) => {
      dispatch(LoginAction.checkUserName(key, username))
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsernameComponent))
