import { Schema, model } from "mongoose";
import { ManualStructure } from "../../entities/manual";

const manualSchema = new Schema<ManualStructure>({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name:{ 
    type: String,// Si este fuera el user lo relaconariamos con la coleccion users cambiando string por por el tipo schema.types.objetId y cambiaria la propiedad required por la propiedad ref:'User',
    required: true,
    unique:  true,
  },
  ingredients:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  notes:{
    type: String,
  },
  onMenu:{
    type: Boolean,
    required: true,
    default: false,
  }
})

manualSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const manualModel = model('Manual', manualSchema, 'manuals') // Este seria para crear. un subjet
