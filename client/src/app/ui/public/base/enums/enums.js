class Enums {
  constructor() {
    if (!Enums.instance) {
      this.button = {
        primary: 'primary',
        warning: 'warning',
        danger: 'danger',
        success: 'success',
      };
      Enums.instance = this
    }
    return Enums.instance
  }
}

export default new Enums();
