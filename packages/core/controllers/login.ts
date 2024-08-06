import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import {data as user_data} from '../data/users'
import { findUser } from "../utils/helpers";
import express from 'express';
import { uuid } from '../types';

type Request = {
  body: {
  email: string
  password: string
  }
}


const loginRouter = express.Router();


const a = async (req: Request, res) => {

  try {
    const auth: {email: string, password: string} = req.body
    const claimed_user = findUser(user_data, auth.email)
    if (!claimed_user) {
        console.error("no user found")
          await res.status(401).json({
            error: "no user found"
          })
    }
    const claimed_hash: string = claimed_user.hash

    const password_correct = await bcrypt.compare(auth.password, claimed_hash)

    if (!password_correct) {
        console.error("incorrect password")
         await res.status(401).json({
            error: "incorrect password"
          })
    }


    const idForToken: {id: uuid} = {
        id: claimed_user.id
      }

    const token = await jwt.sign(idForToken, process.env.JWT_SECRET as Secret)

    res.send(token).status(200)
    
  } catch (error) {
    console.log(error)
    
  }

    

}

loginRouter.post('/', a
)

export default loginRouter;
