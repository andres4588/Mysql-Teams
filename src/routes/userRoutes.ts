import { Router, Response } from 'express';
import userController from '../controllers/userController';
import {checkToken} from  '../middleware/middleware.js';
 
class UserRoutes {

    public router: Router= Router();

    constructor(){
        this.config();
    }
    config():void {
        this.router.get('/', userController.listUser)
        this.router.post('/create', userController.createUser)
        this.router.post('/login', userController.getByEmail)
        this.router.get('/profile:id',  checkToken, userController.getbyID)

    }



}

const userRoutes = new UserRoutes();
export default userRoutes.router;
