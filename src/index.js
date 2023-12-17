import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About  from './pages/AboutPage';
import Contact  from './pages/ContactPage';
import Home  from './pages/Home';
import Navbar from './NavBar';


export default function App() {

  return (

    <div>   
      <Navbar />
      <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
             
            </Routes>
      </BrowserRouter>
    </div> 
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
