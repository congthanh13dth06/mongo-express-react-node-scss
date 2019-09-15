/**
 * Created By Nguyen Cong Thanh on 04/04/2019 09:34.
 *
 * Copyright Intelin 2019.
 */

import { all } from 'redux-saga/effects'

import PublicLoginSaga from './sagas/public/login.saga'
import PublicOtpSaga from './sagas/public/otp.saga'
import PublicForgotSaga from './sagas/public/forgot.saga'
import PublicRegistertSaga from './sagas/public/register.saga'

export default function* rootSaga() {

  yield all([
    PublicLoginSaga.watchCheckUsername(),
    PublicLoginSaga.watchCheckPassword(),
    PublicLoginSaga.watchTrustDevice(),

    PublicOtpSaga.watchResend(),
    PublicOtpSaga.watchSend(),

    PublicForgotSaga.watchSendInfo(),
    PublicForgotSaga.watchSendPassword(),
    PublicForgotSaga.watchGetUsername(),

    PublicRegistertSaga.watchSendInfo(),
    PublicRegistertSaga.watchSendPhone(),
    PublicRegistertSaga.watchSendAccount(),
    PublicRegistertSaga.watchSendSchedule(),
  ])

}
