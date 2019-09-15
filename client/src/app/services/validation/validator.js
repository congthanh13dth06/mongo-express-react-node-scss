/**
 * Created By Nguyen Cong Thanh on 08/04/2019 12:01.
 *
 * Copyright Intelin 2019.
 */

import Moment from 'moment'
import AppError from './error'
import Helper from '../helper/helper.service'

class ValidatorService {

  constructor() {
    if (!ValidatorService.instance) {
      ValidatorService.instance = this
    }
    return ValidatorService.instance
  }

  validate(field, value, rules, messages) {
    try {
      if (!Array.isArray(rules)) {
        throw new AppError(field, 'rules is not array')
      }
      if (!Array.isArray(messages)) {
        throw new AppError(field, 'messages is not array')
      }
      rules.map((rule, index) => {
        this[rule](field, value.trim(), messages[index])
      })
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isString(field, value, message) {
    try {
      value = value.trim()
      if (typeof value !== 'string') {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isNotEmpty(field, value, message) {
    try {
      if (typeof value === 'undefined') {
        throw new AppError(field, message)
      }
      if (value === null) {
        throw new AppError(field, message)
      }
      if (value === '') {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isNumber(field, value, message) {
    try {
      if (typeof value !== 'number') {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isArray(field, value, message) {
    try {
      if (!Array.isArray(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isObject(field, value, message) {
    try {
      this.isNotEmpty(field, value, message)
      if (typeof value !== "object") {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isUsername(field, value, message) {
    try {
      const regex = new RegExp(/^[a-zA-Z0-9@\.\-_]{6,45}/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isPassword(field, value, message) {
    try {
      const regex = new RegExp(/^[a-zA-Z0-9\[\]!"#&$%'()*+,.\/:;<=>?@^_`{|}~\-\\]{6,35}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isPhoneNumber(field, value, message) {
    try {
      const regex = new RegExp(/^[a-z0-9]{10,13}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isIdentityNo(field, value, message) {
    try {
      const regex = new RegExp(/^[a-zA-Z0-9]{8,12}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isFullName(field, value, message) {
    try {
      const regex = new RegExp(/^(?=.*[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ])(?=.*[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ])[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\d\s\/_,.-]{1,45}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isDate(field, value, message) {
    try {
      // value dd/MM/YYYY
      const regex = new RegExp(/(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isDateRegisterBooking(field, value, message) {
    try {
      // value dd/MM/YYYY
      const date = Helper.formatDate(value).getTime()
      const now = new Date().getTime()
      if (date < now) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  isEmail(field, value, message){
    const regex = new RegExp(/^([\w-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
    if (!regex.test(value)) {
      throw new AppError(field, message)
    }
  }
  
  // isProperty(object, property) {
  //   try {
  //     this.isObject(object)
  //     this.isNotEmpty(property)
  //     if (!object.hasOwnProperty(property)) {
  //       throw new Error('Object is not property')
  //     }
  //   } catch (e) {
  //     throw new Error(e.message)
  //   }
  // }

}

export default new ValidatorService()
