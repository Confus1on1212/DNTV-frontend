import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Fontos: a toast stílusainak importálása
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/Header.jsx";
import InputField from "../components/InputField.jsx";
import Btn from "../components/Btn.jsx";

import { login } from '../user.js'

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [psw, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function onLogin(event) {
    event.preventDefault(); 

    if (!email || !psw) {
      return toast.error("Kérlek, tölts ki minden mezőt!");
    }

    try {
      const data = await login(email, psw);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message, {
          onClose: () => navigate('/')
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Nem sikerült csatlakozni a szerverhez!");
    }
  }

  return (
    <div className="container-fluid text-bg-dark vh-100 scenic-background">
      <Header />

      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="blurry-light rounded p-4 p-md-5">
              
              <h1 className="text-center text-custom-yellow mb-4">Log In</h1>
              
              <form onSubmit={onLogin}>
                <InputField value={email} type="email" placeholder="Email" isHelperEnabled={true} helperText="We won't share your email" setValue={setEmail} showPassword={Text}/>
                <InputField value={psw} type="password" placeholder="Password" isHelperEnabled={false} showPassword={showPassword} setValue={setPassword} />
                
                <div className="mb-3 form-check text-custom-blue">
                  <input type="checkbox" className="form-check-input" id="showPasswordCheck" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                  <label className="form-check-label" htmlFor="showPasswordCheck"> Show Password</label>
                </div>

                <div className="text-center mb-3">
                  <Link className="text-custom-blue text-decoration-none" to={"/signup"}>I don't have an account yet</Link>
                </div>
                
                <Btn btnClass={"btn btn-custom-yellow w-100"} content={"Log In"} type="submit" />
              </form>

            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  );
}