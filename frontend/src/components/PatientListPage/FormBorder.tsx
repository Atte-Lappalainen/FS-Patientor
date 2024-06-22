import { Button } from "@mui/material";
import { useState } from "react";

interface Props {
    children: JSX.Element[]
}

export const FormBorder = ({children}: Props): JSX.Element => {
    const [buttonstate, setButtonState] = useState<boolean>(false); //  is visible?

    const showButtontext = () => {
        if (buttonstate) {
            return (<div>
                Hide
            </div>);
        }
        return (<div>
                add new entry
            </div>); 
    };


    return (
        <div>
            <Button onClick={() => setButtonState(!(buttonstate))}>
                {showButtontext()}
            </Button>
            <div style={{display: buttonstate? '' : 'none'}}>
                {children}
            </div>
        </div>
    );
};