/**
 * Created By Nguyen Cong Thanh on 20/05/2019 16:41.
 *
 * Copyright Intelin 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import NotiComponent from './noti.component'

// import CounterAction from '../../store/actions/counter'

const mapStateToProps = ({}) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotiComponent))
