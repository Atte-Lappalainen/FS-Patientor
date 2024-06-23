import axios from "axios";
import { apiBaseUrl } from "../helpers/constants";

type token = string;

export const login = async (email: string, password: string) => {
    try {
        const res = await axios.post(
            `${apiBaseUrl}/login/`
            ,{password, email}
          );
          return res.data as token;
        
    } catch (error) {
        console.log(error);
        return null;
    }
 };