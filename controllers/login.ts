/* eslint-disable @typescript-eslint/no-misused-promises */
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import {data as user_data} from '../data/users';
import { findUser } from "../utils/helpers";
import express from 'express';
import { uuid } from '../types';
const loginRouter = express.Router();



loginRouter.post('/', async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const auth: {email: string, password: string} = req.body;
    const claimed_user = findUser(user_data, auth.email);
    if (!claimed_user) {
        console.error("no user found");
        return res.status(401).json({
            error: "no user found"
          });
    }
    const claimed_hash: string = claimed_user.hash;

    const password_correct = await bcrypt.compare(auth.password, claimed_hash);

    if (!password_correct) {
        console.error("incorrect password");
        return res.status(401).json({
            error: "incorrect password"
          });
    }

    const idForToken: {id: uuid} = {
        id: claimed_user.id
      };

    const token = jwt.sign(idForToken, process.env.JWT_SECRET as Secret);

    res.status(200).send(token);
}
);

export default loginRouter;
