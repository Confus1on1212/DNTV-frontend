import { useState } from "react";
import Header from "./Header";
import InputField from "./components/InputField.jsx"
import Btn from "./components/Btn.jsx"

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="container-fluid text-bg-dark vh-100">
            <Header />
            
            {/* make diff color */}
            <div className="text-bg-secondary rounded w-25 h-75 mt-4 p-5 mx-auto"> 
                <h1 className="text-center">Log In</h1>

                <form>
                    <InputField type='email' placeholder='Email' isHelperEnabled={true} helperText="We won't share your email"/>
                    <InputField type='password' placeholder='Password' isHelperEnabled={false} showPassword={showPassword}/>
                    
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={() => setShowPassword(!showPassword)}/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
                    </div>
                </form>

                <Btn />
                    
            </div>

        </div>
    )
}