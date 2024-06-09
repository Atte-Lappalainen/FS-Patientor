import { Diagnosis, Entry } from "../../types";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { getByCode } from "../../services/diagnoses";


interface Props{
    entry: Entry
}

export const EntryAccordion = ({entry}: Props) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    useEffect(() => {
        console.log(entry.diagnosisCodes);
        if (diagnoses.length === 0) {
        
        entry.diagnosisCodes?.forEach(d => {
            getByCode(d)
            .then(result => setDiagnoses([...diagnoses, result]))
            .catch(e => console.log(e));
        });
        }
    },[]);

    console.log(diagnoses);
    return (
        <div>
            <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >
            {entry.date}| {entry.specialist}| {entry.type}
            
            </AccordionSummary>
            <AccordionDetails>
            {entry.description}
            <div>
                <h4>Diagnoses:</h4>
                {diagnoses && diagnoses.map((d) => (
                    <div key={d.code}>
                        {d.code} {d.name}     <i> {d.latin}</i>
                    </div>
                ))}
            </div>
            </AccordionDetails>
        </Accordion>
    </div>
    );
};