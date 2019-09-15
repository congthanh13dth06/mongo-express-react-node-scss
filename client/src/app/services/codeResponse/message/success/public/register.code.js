import LocalizeService from '../../../../localize/localize.service'
import LocalizeKey from '../../../../constants/localize'

const CODE_SUCCESS = {}

CODE_SUCCESS[CODE_SUCCESS["CREATE_TEMP_USER_WITHOUT_ONLINE_BANKING_SUCCESS"] = 'REGISTER_2001'] = 'Create new temp user success, but required online banking register'
CODE_SUCCESS[CODE_SUCCESS["CREATE_TEMP_USER_SUCCESS"] = 'REGISTER_2000'] = 'Create new temp user success, waiting for otp'
CODE_SUCCESS[CODE_SUCCESS["UPDATE_TEMP_USER_SUCCESS"] = 'REGISTER_2006'] = 'Update temp user success, waiting for update info on bank'
CODE_SUCCESS[CODE_SUCCESS["UPDATE_TEMP_USER_FROM_EXISTED_USER_SUCCESS"] = 'REGISTER_2002'] = 'Update temp user success, waiting for first login'
CODE_SUCCESS[CODE_SUCCESS["CREATE_MEETING_SCHEDULE_SUCCESS"] = 'REGISTER_2003'] = 'Create meeting schedule for register'
CODE_SUCCESS[CODE_SUCCESS["ADMIN_UPDATE_TEMP_USER_SUCCESS"] = 'REGISTER_2004'] = 'Admin update info temp user success'
CODE_SUCCESS[CODE_SUCCESS["ADMIN_APPROVE_USER_SUCCESS"] = 'REGISTER_2005'] = 'Admin approve user success'

export default CODE_SUCCESS
