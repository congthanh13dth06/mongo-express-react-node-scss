/**
 * Created By Nguyen Cong Thanh on 10/09/2019 13:51.
 *
 * Copyright Intelin 2019.
 */

'use strict'

import express from 'express'
import path from 'path'

import UserRoute from './routes/user/user.route'

class AppRoutes {

  constructor() {
    if (!AppRoutes.instance) {
      AppRoutes.instance = this
    }
    return AppRoutes.instance
  }

  route(app) {
    app.use(express.static(path.resolve(__dirname, 'build')));
    app.use('/api/user', UserRoute)
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
  }

}

export default new AppRoutes()
