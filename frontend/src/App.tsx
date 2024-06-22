import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Divider, Container } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import SinglePatientPage from "./components/PatientListPage/SinglePage";
import { HeaderAppBar } from "./components/general/HeaderAppBar";
import { HomePage } from "./components/pages/HomePage";
import { BlogPage } from "./components/pages/Blogpage";
import LoginPage from "./components/pages/LoginPage";



const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [token, setToken] = useState('');


  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
  
  console.log(token);
  
  return (
    <div className="App">
      <Router>
        <HeaderAppBar/>
        <Container>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage/>}/>
            <Route path="/login" element={<LoginPage setToken={setToken}/>}/>
            <Route path="/patients" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<SinglePatientPage  />}/>
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
