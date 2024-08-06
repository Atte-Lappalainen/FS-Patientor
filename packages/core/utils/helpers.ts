import { User } from "../types";


export const findUser = (users: User[], email: string): User | null => {
    let user: User | null = null;
    users.forEach(u => {
        if (u.email === email) {
            user = u;   
        }
    }
    )
    return user;

}