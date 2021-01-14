import express from 'express';
import bodyParser from 'body-parser';

import usersRepo from './repositories/users';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email"/>
            <input name="password" placeholder="password"/>
            <input name="passwordConfirmation" placeholder="password confirmation"/>
            <button>Sign Up</button>
        </form>
    </div>
    `);
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

app.post('/', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('Email in use');
  }
  if (password !== passwordConfirmation) {
    return res.send('Password must match');
  }

  res.send('Fartwhisle');
});

app.listen(3000, () => {
  console.log("J'técoute");
});
