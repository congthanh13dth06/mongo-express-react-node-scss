/**
 * Created By Nguyen Cong Thanh on 22/05/2019 11:20.
 *
 * Copyright Intelin 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import NotiSuccessComponent from './notiSuccess.component'

// import CounterAction from '../../store/actions/counter'

const mapStateToProps = ({}) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotiSuccessComponent))
