import express from 'express';

import { handleErrors } from './middlewares';
import usersRepo from '../../repositories/users';
import signupTemplate from '../../views/admin/auth/signup';
import signinTemplate from '../../views/admin/auth/signin';

import {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireValidEmail,
  requireValidPassword,
} from './validators';

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

//Manual middleware
/* const bodyParser=(req:any,res:any,next:any)=>{
      if(req.method==='POST'){
      req.on('data', (data:any)=>{
          const parsed:[String]=data.toString('utf8').split('&');
          const formData:{[key:string]:string}={}
          for (const pair of parsed) {
              const [key ,value]:string[]=pair.split('=')
              formData[key]=value;
          }
          req.body=formData
          next()
      })}else{
          next()
      }
      
  } */

router.post(
  '/signup',
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signupTemplate),
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const user = await usersRepo.create({ email, password });

    if (req.session) req.session.userId = user.id;

    res.send('Fartwhisle');
  }
);

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  '/signin',
  [requireValidEmail, requireValidPassword],
  handleErrors(signinTemplate),
  async (req: express.Request, res: express.Response) => {
    const { email }: { email: string; password: string } = req.body;

    const user = await usersRepo.getOneBy({ email });

    if (req.session) req.session.userId = user?.id;

    res.send("You're signed in");
  }
);

router.get('/signout', (req, res) => {
  req.session = null;
  res.send("You're logged out");
});

export default router;
