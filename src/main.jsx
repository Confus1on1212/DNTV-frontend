import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import { Routes, Route } from 'react-router';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/login' element={<App/>}/>
        <Route path='/signin' element={<App/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)