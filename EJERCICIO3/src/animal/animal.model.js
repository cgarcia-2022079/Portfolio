'Use strict'
import {Schema, model} from 'mongoose'

const animalSchema = Schema({
    name:{
        type: String,
        required: true
    },
    race:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    type:{
        type:String, 
        required: true
    },
    character:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    keeper:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
})

export default model('animal', animalSchema)