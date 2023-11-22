import { Request, Response, NextFunction } from 'express';
import createDebug from 'debug';
import { SubjetsFileRepo } from '../repos/files/subjets.file.repo';

const debug = createDebug('W7E:subjects:file:repo')

export class KnowledgeList {
  repo:SubjetsFileRepo
  constructor(){
    debug('Instantiated')
    this.repo = new SubjetsFileRepo();
  }

async getAll(_req: Request, res: Response){
    const result = await this.repo.getAll();
    res.json(result);
};
  
async getById(req: Request, res: Response, next: NextFunction){
  try{
    const result= this.repo.getById(req.params.id)
    res.json(result);
  }catch (error) {
    next(error)
  }
}
  
async create(req: Request, res: Response){
    const result = await this.repo.create(req.body);
    res.status(201);
    res.statusMessage = 'created';
    res.json(result)
}
  
async update(req: Request, res: Response){
  const result = this.repo.update(req.params.id, req.body)
  return res.json(result)
    
  };
  
async delete(req: Request, res: Response, next: NextFunction){
  try{
  await this.repo.delete(req.params.id);
  res.status(204);
  res.statusMessage = 'No content';
  res.json({})
  }catch(error){
    next(error)
  }
}
}
