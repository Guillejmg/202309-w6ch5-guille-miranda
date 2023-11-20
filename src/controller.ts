import fs from 'fs/promises';
import { KnowledgeStructure } from './models/knowledge';
import { Request, Response } from 'express';
import { ObjectEncodingOptions } from 'fs';

const dataKnowledge = './api/db.json';

const codeOptions: ObjectEncodingOptions = {
  encoding: 'utf-8',
};

const readDataKnowledge: KnowledgeStructure[] = (async()=>{
  try{
  const data = await fs.readFile(dataKnowledge, codeOptions) as string;
  return JSON.parse(data).list as KnowledgeStructure[];
  }catch (error) {
    console.log((error as Error).message);
  }
})

export const getAll=(_req: Request, res: Response)=>{
  res.json(readDataKnowledge);
};

export const getById= (req: Request, res: Response)=>{
  const result= readDataKnowledge.find((item)=> item.id === Number(req.params.id))
  res.json(result);
};

export const create=(req: Request, res: Response)=>{
  const result ={...req.body, id:  readDataKnowledge.length}
  readDataKnowledge.push(result)
  res.json(result)
};

export const update=(req: Request, res: Response)=>{
  let result = readDataKnowledge.find(item => item.id === Number(req.params.id))
 result = {...result, ...req.body}
 readDataKnowledge[readDataKnowledge.findIndex((item) => item.id === Number(req.params.id))]=result!;
 return res.json(result)
  
};

export const remove=(req: Request, res: Response)=>{
  readDataKnowledge.splice(readDataKnowledge.findIndex((item) => item.id === Number(req.params.id)),1);
  res.send({});
};
