import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors'
import createDebug from 'debug';
import RangeError from 'mongoose'
const debug = createDebug('W7E:error:middleware');

debug('Starting');
export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug('Middleware Errors');

if (error instanceof HttpError){
  res.status(error.status);
  res.statusMessage = error.statusMessage;
}else if(error instanceof RangeError){
  res.status(416);
  res.statusMessage = 'Request Range Not Satisfiable';
}else if(error instanceof Error.ValidationError){
  res.status(400);
  res.statusMessage = 'Bad Request';
}
else{//voy reyenando y el ultimo es solo else por que saltara en cualquier otro caso no incluido
  res.status(500)
  res.statusMessage = 'Internal Server Error'
}

 /* Res.status((error as HttpError).status);
  res.statusMessage = (error as HttpError).statusMessage; */
  res.json({});
  debug((error as HttpError).message);
};
