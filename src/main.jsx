import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx'
import Play from './pages/Play.jsx'
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Admin from './pages/Admin.jsx';
import Terms from './pages/Terms.jsx';
import Feedback from './pages/Feedback.jsx';
import Help from './pages/Help.jsx';
import Detail from './pages/Detail.jsx';
import Upload from './pages/Upload.jsx';
import User from './pages/User.jsx';

import './style/font.css'
import './style/main.css'
import './style/colors.css' 
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/play/:slug' element={<Play/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/termsandpolicies' element={<Terms/>}/>
        <Route path='/feedback' element={<Feedback/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/details/:slug' element={<Detail/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/user' element={<User/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)