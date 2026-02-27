import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import { Routes, Route } from 'react-router';

=======
import { BrowserRouter } from 'react-router';
import { Routes, Route } from 'react-router';

import App from './App.jsx'
import Login from './Login.jsx';
import Signup from './Signup.jsx';

import './style/font.css'
import 'bootstrap/dist/css/bootstrap.css';
>>>>>>> nandi

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
<<<<<<< HEAD
        <Route path='/login' element={<App/>}/>
        <Route path='/signin' element={<App/>}/>
=======
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
>>>>>>> nandi
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)