import createDebug from "debug";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../types/http.error";
import { Auth } from "../services/auth";


const debug = createDebug('W7E:auth:interceptor')

export class AuthInterceptor {
  constructor(){
    debug('Instantiated');
  }

    authoritation(req: Request, res: Response, next: NextFunction ){

      try{ 
        const tokenHeader = req.get('Authoritation');
         if(!tokenHeader?.startsWith('Bearer')) 
          throw new HttpError(401, 'Unauthorized');
        const token = tokenHeader.split(' ')[1]// aislamos el tokken de la construccion del header
        const tokenPayload = Auth.verifyAndGetPayload(token);
          req.body.userID = tokenPayload.id;//reescribo con el tokken el del bodi por que alguien lo podria haber manipulado, por lo tantto me fio mas del que viene con el tokken
      } catch(error){
        next(error)
      }

    authentication(req: Request, res: Response, next: NextFunction){
      try{ // eres el usuario req.body.id
          const userID = req.body.userID
        // Quieres actuar sobre la note req.params.id -fijate en el params de la url de la ruta - 
        const nottesID = req.params.id

        const repoNotes = new ManualMongoRepo()// me traigo la nota
        const note = await repoNotes.getById(nottesID) // ahora puedo buscarla
        if(note.author.id === userID) throw HttpError(401,'')// ahora te aseguras de que coincide id del usuario y el de la nota y si no tira error y si si next

        next()
      }catch(error){
        next(error)
      }
    };
  

}
}
