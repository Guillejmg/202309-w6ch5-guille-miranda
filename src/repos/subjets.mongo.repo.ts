import { KnowledgeStructure } from "../entities/knowledge";
import { Repository } from "./repo";
import { HttpError } from "../types/http.error";
import { SubjetModel } from "./subjets.mongo.model";

export class SubjetsMongoRepo implements Repository<KnowledgeStructure>{

constructor(){

}

  async getAll(): Promise<KnowledgeStructure[]> {
    const data = await SubjetModel.find()
    return data;
  }

  async getById(id: number): Promise<KnowledgeStructure> {
    const result = SubjetModel.findById(id);
    return result;//como puede ser null en vez de id hay que ponerle el httperror e igual para los siguientes
  }

  async create(newItem: Omit<KnowledgeStructure, "id">): Promise<KnowledgeStructure> {
    const result: KnowledgeStructure = await SubjetModel.create(newItem)
    return result;
  }
  
  async update(id: number, updatedItem: Partial<KnowledgeStructure>): Promise<KnowledgeStructure> {
    let result = await SubjetModel.findByIdAndUpdate(id, updatedItem, {new : true});
    return result;
  }

  async delete(id: ["id"]): Promise<void> {
    const result = await SubjetModel.findByIdAndDelete(id)
    
    if (!result){
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }//no retorno nada por que no quiero. un objeto vacio
  }
  
}
