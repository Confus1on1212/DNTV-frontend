import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

import Header from "../components/Header.jsx";
import InputField from "../components/InputField.jsx";
import Btn from "../components/Btn.jsx";

import '../style/main.css'

import { register, login } from '../user.js'

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [psw, setPassword] = useState("")
    const [psw2, setPassword2] = useState("")

    const navigate = useNavigate()

    async function onSignup() {
        if (!email || !psw || !psw2 || !username) {
            toast.error("ures mezok!")
        }

        if (psw !== psw2) {
            toast.error("nem egyeznek a jelszavak")
        }

        const data = await register(email, username, psw)
        // console.log(data);
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success(data.message)
            login(email, psw)
            setTimeout(() => navigate('/'), 2500)
        }

    }

    return (
        <div className="container-fluid text-bg-dark vh-100 asddd">
            <Header />

            <div className="blurry-light rounded w-25 h-75 mt-3 p-5 mx-auto ">
                <h1 className="text-center text-custom-yellow">Sign Up</h1>

                <div>
                    <InputField type='text' placeholder='Username' isHelperEnabled={false} showPassword={true} setValue={setUsername} />
                    <InputField type='email' placeholder='Email' isHelperEnabled={true} helperText="We won't share your email" showPassword={true} setValue={setEmail} />
                    <InputField type='password' placeholder='Password' isHelperEnabled={false} showPassword={showPassword} setValue={setPassword} />
                    <InputField type='password' placeholder='Password Again' isHelperEnabled={false} showPassword={showPassword} setValue={setPassword2} />

                    <div className="mb-3 form-check text-custom-blue">
                        <input type="checkbox" className="form-check-input" id="showPasswordCheck" onClick={() => setShowPassword(!showPassword)} />
                        <label className="form-check-label" htmlFor="showPasswordCheck"> Show Password</label>
                    </div>

                    <div className="text-center mb-2">
                        <Link className="text-custom-blue text-decoration-none" to={"/login"}>I already have an account</Link>
                    </div>

                    <Btn btnClass={"btn btn-custom-yellow"} content={"Sign Up"} onClick={onSignup} />

                    <ToastContainer
                        position="top-center"
                        autoClose={2500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </div>
            </div>

        </div>
    )
}