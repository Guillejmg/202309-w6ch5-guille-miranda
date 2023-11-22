import { Request, Response, NextFunction } from 'express';
import createDebug from 'debug';
import { SubjetsFileRepo } from '../repos/files/subjets.file.repo';

const debug = createDebug('W7E:subjects:file:repo')

export class UserController {
  repo:SubjetsFileRepo
  constructor(private repo){
    debug('Instantiated')
    this.repo = new SubjetsFileRepo();
  }
