import React from 'react';
import { Route, Routes, BrowserRouter,Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Registration from './components/authentication/Registration';
import Login from './components/authentication/Login';
import Navbar from './components/Navbar';
import useAuthContext from './hooks/useAuthContext';
import PdfPage from './components/pdf_components/PdfPage';

function App() {
  const {user} = useAuthContext()
  return (
    <BrowserRouter>
    
    <Navbar/>
      <Routes>
        <Route path="/" element={user?<Home />:<Navigate to='/signin'/>} />        
        <Route path="/signup" element={!user?<Registration />: <Navigate to='/'/>} />
        <Route path="/signin" element={!user?<Login/>:<Navigate to='/'/>} />
        <Route path="/pdf-viewer" element={!user?<Login/>:<PdfPage/>} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
