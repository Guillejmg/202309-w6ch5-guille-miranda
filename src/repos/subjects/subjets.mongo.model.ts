import { Schema } from "inspector";
import { KnowledgeStructure } from "../../entities/knowledge";

const subjetSchema = new Schema<KnowledgeStructure>({
  title:{
    type: String,
    required: true,
    unique:  true
  },
  author:{ 
    type: String,// Si este fuera el user lo relaconariamos con la coleccion users cambiando string por por el tipo schema.types.objetId y cambiaria la propiedad required por la propiedad ref:'User',
    required: true
  },
  isImportant:{
    type: Boolean,
    required: true,
    default: false
  }
})

//copia lo que falta del repo de ale

export const SubjetModel = model('Subjet', subjetSchema, 'subjets')//este seria para crear. un subjet
