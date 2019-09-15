/**
 * Created By Nguyen Cong Thanh on 09/04/2019 17:18.
 *
 * Copyright Intelin 2019.
 */

export default class AppError extends Error {

  constructor(field, message) {
    super(field, message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Error);
    }
    this.field = field;
    this.message = message;
  }

}
