import { User, Profile  } from "../types";
import userService from '../services/user'
import bcrypt from 'bcrypt';
import express from 'express';
const userRouter = express.Router();



userRouter.post('/new', async (req, res) => {
    const { email, name, password } = req.body

    // parser !!

    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)

    const user: Omit<User, "id"> =  {
        name,
        email,
        hash,
        profileIds: []
    }

    const addeduser = userService.addNew(user)

    res.status(201).json(addeduser)
}
)