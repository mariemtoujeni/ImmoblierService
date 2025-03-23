import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import Operation from '../pages/operations.js';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/operations" element={<Operation />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
