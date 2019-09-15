/**
 * Created By Nguyen Cong Thanh on 11/04/2019 14:30.
 *
 * Copyright Intelin 2019.
 */

import AppConfig from '../../../config/app.conf.json'
import ValidatorService from '../validation/validator.js'

//import file localize
const files = ["common", "public/login", "public/otp", "public/forgot", "public/register", "public/modal"]

const mergeLocalize = (langs) => {
  let data = {}
  langs.map((lang) => {
    data[lang.key] = {}
    files.map((file) => {
      const localize = require(`../../../assets/localize/${file}/${lang.key}.json`)
      data[lang.key] = Object.assign({}, data[lang.key], localize)
    })
  })
  return data
}

class LocalizeService {

  constructor() {
    if (!LocalizeService.instance) {
      this.langCurrent = AppConfig.LOCALIZE.CURRENT
      this.lang = AppConfig.LOCALIZE.LANGUAGE
      this.data = mergeLocalize(this.lang)
      this.getLocalize = this.getLocalize.bind(this)
      LocalizeService.instance = this
    }
    return LocalizeService.instance
  }

  changeLanguage() {
    const lang = this.lang.find((item, key) => item.key != this.langCurrent)
    this.langCurrent = lang.key
  }

  getLocalize(key) {
    try {
      ValidatorService.isNotEmpty('key', key, 'Key is empty')
      return this.data[this.langCurrent][key] || '-'
    } catch (e) {
      return ''
    }
  }

}

export default new LocalizeService()
