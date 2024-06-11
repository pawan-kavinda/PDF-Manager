import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Registration from './components/authentication/Registration';
import Login from './components/authentication/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />        
        <Route path="/signup" element={<Registration />} />
        <Route path="/signin" element={<Login/>} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
