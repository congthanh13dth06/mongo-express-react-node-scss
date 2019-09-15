/**
 * Created By Nguyen Cong Thanh on 10/09/2019 14:16.
 *
 * Copyright Intelin 2019.
 */

'use strict'

// import UserModel from './user.model'

class UserController {

  constructor() {
    if (!UserController.instance) {
      // this.UserModel = UserModel
      UserController.instance = this
    }
    return UserController.instance
  }

  async getAll(request, response, next) {
    try {
      // const result = await this.UserModel.find().exec()
      // response
      //   .status(200)
      //   .json(JSON.stringify(result))
      //
      response
        .status(200)
        .json(JSON.stringify("Hello World"))
    } catch (e) {
      response
        .status(500)
        .json({error: e.toString()});
    }
  }

  async getUserById(request, response, next) {
    try {
      // const result = await this.UserModel.findById(request.params.id).exec();
      const result = ''
      response
        .status(200)
        .json(result)
    } catch (e) {
      response
        .status(500)
        .json({error: e.toString()});
    }
  }

  async create(request, response, next) {
    try {
      // const user = new this.UserModel(request.body);
      // const result = await user.save()
      const result = ''
      response
        .status(200)
        .json(JSON.stringify(result))
    } catch (e) {
      response
        .status(500)
        .json({error: e.toString()});
    }
  }

}

export default new UserController()
