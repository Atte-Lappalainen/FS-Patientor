/*
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gender, Patient } from "../../types";
import PatientService from "../../services/patients"
import { parseString } from "../../parsers/stringparser";


const SinglePatientPage = () => {
    const newId: unknown = useParams().id
    const [welcome, setWelcome] = useState<string>('')
    const [patient, setPatient] = useState<Patient>()
    useEffect(() => {
        setWelcome("loading")
        const id = parseString(newId)
        PatientService.getById(id)
        .then(res => {setPatient(res); setWelcome(""); console.log("new get", res.name)} )
        .catch(e=> {console.log("error:", e); setWelcome("Error loading patient"); setPatient(undefined)})
    },[])


    const displayGender = (g: Gender) => {
        let gendernum: number = 0;
        switch (g) {
            case "male":
                gendernum = 2;
                break;
            case "female":
                gendernum = 1;
                break;
            default:
                break;
        }
        return(
            <div>
                {(gendernum && gendernum >1) && 1
                } 

            </div>
        )
    }

    
    if (!(patient)) {
        return (
        <div>
            <h1>{welcome}</h1>
        </div>

        )
        
    }


    return (
        <div>
            <p>Single page </p>
        <div>
        </div>
        <div>
        
        </div>
        </div>
    )

}



export default SinglePatientPage;
*/