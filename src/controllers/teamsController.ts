import {Request, Response, query} from 'express';
import pool from '../database';


class TeamsController{
  public async list (req: Request, res: Response) {
    await pool.query('SELECT * FROM teams', function(err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
  }

   public async getOne (req: Request,res: Response): Promise<any>{ 
     const {id} = req.params
    await pool.query(`SELECT * FROM teams WHERE id=${id}`, function(err, result, fields) {
        if (err) throw console.log(err);
        if(result.length>0){
          return res.json(result[0])
        }
    });
}

   public async create(req: Request,res: Response): Promise<void> {
     pool.query('INSERT INTO teams set ?', [req.body])
     res.json({message: 'team created'});
    
   }
   public async delete(req: Request,res: Response): Promise<void>{
    const {id} = req.params
    await pool.query(`DELETE FROM teams WHERE id=${id}`, function(err, result, fields) {
        if (err) throw console.log(err);
          console.log("Number of records deleted: " + result.affectedRows);
          res.json({message: 'team eliminated'});
    });
  }


  public async update(req: Request,res: Response): Promise<void>{
    const {id} = req.params
    await pool.query(`UPDATE teams SET ? WHERE id= ?`,[req.body, id] );
    res.json({message: 'team updated'});

  }
}

const teamsController=new TeamsController();
export default teamsController;
