// Libraries
import express from 'express'

// Middleware
import validator from '../middleware/validator/users.validator'
import serializer from '../middleware/serializer/users.serizalizer'
import { idAsInt } from '../middleware/validator/generic.validator'

// Controller
import UserController from '../controller/users.controller'

const Router = express.Router()

Router.get('/', UserController.get, serializer)
Router.get('/:id', idAsInt, UserController.detail, serializer)
Router.post('/', validator, UserController.post, serializer)
Router.put('/:id', idAsInt, validator, UserController.put)
Router.delete('/:id', idAsInt, UserController._delete)

export default Router
