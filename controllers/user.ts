import { User  } from "../types";
import userService, { getAll } from '../services/user';
import bcrypt from 'bcrypt';
import express from 'express';
const userRouter = express.Router();

interface newuser {
    email: string;
    name: string;
    password: string;
}

userRouter.post('/new', (request, response) => {
    console.log(request.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { email, name, password }: newuser = request.body;

    // parser !!
    const saltRounds = 10;
    let hash = "";
    console.log(saltRounds, password);
    bcrypt.hash(password, saltRounds).then( res => {
        hash = res;
        const user: Omit<User, "id"> =  {
            name,
            email,
            hash,
            profileIds: []
        };
        const addeduser = userService.addNew(user);
        response.status(201).json(addeduser);
    })
    .catch(err => console.log(err));

}
);

userRouter.get('/all', (_req, res) => {
    console.log("test");
    const data = getAll();

    if (data) {
        res.status(200).send(data);
    } else {
        res.status(400);
    }
    
});

export default userRouter;