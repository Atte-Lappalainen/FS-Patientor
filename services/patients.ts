import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";
import { v1 as uuid } from 'uuid';
import {data as patient_data} from '../data/patients';


const addPatient = (object: PatientFormValues):Patient => {
    const id = uuid();
    const added_patient: Patient = {
        ...object,
        id: id,
        entries: []
    };
    patient_data.push(added_patient);
    return added_patient;
};



const addEntry = (patient_id: string, entry: EntryWithoutId): Entry => {
    const new_entry_id: string = uuid();
    const added_entry: Entry = {...entry, id:new_entry_id};
    console.log(patient_id);
    let found = false;
    const data: Patient[] =  patient_data;
    data.forEach(p => {
      if (p.id === patient_id) {
        console.log(p.id);
        p.entries.push(added_entry);
        found = true;
      }
    });
    if (found) {
      return added_entry;
    }
    console.log("New entry: patient id not found.");
    throw new Error('New entry: patient id not found.');

};



export default {addPatient, addEntry};