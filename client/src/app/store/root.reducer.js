/**
 * Created By Nguyen Cong Thanh on 03/04/2019 15:33.
 *
 * Copyright Intelin 2019.
 */

import { combineReducers } from 'redux'

import messageCenterReducer from './reducers/messageCenter.reducer'
import publicOtpReducer from './reducers/publicOtp.reducer'

export default combineReducers({
  messageCenterReducer,
  publicOtpReducer,
})
