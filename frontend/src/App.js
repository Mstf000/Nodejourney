import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';


function App() {

  return (

    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path='*' element={<Login />} />

    </Routes>

  );
}

export default App;
