import teamsController  from './../controllers/teamsController';
import {Router} from 'express';





class TeamsRoutes {

    public router: Router= Router();

    constructor(){
        this.config();
    }
    config():void {
        this.router.get('/', teamsController.list)
        this.router.get('/:id', teamsController.getOne)
        this.router.post('/', teamsController.create)
        this.router.put('/:id',teamsController.update)
        this.router.delete('/:id',teamsController.delete)
    }

}

const teamsRoutes = new TeamsRoutes();
export default teamsRoutes.router;
