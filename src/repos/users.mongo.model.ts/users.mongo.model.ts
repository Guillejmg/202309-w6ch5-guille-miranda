import { Schema } from "inspector";
import { User } from "../../entities/user";
import { Schema } from "mongoose";

const UserSchema = new Schema<User>({
  email:{
    type: String,
    required: true,
    unique:  true
  },
  passwd:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true,
  },
  surname: String, // Si solo pones propiedad y tipo es un ataja para cuando solo quieres definir el tipo
  age: Number,
  notes:[
    {
        type:Schema.types.ObjectId,
        ref: 'Notes',
    }
  ]
})

//copia lo que falta del repo de ale

export const UserModel = model('Subjet', UserSchema, 'subjets')//este seria para crear. un subjet
