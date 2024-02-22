'use strict'

import express from 'express'
import {validateJwt, isAdmin} from '../middlewares/validate-jwt.js'
import {login, test, register, deleteUser, updateUser} from './user.controller.js'

const api = express.Router()
//Middlewares
//ROLE ADMIN
api.get('/test', [validateJwt, isAdmin], test) //<- Solo si esta logueado
//ROLE CLIENT/ADMIN
api.put('/update/:id',[validateJwt], updateUser)
api.delete('/delete/:id', [validateJwt],deleteUser)

//ROLE PUBLIC
api.post('/register', register)
api.post('/login', login)
export default api
//export const api //<- tengo si o si el nombre que esta en este archivo
//export default api //<- importar con otro nombre