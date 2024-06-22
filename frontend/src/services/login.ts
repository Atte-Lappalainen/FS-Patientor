import axios from "axios";
import { apiBaseUrl } from "../constants";

type token = string;

export const login = async (email: string, password: string): Promise<string | null> => {
    const res = await axios.post(
      `${apiBaseUrl}/login/`
      ,{password, email}
    );

    if (res.status === 401) {
        return null; 
    }
  
    return res.data as token;
  };