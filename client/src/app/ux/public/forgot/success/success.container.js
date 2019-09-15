/**
 * Created By Nguyen Cong Thanh on 20/05/2019 09:48.
 *
 * Copyright Intelin 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import ForgotSuccessComponent from './success.component'

import ForgotActon from '../../../../store/actions/public/forgot.action'

const mapStateToProps = ({}) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotSuccessComponent))
