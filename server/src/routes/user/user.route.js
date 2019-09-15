/**
 * Created By Nguyen Cong Thanh on 10/09/2019 14:44.
 *
 * Copyright Intelin 2019.
 */

'use strict'

import { Router } from 'express';
import UserController from './user.controller'
import UserValidation from './user.validation'

const router = Router();

router
  .get('/', UserController.getAll.bind(UserController))
  .get('/:id', UserController.getUserById.bind(UserController))
  .post('/', UserController.create.bind(UserController))

export default router
