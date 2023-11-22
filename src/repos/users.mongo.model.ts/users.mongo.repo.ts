import { Repository } from "../repo";
import { HttpError } from "../../types/http.error.js";
import { UserModel } from "./users.mongo.model.js";
import { LoginUser, User } from "../../entities/user.js";
import createDebug from 'debug'
import { error } from "console";
import { Auth } from "../../services/auth.js";

const debug = createDebug('')
export class SubjetsMongoRepo implements Repository<User>{

constructor(){
  debug = ('Initiated')
}

  async create(newItem: Omit<User, "id">): Promise<User> {

    newItem.passwd = await Auth.compare
    const result: User = await UserSchema.create(newItem)
    return result;
  }

  async login (loginUser: LoginUser): Promise<User> {
    const results = await UserModel.findOne({email: loginUser.email}).exec(); // Estto te devuelve un array por que es un metodo filtter que no sabe si te va a devolver un solo elemento o varios, hay unas variantes de  find que solo te devuelve uno y no seria un array como findOne y lo tratarias de otra manera(en vez del lenght seria solo result!)
    /* If(!results) throw new HttpError(401, 'unauthorized');
    if(results.passwd !== loginUser.passwd) */

   /* if(!results || results.passwd !== loginUser.passwd) throw new HttpError(401, 'unauthorized');
  } */

  if(!results ||  await Auth.compare(loginUser.passwd,results.passwd )) throw new HttpError(401, 'unauthorized'); // Implementamos la encriptacion
  

} 
  async getAll(): Promise<User[]> { // Este lo hacemos por nuestra utilidad para ver los cambios que hemos implementado
    const data = await UserModel.find()
    return data;
  }

 

  
  
  async update(id: number, updatedItem: Partial<KnowledgeStructure>): Promise<KnowledgeStructure> {
    let result = await SubjetModel.findByIdAndUpdate(id, updatedItem, {new : true});
    return result;
  }

  async delete(id: ["id"]): Promise<void> {
    const result = await SubjetModel.findByIdAndDelete(id)
    
    if (!result){
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }// no retorno nada por que no quiero. un objeto vacio
  }
  
}
