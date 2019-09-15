/**
 * Created By Nguyen Cong Thanh on 10/09/2019 11:26.
 *
 * Copyright Intelin 2019.
 */

'use strict'

import Mongoose from 'mongoose'

import config from '../../config/app.conf.json'

class MongoService {

  constructor() {
    if (!MongoService.instance) {
      // const url = `mongodb://${config.mongoConfig.username}:${config.mongoConfig.password}@${config.mongoConfig.host}:${config.mongoConfig.port}/config.mongoConfig.database`
      // const url = `mongodb://${config.mongoConfig.host}:${config.mongoConfig.port}/${config.mongoConfig.database}`
      // Mongoose.Promise = Promise;
      // Mongoose.connect(url, {useMongoClient: true, promiseLibrary: Promise})
      //   .then(() => {
      //     console.log('Connection mongodb successfull')
      //   })
      //   .catch((err) => console.error(err));
      // this.connection = Mongoose
      MongoService.instance = this
    }
    return MongoService.instance
  }

  getConnection() {
    return this.connection
  }

}

export default new MongoService();
