import { ManualStructure } from "../../entities/manual";
import { Repository } from "../repo";
import { HttpError } from "../../types/http.error";
import { manualModel } from "./manual.mongo.model";
import { UserMongoRepo } from "../users/users.mongo.repo";
import createDebug from "debug";


const debug = createDebug('W7E:manual:mongo:repo');
export class ManualMongoRepo implements Repository<ManualStructure>{
userRepo: UserMongoRepo;
constructor(){
  this.userRepo = new UserMongoRepo();
    debug('Instantiated');
}

  async getAll(): Promise<ManualStructure[]> {
    const result = await manualModel.find()
      .populate('author', {
        notes: 0,
      })
      .exec();
    return result;
  }

  async getById(id: string): Promise<ManualStructure> {
    const result = await manualModel.findById(id)
      .populate('employee', {
        notes: 0,
      })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result; // Como puede ser null en vez de id hay que ponerle el httperror e igual para los siguientes
  }

  async search({
    key,
    value,
  }: {
    key: keyof ManualStructure;
    value: any;
  }): Promise<ManualStructure[]> {
    const result = await manualModel.find({ [key]: value })
      .populate('employee', {
        notes: 0,
      })
      .exec();

    return result;
  }

  async create(newItem: Omit<ManualStructure, 'id'>): Promise<ManualStructure> {// Aqui si hubiese algun error se dispararia ya en el controller

    const userID = newItem.employee.id;//obtenfgo el id del usuario
    const user = await this.userRepo.getById(userID);//compruebo si el usuario existe, si no existe el error se tira del getbyid
    const result: ManualStructure = await manualModel.create(...newItem, employee: userID);//aqui creo la nota, la ultima linea es que mongoose solo quiere el id.del autor para hacer la nota
    user.notes.push(result);//actualizo el array de notas del usuario 
    await this.userRepo.update(userID, user);//guarda esta actualizacion
    return result;// Esto ya no va aqui
  }
  
  async update(id: string, updatedItem: Partial<ManualStructure>): Promise<ManualStructure> {
    const result = await manualModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    })
      .populate('employee', {
        notes: 0,
      })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await manualModel.findByIdAndDelete(id)
    .populate('employee', {
      notes:0,
    })
    .exec();
    
    if (!result){
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    } // No retorno nada por que no quiero. un objeto vacio

    const userID = result.employee.id;
    const user = await this.userRepo.getById(userID);

  }
  
}
