'use strict'

import { Schema, model} from "mongoose"

const appointmentSchema = new Schema({
    date: {type: Date, required: true},
    status: {type: String,
        enum: ['CREATED','ACCEPTED', 'CANCELLED',  'COMLETED'],
        default: 'CREATED',
        required: true},
    animal: {
        type: Schema.ObjectId,
        ref: 'animal',
        required: true
    }, 
    user:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false //quita manejo de versiones de mongoDB
})

export default model('appointment', appointmentSchema)