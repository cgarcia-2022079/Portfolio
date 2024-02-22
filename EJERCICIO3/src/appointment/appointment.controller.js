'use strict'
import Animal from '../animal/animal.model.js'
import Appointment from '../appointment/appointment.model.js'
export const add = async (req, res)=>{
    try {
        //CAPTURAR LA DATA
        let data = req.body
        data.user = req.user._id
        //VERIFICAR QUE EXISTA EL ANIMAL
        let animal = await Animal.findOne({_id:data.animal})
        if (!animal) return res.status(404).send({message:'Animal not found'})
        //VALIDAR QUE LA MASCOTA NO TENGA UNA CITA ACTIVA CON ESA PERSONA
        let appointmentExist = await Appointment.findOne({
            $or: [
                {   
                    animal: data.animal,
                    user: data.user
                },
                {
                    date: data.date,
                    user: data.user
                }   
            ]
        })
        if (appointmentExist) return res.send({message:'Appointment already exist'})
        //EJERCICIO <- Que solo pueda tener una cita por dia
        //GUARDAR
        let appointment = new Appointment(data)
        await appointment.save()
        return res.status(200).send({message:`Appointment saved successfully, for the date ${appointment.date}`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error saving appointment', error})
    }
}