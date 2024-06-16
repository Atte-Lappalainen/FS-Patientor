import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Entry, Gender, Patient } from "../../types";
import { parseString } from "../../parsers";
import { getByID } from "../../services/patients";
import { EntryAccordion } from "./EntryAccordion";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { NewEntryForm } from "./NewEntryForm";
import { FormBorder } from "./FormBorder";



const SinglePatientPage = (): JSX.Element => {

    const newId: unknown = useParams().id;
    const [welcome, setWelcome] = useState<string>('');
    const [patient, setPatient] = useState<Patient>();
    useEffect(() => {
        get_patient_info();
    },[]);


    const get_patient_info = () => {
        setWelcome("loading");
        const id = parseString(newId);
        getByID(id)
        .then(res => {setPatient(res); setWelcome(""); console.log("new get", res.name);} )
        .catch(e=> {console.log("error:", e); setWelcome("Error loading patient"); setPatient(undefined);});
    };


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
                {(gendernum === 1) && 
                <FemaleIcon fontSize="large"/>}
                {(gendernum === 2) && 
                <MaleIcon fontSize="large"/>}
            </div>
        );
    };

    
    if (!(patient)) {
        return (
        <div>
            <h1>{welcome}</h1>
        </div>
        );
        
    }

    console.log(patient);
    return (
        <div>
            <div>
                <h4>Name: {patient.name}</h4>
                <li>
                    gender: {patient.gender}
                    {displayGender(patient.gender)}
                </li>
                <li>ssn: {patient.ssn}</li>
                <div>
                    {Object.values(patient.entries).map((e: Entry)=> (
                        <EntryAccordion key={e.id} entry={e}/>

                    ))}
                </div>
                <div>
                    <FormBorder>
                        <h3>Add new entry</h3>
                        <NewEntryForm patientID={patient.id} onSubmit={get_patient_info}/>
                    </FormBorder>
                </div>
            </div>
            
        </div>

        );

};

export default SinglePatientPage;
