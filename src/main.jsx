import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './assets/components/Navbar/Navbar';
import Home from './assets/pages/Home/Home.Jsx';
import Footer from './assets/components/Footer/Footer.Jsx';
import Signup from './assets/pages/Signup/Signup';

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Signup' element={<Signup/>}/>
      </Routes>
      <Footer />
  </BrowserRouter>
);