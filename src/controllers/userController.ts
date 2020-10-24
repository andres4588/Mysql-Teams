import {Request, Response, query} from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');



class UserController{
  public async listUser (req: Request, res: Response) {
    await pool.query('SELECT * FROM users', function(err, result, fields) {
        if (err) throw err;

        
        res.json(result);
    });
  }
   public async getOneUser (req: Request,res: Response): Promise<any>{ 
     const {id} = req.params
    await pool.query(`SELECT * FROM users WHERE id=${id}`, function(err, result, fields) {
        if (err) throw console.log(err);
        if(result.length>0){
          return res.json(result[0])
        }
    });
  }
  public async getByEmail (req: Request,res: Response): Promise<any>{ 
    const {email} = req.body
    console.log('hola')
   await pool.query(`SELECT * FROM users WHERE email=?`, [email] ,function(err, result, fields) {
       if (err) throw console.log(err);
       if(result.length>0){
        const equals=bcrypt.compare(req.body.password, result[0].password);
         if(!equals){
           res.json({
             error: 'error, email or password are incorrect'

           })
         }
         else{
           console.log(result[0])
          let payload={
            userId:result[0].id.id,
          }
         let resultado=jwt.encode(payload, process.env.TOKEN_KEY);
           
         res.json({
           successfull: resultado,
          done: 'login correct'

        })
          
           //console.log(resultado)
          //res.json('iguales')
         }
         //return res.json(result[0])
       }
      
   });
  }

   public async createUser(req: Request,res: Response): Promise<void> {
    req.body.password=bcrypt.hashSync(req.body.password,10);
    console.log(req.body.password)
    console.log(req.body)

     pool.query('INSERT INTO users set ?', [req.body])
     res.json({message: 'users created'});
    
   }
   public async deleteUser(req: Request,res: Response): Promise<void>{
    const {id} = req.params
    await pool.query(`DELETE FROM users WHERE id=${id}`, function(err, result, fields) {
        if (err) throw console.log(err);
          console.log("Number of records deleted: " + result.affectedRows);
          res.json({message: 'users eliminated'});
    });
  }

  public async getbyID (req: Request,res: Response): Promise<any>{ 
    const {id} = req.params
   await pool.query(`SELECT * FROM users WHERE id=?`, [id] ,function(err, result, fields) {
       if (err) throw console.log(err);
       if(result.length>0){
         console.log(result[0])
          res.json(result[0])
        }
      })
    }


  public async updateUser(req: Request,res: Response): Promise<void>{
    const {id} = req.params
    await pool.query(`UPDATE users SET ? WHERE id= ?`,[req.body, id] );
    res.json({message: 'users updated'});

  }
  public  createtoken(user:any){
    let payload={
      userId:user.id,
    }
    return jwt.encode(payload, process.env.TOKEN_KEY);
  }
}



const userController=new UserController();
export default userController;
