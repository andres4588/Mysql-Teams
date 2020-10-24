import { Request, Response } from 'express'



export const signup = async (req: Request, res: Response) => {
    res.send('singup')
};

export const signin = async (req: Request, res: Response) => {
  
    res.send('singin')
};

export const profile = async (req: Request, res: Response) => {
    res.send('profile')
};