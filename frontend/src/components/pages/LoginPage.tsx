import { Typography } from "@mui/material";
import { login } from "../../services/login";
import { useState } from "react";
import { LoginForm } from "./lib/LoginForm";


interface Props { 
    setToken: React.Dispatch<React.SetStateAction<string>>;
}
const LoginPage = ({setToken}: Props) => {
    const [showerror, setShowerror] = useState(false);

    const submitLogin = (email: string, password: string): void => {
        login(email, password).then(res => {
            if (!res) {
                setShowerror(true);
                
            } else {
                setToken(res);
            }
        });
    };

    return (
        <div>
            <Typography>login</Typography>
            <div>
                <LoginForm submitLogin={submitLogin} />
            </div>
            <div>
                {showerror ? <>false login</>: <></>}
            </div>
        </div>
    );
};

export default LoginPage;