'use strict'

import {Router} from "express"
import {addAnimal, deleteAnimal, updateAnimal, dataAnimals, searchAnimal} from './animal.controller.js'
import {validateJwt, isAdmin} from '../middlewares/validate-jwt.js'
const api = Router()

//ROLE ADMIN
api.post('/save',[validateJwt, isAdmin], addAnimal)
api.delete('/delete/:id',[validateJwt, isAdmin], deleteAnimal)
api.put('/update/:id',[validateJwt, isAdmin], updateAnimal)

//ROLE CLIENT
api.get('/get', [validateJwt], dataAnimals)
api.post('/search',[validateJwt], searchAnimal)
export default api