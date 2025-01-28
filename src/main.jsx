import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './assets/components/Navbar/Navbar';
import Home from './assets/pages/Home/Home.Jsx';
import Footer from './assets/components/Footer/Footer.Jsx';
import Login from '../client/Login/Login';
import Signin from '../client/Signin/Signin';
import ForgotMyPassword from '../client/ForgotMyPassword/ForgotMyPassword'

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signin' element={<Signin/>}/>
        <Route path='/ForgotMyPassword' element={<ForgotMyPassword/>}/>
        
      </Routes>
      <Footer />
  </BrowserRouter>
);