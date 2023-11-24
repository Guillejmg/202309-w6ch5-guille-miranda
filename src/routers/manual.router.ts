import { Router as createRouter } from "express";
import { ManualController } from "../controllers/manual.controller";
import { ManualMongoRepo } from "../repos/manual/manual.mongo.repo";
import createDebug from 'debug'
import { AuthInterceptor } from "../middleware/auth.interceptor";

const debug = createDebug('W7E:subjects:file:repo')

export const manualRouter = createRouter();
debug('Starting');

const repo = new ManualMongoRepo();
const controller = new ManualController(repo);
const interceptor = new AuthInterceptor();

manualRouter.get(
  '/',
interceptor.authorizacion.bind(interceptor),
controller.getAll.bind(controller));

manualRouter.get('/:id', controller.getById.bind(controller));

manualRouter.patch(
  '/:id',
  interceptor.authorizacion.bind(interceptor),
  interceptor.aunthentication.bind(interceptor),
   controller.update.bind(controller));

manualRouter.post(
  '/',
interceptor.authorizacion.bind(interceptor),
 controller.create.bind(controller));

manualRouter.delete('/:id', controller.delete.bind(controller));
