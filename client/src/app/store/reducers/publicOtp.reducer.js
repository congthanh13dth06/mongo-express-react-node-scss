/**
 * Created By Nguyen Cong Thanh on 05/04/2019 14:08.
 *
 * Copyright Intelin 2019.
 */

import ActionType from '../actions/action.type'

const publicOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionType.PUBLIC_OTP_UPDATE:
      return action.payload;
    default:
      return state
  }
}

export default publicOtpReducer
