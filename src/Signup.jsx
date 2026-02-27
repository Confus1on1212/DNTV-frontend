import { useState } from "react";
import Header from "./Header";
import InputField from "./components/InputField";
import Btn from "./components/Btn.jsx";
import { Link } from "react-router";

import './style/main.css'

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)

    async function onSignup() {
       
    }

    return (
        <div className="container-fluid text-bg-dark vh-100 asddd">
            <Header />

            <div className="blurry-light rounded w-25 h-75 mt-3 p-5 mx-auto "> 
                <h1 className="text-center text-custom-yellow">Sign Up</h1>

                <form>
                    <InputField type='text' placeholder='Username' isHelperEnabled={false}/>
                    <InputField type='email' placeholder='Email' isHelperEnabled={true} helperText="We won't share your email"/>
                    <InputField type='password' placeholder='Password' isHelperEnabled={false} showPassword={showPassword}/>
                    <InputField type='password' placeholder='Password Again' isHelperEnabled={false} showPassword={showPassword}/>

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