import { Gender, PatientFormValues, Diagnosis, EntryWithoutId, HospitalEntry, Entry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from "../types";


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const IsHealthckeckrating = (val: unknown): val is HealthCheckRating => {
    if (typeof val === 'number' && Number.isInteger(val)) {
      if ( val >= 0 && val < 4) {
        return true
      }
      
    }
    return false
  };

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
    };

const isGender = (g: string): g is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(g);

};


const parseString = (comment: unknown): string => {
    if (!isString(comment)) {
        throw new Error('Incorrect or missing comment');
      }
    
      return comment;
    };

const parseDate = (date: unknown): string => {
    if ( !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
        }
    return date;
    };


const parseHealthCheck = (rating: unknown): HealthCheckRating => {
    if ( !IsHealthckeckrating(rating)) {
        throw new Error('Incorrect rating'+rating);
    }
    return rating;
};


const parseGender = (gender: unknown): Gender => {
  if ( !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect gender'+gender);
  }
  return gender;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};


const parseDischarge = (object: unknown): {
  date: string;
  criteria: string
  } => {
    if (!object || typeof object !== 'object'|| !('date' in object) || !('criteria' in object)) {
      throw new Error('Incorrect or missing fields in hospital entry discharge. ');
    } else{
      return {
        date: parseDate(object.date),
        criteria: parseString(object.criteria)
      }
    }

  }

const parsePeriod = (object: unknown): {
  startDate: string;
  endDate: string;
  } => {
    if (!object || typeof object !== 'object'|| !('startDate' in object) || !('endDate' in object)) {
      throw new Error('Incorrect or missing fields in hospital entry discharge. ');
    } else{
      return {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate)
      }
    }
}



export const toNewPatient = (object: unknown):PatientFormValues => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
    
      if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object)  {
        const NewPatient: PatientFormValues = {
            name: parseString(object.name),
            occupation: parseString(object.occupation),
            ssn: parseString(object.ssn),
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender)
        };
    
        return NewPatient;
      }
    
      throw new Error('Incorrect data: some fields are missing');
    };


export const toNewEntry = (object: unknown):EntryWithoutId => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
    
      if ('description' in object && 'type' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object)  {

        const partialEntry: Omit<Entry,"id" | "type"> = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes({diagnosisCodes: object.diagnosisCodes})

        }

        if (object.type === "Hospital" && 'discharge' in object) {
          const NewEntry: Omit<HospitalEntry, "id"> = {
            ...partialEntry,
            type: object.type,
            discharge: parseDischarge(object.discharge)
        };
        return NewEntry;
          
        }
        if (object.type === "OccupationalHealthcare" && 'sickLeave' in object && "employerName" in object) {
          const NewEntry: Omit<OccupationalHealthcareEntry, "id"> = {
            ...partialEntry,
            type: object.type,
            employerName: parseString(object.employerName),
            sickLeave: parsePeriod(object.sickLeave)
        };
        return NewEntry;
          
        }

        if (object.type === "HealthCheck" && 'healthCheckRating' in object) {
          const NewEntry: Omit<HealthCheckEntry, "id"> = {
            ...partialEntry,
            type: object.type,
            healthCheckRating: parseHealthCheck(object.healthCheckRating)
        };
        return NewEntry;
          
        }
      }
    
      throw new Error('Incorrect data: some fields are missing');
    };
