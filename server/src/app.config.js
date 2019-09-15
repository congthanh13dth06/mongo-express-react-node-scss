/**
 * Created By Nguyen Cong Thanh on 10/09/2019 14:09.
 *
 * Copyright Intelin 2019.
 */

'use strict'

import compression from 'compression'
import helmet from 'helmet'
import bodyParser from 'body-parser'
// import https from 'https'
// import fs from 'fs'
import cors from 'cors';
import logger from 'morgan'

class AppConfig {

  constructor() {
    if (!AppConfig.instance) {
      AppConfig.instance = this
    }
    return AppConfig.instance
  }

  config(app) {
    app.use(helmet());
    app.use(compression());
    app.use(logger('common'))
    app.use(cors({
      origins: '*', // ["http://localhost:3001"]
      // credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      // headers: ['X-Requested-With'],
      allowedHeaders: ["Content-Type"]
    }))
    app.use(bodyParser.json({
      type: 'application/json'
    }));
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use((request, response, next) => {
      console.log('Headers \n', request.headers)
      next()
    })
    app.use((error, request, response, next) => {
      response
        .status(error.status || 500)
        .send('')
    })
  }

}

export default new AppConfig()
