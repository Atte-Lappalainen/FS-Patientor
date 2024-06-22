import { User } from "../types";
import { v1 as uuid } from 'uuid';
import {data as user_data} from '../data/users';



const addNew = (noid_user: Omit<User, "id">): User => {
    const new_id = uuid();
    const new_user: User = {
        ...noid_user,
        id: new_id
    };
    user_data.push(new_user);

    return new_user;
};

export const getAll = () =>{
    return user_data;
};

export default {addNew};