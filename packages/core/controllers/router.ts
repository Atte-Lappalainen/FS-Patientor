import express from 'express';
const routerTest = express.Router();
import { Diagnosis, Patient, PatientFormValues } from '../types';
import {data as diagnosis_data} from '../data/diagnoses';
import {data as patient_data } from '../data/patients';
import { toNewEntry, toNewPatient } from '../utils/parsers';
import patientService from '../services/patients';


routerTest.get('/diagnoses', (_req, res) => {
    const data: Diagnosis[] =  diagnosis_data;
    console.log('diagnoses data requested');
    res.send(data);
  });


routerTest.get('/patients', (_req, res) => {
    const data: Patient[] =  patient_data;
    console.log('patient data requested');
    res.send(data);
  });



routerTest.get('/patients/:id', (req, res) => {
  console.log('Single patient data requested');
    const id: string = req.params.id;
    const data: Patient[] =  patient_data;
    let found: boolean = false;
    data.forEach(e => {
      if (e.id === id) {
        res.send(e);
        found = true
      }
    });
    if (!(found)) {
      console.log("not found")
      res.status(404).send('Sorry, cant find that');
    }
  });

routerTest.post('/patients/:id/entries', (req, res) => {
  console.log('Add patient entry');
  const id: string = req.params.id;
  try {
    const new_entry = toNewEntry(req.body)
    const added_entry = patientService.addEntry(id, new_entry)
    res.send(added_entry);
    
  } catch (error) {
    console.log('Something went wrong.');
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
    
  }

  });


routerTest.post('/patients', (req, res) => {
  try {
    const new_patient: PatientFormValues = toNewPatient(req.body);
    const added_patient: Patient = patientService.addPatient(new_patient);

    res.json(added_patient);
  } catch (error: unknown) {
    console.log('Something went wrong.');
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
}
);


routerTest.get('/diagnoses/:code', (req, res) => {
  console.log('Single patient data requested');
    const code: string = req.params.code;
    const data: Diagnosis[] =  diagnosis_data;
    let found: boolean = false;
    data.forEach(d => {
      if (d.code === code) {
        res.send(d);
        found = true
      }
    });
    if (!(found)) {
      console.log("not found")
      res.status(404).send('Sorry, cant find that diagnosis');
    }
  });

  
export default routerTest;

