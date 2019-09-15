/**
 * Created By Nguyen Cong Thanh on 24/04/2019 10:52.
 *
 * Copyright Intelin 2019.
 */

import ActionType from '../actions/action.type'

const messageCenterReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionType.MESSAGE_CENTER_UPDATE:
      return action.payload;
    default:
      return state
  }
}

export default messageCenterReducer
