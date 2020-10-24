import { signup, signin, profile } from './../controllers/authController';
import {Router} from 'express';


class authRoutes {

    public router: Router= Router();

    constructor(){
        this.config();
    }
    config():void {
        this.router.post('/singup', signup)
        this.router.post('/singin', signin)
        this.router.get('/profile', profile)

    }

}


const authroutes = new authRoutes();
export default authroutes.router;
