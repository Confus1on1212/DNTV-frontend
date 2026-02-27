import { useState } from "react";
import Header from "./Header";
import InputField from "./components/InputField";
import { Link, Navigate, useNavigate } from "react-router";

import Btn from './components/Btn'


import { login, register } from './user.js'

export default function Signup() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sPassword, setsPassword] = useState("");


    async function onSignUp() {
        if (!email || !username || !password || !sPassword) {
            alert('Tölts ki minden mezőt!')
        } else {

            if (sPassword != password) {
                alert('Nem egyezik a jelszó!')
            } else {
                try {
                    const rData = await register(email, username, password)

                    if (rData.error) {
                        alert(rData.error)
                    } else {
                        alert(rData.message)
                        const loginData = await login(email, password)
                        setTimeout(()=> navigate('/', 600))
                    }
                    

                } catch (err) {
                    alert('nem sikerült csatlakozni a szerverhez!')
                }
            }



        }

    }
    return (
        <div className="container-fluid text-bg-dark vh-100">
            <Header />

            {/* make diff color */}
            <div className="text-bg-secondary rounded w-25 h-75 mt-3 p-5 mx-auto">
                <h1 className="text-center">Sign Up</h1>

                <form>
                    <InputField value={username} type='text' placeholder='Username' isHelperEnabled={false} setValue={setUsername} showPassword={true}/>
                    <InputField value={email} type='email' placeholder='Email' isHelperEnabled={true} helperText="We won't share your email" setValue={setEmail} showPassword={true}/>
                    <InputField value={password} type='password' placeholder='Password' isHelperEnabled={false} showPassword={showPassword} setValue={setPassword} />
                    <InputField value={sPassword} type='password' placeholder='Password Again' isHelperEnabled={false} showPassword={showPassword} setValue={setsPassword} />

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={() => setShowPassword(!showPassword)} />
                        <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
                    </div>

                    <div className="text-center mb-2">
                        <Link className="text-white text-decoration-none" to={"/"}>I already have an account</Link>
                    </div>
                </form>
                <Btn btnClass={"btn btn-primary"} content={"Sign up"} onClick={onSignUp} />
            </div>

        </div>
    )
}