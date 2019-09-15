/**
 * Created By Nguyen Cong Thanh on 20/05/2019 10:51.
 *
 * Copyright Intelin 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import RegisterMainComponent from './main.component'

import RegisterAction from '../../../../store/actions/public/register.action'

const mapStateToProps = ({messageCenterReducer}) => {
  return {
    messageCenterReducer: messageCenterReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendInfo: (key, data) => {
      dispatch(RegisterAction.sendInfo(key, data))
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterMainComponent))
