import {Request, Response, Router} from 'express'
import { createUserController } from './useCases/CreateUser/index'

const routes = Router()

routes.post('/users', (request: Request, response: Response) =>{
    return createUserController.handle(request,response)
})



export {routes}