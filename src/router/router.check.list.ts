import { Router as createRouter } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove
} from '../controller'

export const checkListRouter = createRouter();

checkListRouter.get('/', getAll)

checkListRouter.get('/:id',getById)

checkListRouter.patch('/:id', update)

checkListRouter.post('/', create)

checkListRouter.delete('/:id', remove)
