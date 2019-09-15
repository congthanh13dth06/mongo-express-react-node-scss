/**
 * Created By Nguyen Cong Thanh on 14/09/2019 20:53.
 *
 * Copyright Intelin 2019.
 */

import LocalizeKey from '../../constants/localize'

const CODE_SUCCESS = {}

// Login
// CODE_SUCCESS[CODE_SUCCESS["FIRST_LOGIN_SUCCESS"] = '2000'] = 'Username is corrected'
CODE_SUCCESS[CODE_SUCCESS["LOGIN_USERNAME_SUCCESS"] = 'LOGIN_2000'] = 'Username is corrected'
CODE_SUCCESS[CODE_SUCCESS["LOGIN_PASSWORD_SUCCESS"] = 'LOGIN_2001'] = 'Password login success'

// Register
CODE_SUCCESS[CODE_SUCCESS["REGISTER_CREATE_TEMP_USER_WITHOUT_ONLINE_BANKING_SUCCESS"] = 'REGISTER_2001'] = 'Create new temp user success, but required online banking register'
CODE_SUCCESS[CODE_SUCCESS["REGISTER_CREATE_TEMP_USER_SUCCESS"] = 'REGISTER_2000'] = 'Create new temp user success, waiting for otp'
CODE_SUCCESS[CODE_SUCCESS["REGISTER_UPDATE_TEMP_USER_SUCCESS"] = 'REGISTER_2006'] = 'Update temp user success, waiting for update info on bank'
CODE_SUCCESS[CODE_SUCCESS["REGISTER_UPDATE_TEMP_USER_FROM_EXISTED_USER_SUCCESS"] = 'REGISTER_2002'] = 'Update temp user success, waiting for first login'
CODE_SUCCESS[CODE_SUCCESS["REGISTER_CREATE_MEETING_SCHEDULE_SUCCESS"] = 'REGISTER_2003'] = 'Create meeting schedule for register'
CODE_SUCCESS[CODE_SUCCESS["REGISTER_ADMIN_UPDATE_TEMP_USER_SUCCESS"] = 'REGISTER_2004'] = 'Admin update info temp user success'
CODE_SUCCESS[CODE_SUCCESS["REGISTER_ADMIN_APPROVE_USER_SUCCESS"] = 'REGISTER_2005'] = 'Admin approve user success'

// Forgot
CODE_SUCCESS[CODE_SUCCESS["FORGOT_SEND_INFO_SUCCESS"] = '0'] = 'Forgot send info success'
CODE_SUCCESS[CODE_SUCCESS["FORGOT_SEND_PASSWORD_SUCCESS"] = 'PASSWORD_2000'] = 'Forgot send password success'
CODE_SUCCESS[CODE_SUCCESS["FORGOT_GET_USERNAME"] = 'USERNAME_2000'] = 'Forgot get username success'

// Public otp
CODE_SUCCESS[CODE_SUCCESS["OTP_REQUIRE_SUCCESS"] = 'OTP_2000'] = 'Create otp success'
CODE_SUCCESS[CODE_SUCCESS["OTP_NOT_REQUIRE_SUCCESS"] = 'OTP_2001'] = 'Not require OTP'
CODE_SUCCESS[CODE_SUCCESS["OTP_SUBMIT_SUCCESS"] = 'OTP_2002'] = 'Submit otp success'
CODE_SUCCESS[CODE_SUCCESS["OTP_RESEND_SUCCESS"] = 'OTP_2003'] = 'Resend otp success'



export default CODE_SUCCESS
