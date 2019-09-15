/**
 * Created By Nguyen Cong Thanh on 04/09/2019 09:38.
 *
 * Copyright Intelin 2019.
 */

import ThemeConf from '../../../../../config/theme.conf.json'

class ThemeColor {

  constructor() {
    if (!ThemeColor.instance) {
      this.config = ThemeConf
      this.theme = this.config[this.config.current]
      ThemeColor.instance = this
    }
    return ThemeColor.instance
  }

  get() {
    return this.theme || this.config[this.config.current]
  }

  set(theme) {
    theme = theme.toString()
    this.theme = this.config[theme]
  }

}

export default new ThemeColor();
