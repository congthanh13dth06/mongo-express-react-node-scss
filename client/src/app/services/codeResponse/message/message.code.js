/**
 * Created By Nguyen Cong Thanh on 23/04/2019 10:02.
 *
 * Copyright Intelin 2019.
 */

import SuccessCode from './success.code'
import CodeError from './error.code'

const messageCode = {
  ...SuccessCode,
  ...CodeError
}

export default messageCode
