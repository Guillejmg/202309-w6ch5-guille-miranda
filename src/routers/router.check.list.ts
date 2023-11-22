import { Router as createRouter } from "express";
import createDebug from 'debug'
import {KnowledgeList} from '../controllers/controller'

const debug = createDebug('W7E:subjects:file:repo')

export const checkListRouter = createRouter();
debug('Starting');

const controller = new KnowledgeList();

checkListRouter.get('/', controller.getAll.bind(controller));

checkListRouter.get('/:id', controller.getById.bind(controller));

checkListRouter.patch('/:id', controller.update.bind(controller));

checkListRouter.post('/', controller.create.bind(controller));

checkListRouter.delete('/:id', controller.delete.bind(controller));
