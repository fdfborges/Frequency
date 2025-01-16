import React from 'react';
import ReactDOM from 'react-dom/client'
import Navbar from './assets/components/Navbar/Navbar';
import Home from './assets/pages/Home/Home.Jsx';
import Footer from './assets/components/Footer/Footer.Jsx';
import Signup from './assets/pages/Signup/Signup';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <Home />
    <Footer />
  </React.StrictMode>
)