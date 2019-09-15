/**
 * Created By Nguyen Cong Thanh on 07/05/2019 17:45.
 *
 * Copyright Intelin 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import UserComponent from './user.component'

// import CounterAction from '../../store/actions/counter'

const mapStateToProps = ({}) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserComponent))
