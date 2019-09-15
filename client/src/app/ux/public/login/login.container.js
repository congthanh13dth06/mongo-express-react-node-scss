/**
 * Created By Nguyen Cong Thanh on 08/05/2019 09:23.
 *
 * Copyright Intelin 2019.
 */

import { connect } from 'react-redux';

import LoginComponent from './login.component'

import LoginAction from '../../../store/actions/public/login.action'

const mapStateToProps = () => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
