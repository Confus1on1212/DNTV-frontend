import { useState } from "react";
import Header from "./Header";
import InputField from "./components/InputField";
import Btn from "./components/Btn.jsx";
import { Link } from "react-router";

import './style/main.css'

import { register, login } from './user.js'

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [psw, setPassword] = useState("")
    const [psw2, setPassword2] = useState("")

    const navigate = useNavigate()

    async function onSignup() {
        if (!email || !psw || !psw2 || !username) {
            return alert("ures mezok!")
        }
        const data = await register(email, username, psw)
        console.log(data);
        if (data.error) {
            alert(data.error)
        } else {
            alert(data.message)
            login(email, psw)
            setTimeout(() => navigate('/'), 1000)
        }

    }

    return (
        <div className="container-fluid text-bg-dark vh-100 asddd">
            <Header />

            <div className="blurry-light rounded w-25 h-75 mt-3 p-5 mx-auto ">
                <h1 className="text-center text-custom-yellow">Sign Up</h1>

                <form>
                    <InputField type='text' placeholder='Username' isHelperEnabled={false} showPassword={true} setValue={setUsername} />
                    <InputField type='email' placeholder='Email' isHelperEnabled={true} helperText="We won't share your email" showPassword={true} setValue={setEmail} />
                    <InputField type='password' placeholder='Password' isHelperEnabled={false} showPassword={showPassword} setValue={setPassword} />
                    <InputField type='password' placeholder='Password Again' isHelperEnabled={false} showPassword={showPassword} setValue={setPassword2} />

                    <div className="mb-3 form-check text-custom-blue">
                        <input type="checkbox" className="form-check-input" id="showPasswordCheck" onClick={() => setShowPassword(!showPassword)} />
                        <label className="form-check-label" htmlFor="showPasswordCheck"> Show Password</label>
                    </div>

                    <div className="text-center mb-2">
                        <Link className="text-custom-blue text-decoration-none" to={"/"}>I already have an account</Link>
                    </div>

                    <Btn btnClass={"btn btn-custom-yellow"} content={"Sign Up"} onClick={onSignup} />
                </form>
            </div>

        </div>
    )
}