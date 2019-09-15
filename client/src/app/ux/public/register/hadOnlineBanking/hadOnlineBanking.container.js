/**
 * Created By Nguyen Cong Thanh on 20/05/2019 17:33.
 *
 * Copyright Intelin 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import RegisterHadOnlineBankingComponent from './hadOnlineBanking.component'

import RegisterAction from '../../../../store/actions/public/register.action'

const mapStateToProps = ({}) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendInfo: (key, data) => {
      dispatch(RegisterAction.sendInfo(key, data))
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterHadOnlineBankingComponent))
