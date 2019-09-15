/**
 * Created By Nguyen Cong Thanh on 10/09/2019 13:53.
 *
 * Copyright Intelin 2019.
 */

'use strict'

import express from 'express'

import config from './config/app.conf.json'
import AppRoutes from './app.routes'
import AppConfig from './app.config'

const app = express();

AppConfig.config(app)
AppRoutes.route(app)

export const start = () => {
  app.listen(process.env.PORT || config.port, () => {
    console.log(`Server running on PORT ${process.env.PORT || config.port}`)
  })
}
