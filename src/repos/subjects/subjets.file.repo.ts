import { KnowledgeStructure } from "../../entities/campero";
import { Repository } from "../repo";
import  fs from 'fs/promises'
import { HttpError } from "../../types/http.error";
import createDebug from 'debug';


const debug = createDebug ('W7E:subjets:file:repo')

export class SubjetsFileRepo implements Repository<KnowledgeStructure>{

file:string;
subjets: KnowledgeStructure[];
constructor(){
  debug('Instanciated')
  this.file = '/data/data.json';
  this.subjets = []
  this.loadData()
}

  async loadData(){
    const data = await fs.readFile(this.file, { encoding: 'utf8' });
    this.subjets = JSON.parse(data);
  }
  
  async getAll(): Promise<KnowledgeStructure[]> {
    return this.subjets;
  }

  async getById(id: string): Promise<KnowledgeStructure> {
    const result = this.subjets.find((item) => item.id === id );
    if(!result) throw new HttpError(404, 'Not found', 'Error in GetById');
    return result;
  }

  async create(newItem: Omit<KnowledgeStructure, "id">): Promise<KnowledgeStructure> {
    const result: KnowledgeStructure = { ...newItem, id: crypto.randomUUID() };
    const newSubject = [...this.subjets, result];
    await this.save(newSubject as KnowledgeStructure[]);
    return result;
  }
  
  async update(id: string, updatedItem: Partial<KnowledgeStructure>): Promise<KnowledgeStructure> {
    let result = this.subjets.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not found', 'Error in Upadate');
    result = { ...result, ...updatedItem };
    const newSubjets = this.subjets.map((item) =>
      item.id === id ? result : item
    );
    await this.save(newSubjets as KnowledgeStructure[]);
    return result;
  }

  async delete(id: string): Promise<void> {
    const newSubjets = this.subjets.filter((item) => item.id !== id);
    if (newSubjets.length === this.subjets.length) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }

    await this.save(newSubjets);
  }
  
  private async save(newSubject: KnowledgeStructure[]) {
    await fs.writeFile(this.file, JSON.stringify(newSubject), {
      encoding: 'utf-8',
    });
    this.subjets = newSubject;
  }
} 
