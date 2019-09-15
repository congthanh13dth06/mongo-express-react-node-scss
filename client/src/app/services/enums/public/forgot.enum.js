/**
 * Created By Nguyen Cong Thanh on 16/05/2019 14:17.
 *
 * Copyright Intelin 2019.
 */

import LocalizeKey from '../../constants/localize'

const FORGOT_ENUM = {}

FORGOT_ENUM['IDENTITY_DOCUMENT'] = [
  {
    value: 1,
    text: LocalizeKey.FORGOT_IDENTITY_CARD
  },
  {
    value: 3,
    text: LocalizeKey.FORGOT_CITIZEN_CARD
  },
  {
    value: 2,
    text: LocalizeKey.FORGOT_PASSPORT
  },
]

export default FORGOT_ENUM
