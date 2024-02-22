"use strict";
import Animal from "./animal.model.js";
import User from "../user/user.model.js";
import { checkUpdate } from "../utils/validator.js";
export const test = (req, res) => {
  return res.send("Hello Word");
};

export const addAnimal = async (req, res) => {
  try {
    //Capturar la data
    let data = req.body;
    //Validar que el Keeper exista (buscar en BD)
    let user = await User.findOne({ _id: data.keeper });
    if (!user) return res.status(404).send({ message: "Keeper not found" });
    //Crear la 'instancia' del animal
    let animal = new Animal(data);
    //Guardar el animal
    await animal.save();
    //Responder si todo sale bien
    return res.send({ message: "Animal saved succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error registering animal", error });
  }
};

export const deleteAnimal = async (req, res) => {
  try {
    let { id } = req.params;
    //Elimina y devuelve el documento eliminado el findoneanddelete
    //Elimina y no devuelve el documento el deleteOne
    let deleteAnimal = await Animal.deleteOne({ _id: id });
    if (!deleteAnimal.deletedCount == 0) return res.status(404).send({mesagge: 'Animal not found, not deleted'})
    return res.send({message: 'Delete animal successfully'})
} catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error deleting animal", error });
  }
};

export const updateAnimal = async (req, res) => {
  try {
    //A quien voy a actualizat
    let { id } = req.params;
    //Capturar la data
    let data = req.body;
    //Validar que vengan datos
    let update = checkUpdate(data, false);
    if (!update) return res.status(400).send({ message: "Have submitted some data that cannot be uplated or missing data" });
    //Actualizar
    let updateAnimal = await Animal.findOneAndUpdate({ _id: id }, data, {
      new: true,
    }).populate("keeper", ["name", "phone"]);
    //Validar la actualizacion
    if (!updateAnimal)
      return res
        .status(401)
        .send({ message: "Animal not found and not update" });
    //Responder si todo sale bien
    return res.send({ message: "Update animal", updateAnimal });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error updating account", error });
  }
};

export const dataAnimals = async (req, res) => {
  try {
    let animals = await Animal.find().populate('keeper', ['name', 'phone']);
    if (!animals.length === 0)
      return res.status(404).send({ message: "Not found" });
    return res.status(200).send({ animals });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error when searching" });
  }
};

export const searchAnimal = async (req, res) => {
  try {
    //Obtener parametro de busqueda
    let { search } = req.body;
    let animals = await Animal.find({name:search}).populate('keeper', ['name', 'phone'])
    if (animals.length == 0) {
      return res.status(404).send({ message: "No data for this name" });
    }
    return res.send({message: 'Animals found', animals})
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error when searching" });
  }
};
