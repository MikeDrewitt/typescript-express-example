import express, { Request, Response, NextFunction } from 'express'

import status from './status.router'
import users from './users.router'

import { NotFound } from '../utils/apiResponse.utils'

const Router = express.Router()

Router.use('/status', status)
Router.use('/users', users)

Router.use('/', (req: Request, res: Response, next: NextFunction) => res.status(404).send(NotFound))

export default Router
