import { useState } from "react";
import Header from "./Header";
import InputField from "./components/InputField.jsx"
import Btn from "./components/Btn.jsx"

import {login} from './user.js'


export default function Login() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");



    const [showPassword, setShowPassword] = useState(false)




    async function onLogin() {
        if(!email ||!password){
            alert('Email vagy jelszót töltsd ki!')
        } else{
            try {
                const data = await login(email, password)

                if (data.error) {
                    alert(data.error)
                } else {
                    alert(data.message)
                }
            } catch (err) {
                alert('nem sikerült csatlakozni a szerverhez!')
            }
        }

    }
    //asd
    return (
        <div className="container-fluid text-bg-dark vh-100">
            <Header />
            
            {/* make diff color */}
            <div className="text-bg-secondary rounded w-25 h-75 mt-4 p-5 mx-auto"> 
                <h1 className="text-center">Log In</h1>

                <form>
                    <InputField 
                    value={email}
                    type='email' placeholder='Email' isHelperEnabled={true} 
                    helperText="We won't share your email" showPassword={true}
                    setValue={setEmail}
                    />
                    <InputField 
                    value={password}
                    type='password' placeholder='Password' 
                    isHelperEnabled={false} showPassword={showPassword}
                    
                    setValue={setPassword}
                    />
                    
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={() => setShowPassword(!showPassword)}/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
                    </div>
                </form>

                <Btn btnClass={"btn btn-primary"} content={"Submit"} onClick={onLogin}/>
                    
            </div>

        </div>
    )
}