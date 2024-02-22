'use strict'

import {Router} from 'express'
import {add} from './appointment.controller.js'
import {validateJwt} from '../middlewares/validate-jwt.js'
const api = Router()

//Rutas privadas - CLIENT
api.post('/save',[validateJwt], add)

export default api