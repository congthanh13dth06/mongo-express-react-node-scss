/**
 * Created By Nguyen Cong Thanh on 11/04/2019 11:29.
 *
 * Copyright Intelin 2019.
 */

import CryptoJS from 'crypto-js'
import JSEncrypt from '../../../assets/js/rsa/jsencrypt.min'

import EnvConfig from '../../../config/env.conf'

class HelperService {

  constructor() {
    if (!HelperService.instance) {
      this.rsaKey = EnvConfig[EnvConfig.CURRENT].RSA_KEY
      HelperService.instance = this
    }
    return HelperService.instance
  }

  hashMD5(string = '') {
    return CryptoJS.MD5(string).toString()
  }

  hashSHA256(string) {
    return CryptoJS.SHA256(string).toString()
  }

  hashRSA(password) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(this.rsaKey)
    return encrypt.encrypt(password);
  }

  generateKey() {
    return this.hashMD5(this.hashMD5(`${new Date().getTime()}-${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}-${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}-${new Date().getTime()}`))
  }

  encodeBase64(string) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      (match, p1) => {
        return String.fromCharCode('0x' + p1);
      }));
  }

  decodeBase64(string) {
    return decodeURIComponent(atob(str).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  delay(ms) {
    return new Promise(res => setTimeout(res, ms))
  }

  getDate(time) {
    const date = new Date(time)
    const day = ((date.getDate()) < 10) ? `0${(date.getDate())}` : (date.getDate())
    const month = ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    return `${day}/${month}/${date.getFullYear()}`
  }

  formatDate(time) {
    const temp = time.split('/') // dd/MM/YYYY
    return new Date(`${temp[2]}/${temp[1]}/${temp[0]}`)
  }

  isNotEmpty(value) {
    try {
      if (typeof value === 'undefined') {
        throw new AppError('')
      }
      if (value === null) {
        throw new AppError('')
      }
      if (value === '') {
        throw new AppError('')
      }
      return true
    } catch (e) {
      return false
    }
  }
}

export default new HelperService()
