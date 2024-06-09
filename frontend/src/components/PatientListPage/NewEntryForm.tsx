import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, InputAdornment,
     Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import {  Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import patientService from "../../services/patients";


interface Props{
    patientID: string;
    onSubmit: () => void;
}

export const NewEntryForm = ({patientID, onSubmit}: Props) => {

    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    // const [diagoses, setDiagnoses] = useState<Array<Diagnosis['code']>>([]);
    const [diagnosisField, setDiagnosisField] = useState('');
    const [visitType, setVisitType] = useState('Hospital');
    const [date, setDate] = useState('');

    const [HDD, setHDD] = useState(''); // hospital discharge date
    const [HDC, setHDC] = useState(''); // hospital discharge criteria

    const [employer, setEmployer] = useState('');
    const [OLS, setOLS] = useState(''); // Occupational leave start date
    const [OLE, setOLE] = useState(''); // Occupational leave end date

    const [HealthCheckRating, setHeathCheckRating] = useState("3");

  
    const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setVisitType(event.target.value);
    };

    const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setHeathCheckRating(event.target.value);
    };

    const onFormSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const partialEntry: Omit<Entry, "id" | "type"> = {
            specialist: specialist,
            date: date,
            diagnosisCodes: diagnosisField !== ''? [diagnosisField]: [],
            description: description
        };

        if (visitType === "Hospital") {
            const newEntry: Omit<HospitalEntry,"id"> = {
                ...partialEntry,
                type: "Hospital",
                discharge: { date: HDD, criteria: HDC  }
            };
            console.log(newEntry);
            patientService.addEntry(newEntry, patientID).then((_r)=> onSubmit());
        }
        if (visitType === "HealthCheck") {
            const newEntry: Omit<HealthCheckEntry,"id"> = {
                ...partialEntry,
                type: "HealthCheck",
                healthCheckRating: Number(HealthCheckRating)
            };
            console.log(newEntry);
            patientService.addEntry(newEntry, patientID).then((_r)=> onSubmit());
        }
        if (visitType === "OccupationalHealthcare") {
            const newEntry: Omit<OccupationalHealthcareEntry,"id"> = {
                ...partialEntry,
                type: "OccupationalHealthcare",
                employerName: employer,
                sickLeave: { startDate: OLS, endDate: OLE  }
            };
            console.log(newEntry);
            patientService.addEntry(newEntry, patientID).then((_r)=> onSubmit());
        }
    };

    return (
    <div>
      <form onSubmit={onFormSubmit}>
        <TextField 
          type="date"
          fullWidth 
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Attending specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Add a diagnosis"
          fullWidth
          value={diagnosisField}
          onChange={({ target }) => setDiagnosisField(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Type of visit?</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={visitType}
          onChange={onTypeChange}
        >
        
          <MenuItem value={"Hospital"}>Hospital </MenuItem>
          <MenuItem value={"HealthCheck"}>HealthCheck </MenuItem>
          <MenuItem value={"OccupationalHealthcare"}>Occupational </MenuItem>

        </Select>
        <p></p>

        <div id="hospital" style={{display: visitType==="Hospital" ?'':'none'}}>
            <TextField
            type="date"
            label="Hospital discharge date"
            InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            value={HDD}
            onChange={({ target }) => setHDD(target.value)}
            />
            <TextField
            label="Discharge criteria"
            fullWidth
            value={HDC}
            onChange={({ target }) => setHDC(target.value)}
            />
        </div>
        <div id="healthcheck" style={{display: visitType==="HealthCheck" ?'':'none'}}>
        <Select
          label="Type"
          fullWidth
          value={HealthCheckRating}
          onChange={onHealthCheckRatingChange}
        >
          <MenuItem value={"0"}>Healthy </MenuItem>
          <MenuItem value={"1"}>LowRisk </MenuItem>
          <MenuItem value={"2"}>HighRisk </MenuItem>
          <MenuItem value={"3"}>CriticalRisk </MenuItem>

        </Select>
        </div>
        <div id="occupational" style={{display: visitType==="OccupationalHealthcare" ?'':'none'}}>
            <TextField
                label="Employer"
                fullWidth
                value={employer}
                onChange={({ target }) => setEmployer(target.value)}
            />
            <p></p>
            <TextField
            label="Leave start"
            InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            type="date"
            value={OLS}
            onChange={({ target }) => setOLS(target.value)}
            />
            <TextField
            label="Leave end"
            InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            type="date"
            value={OLE}
            onChange={({ target }) => setOLE(target.value)}
            />
        </div>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );

};