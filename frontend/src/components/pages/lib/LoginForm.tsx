import { Button, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";


interface Props {
    submitLogin: (email: string, password: string) => void;
}

export const LoginForm = ({submitLogin}: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        submitLogin(email, password);
    };


    return (
        <div>
        <form onSubmit={onSubmit}>
            <TextField 
            type="text"
            fullWidth 
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            />
            <TextField
            label="password"
            type="password"
            fullWidth
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            />
            <Button type="submit">login</Button>
        </form>
        </div>
    );
};