import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Javasolt: react-router-dom
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../components/Header.jsx";
import InputField from "../components/InputField.jsx";
import Btn from "../components/Btn.jsx";

import { register, login } from '../api/user.js'

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [psw, setPassword] = useState("")
    const [psw2, setPassword2] = useState("")

    const navigate = useNavigate()

    async function onSignup(e) {
        // Megakadályozzuk az oldal újratöltését, ha form-ot használnánk
        if(e) e.preventDefault();

        if (!email || !psw || !psw2 || !username) {
            return toast.error("Please fill out every field");
        }

        if(psw !== psw2) {
            return toast.error("Passwords are not matching");
        }
        
        try {
            const data = await register(email, username, psw);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                // Bejelentkezés regisztráció után
                await login(email, psw);
                // Navigáció a toast lefutása után
                setTimeout(() => navigate('/'), 2500);
            }
        } catch (err) {
            toast.error("Couldn't load");
        }
    }

    return (
        <div className="vh-100">
            <Header />

            <div className="container pt-3">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                        <div className="blurry-light rounded p-4 p-md-5 mx-auto">
                            <h1 className="text-center text-custom-yellow mb-4">Sign Up</h1>

                            <form onSubmit={onSignup}>
                                <InputField type='text' placeholder='Username' isHelperEnabled={false} showPassword={true} setValue={setUsername} />
                                <InputField type='email' placeholder='Email' isHelperEnabled={true} helperText="We won't share your email" showPassword={true} setValue={setEmail} />
                                <InputField type='password' placeholder='Password' isHelperEnabled={false} showPassword={showPassword} setValue={setPassword} />
                                <InputField type='password' placeholder='Password Again' isHelperEnabled={false} showPassword={showPassword} setValue={setPassword2} />

                                <div className="mb-3 form-check text-custom-blue">
                                    <input type="checkbox" className="form-check-input" id="showPasswordCheck" onChange={() => setShowPassword(!showPassword)} checked={showPassword} />
                                    <label className="form-check-label" htmlFor="showPasswordCheck"> Show Password</label>
                                </div>

                                <div className="text-center mb-3">
                                    <Link className="text-custom-blue text-decoration-none" to={"/login"}>I already have an account</Link>
                                </div>

                                <Btn btnClass={"btn btn-custom-yellow w-100"} content={"Sign Up"} onClick={onSignup} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
    )
}