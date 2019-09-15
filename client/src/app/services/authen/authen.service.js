/**
 * Created By Nguyen Cong Thanh on 08/05/2019 10:25.
 *
 * Copyright Intelin 2019.
 */

import AuthenType from './authen.type'

class AuthenService {

  constructor() {
    if (!AuthenService.instance) {
      this.type = AuthenType
      this.isAuthenticated = this.type.PUBLIC
      AuthenService.instance = this
    }
    return AuthenService.instance
  }

  getRedirect() {
    return this.type[this.isAuthenticated] || this.type.NOT_FOUND
  }

  getAuthen() {
    return this.isAuthenticated
  }

  setAuthen(state) {
    this.isAuthenticated = state;
  }

}

export default new AuthenService()
