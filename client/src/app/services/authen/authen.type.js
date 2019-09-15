/**
 * Created By Nguyen Cong Thanh on 08/05/2019 10:25.
 *
 * Copyright Intelin 2019.
 */

import Router from '../constants/router'

const AUTHEN_TYPE = {}

AUTHEN_TYPE["NOT_FOUND"] = Router.NOT_FOUND
AUTHEN_TYPE[AUTHEN_TYPE["PUBLIC"] = 'ROLE_PUBLIC'] = `${Router.PUBLIC}${Router.LOGIN}`
AUTHEN_TYPE[AUTHEN_TYPE["USER"] = 'ROLE_USER'] = `${Router.USER}${Router.TIMELINE}`

export default AUTHEN_TYPE
