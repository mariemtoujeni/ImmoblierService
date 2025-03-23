import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import Operation from '../pages/operations.js';
import Companies from '../pages/company.js'
import AddOperation from '../pages/addOperation.js'
import AddCompany from '../pages/addCompany.js'
import CustomNavbar from '../components/navbar.js'


const AppRoutes = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/operations" element={<Operation />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/operations/create" element={<AddOperation />} />
        <Route path="/companies/create" element={<AddCompany />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
