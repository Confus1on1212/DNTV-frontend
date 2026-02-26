import { useState } from "react";
import Header from "./Header";
import InputField from "./components/InputField";
import { Link } from "react-router";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="container-fluid text-bg-dark vh-100">
            <Header />
            
            {/* make diff color */}
            <div className="text-bg-secondary rounded w-25 h-75 mt-3 p-5 mx-auto"> 
                <h1 className="text-center">Sign Up</h1>

                <form>
                    <InputField type='text' placeholder='Username' isHelperEnabled={false}/>
                    <InputField type='email' placeholder='Email' isHelperEnabled={true} helperText="We won't share your email"/>
                    <InputField type='password' placeholder='Password' isHelperEnabled={false} showPassword={showPassword}/>
                    <InputField type='password' placeholder='Password Again' isHelperEnabled={false} showPassword={showPassword}/>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={() => setShowPassword(!showPassword)}/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
                    </div>
                    
                    <div className="text-center mb-2">
                        <Link className="text-white text-decoration-none" to={"/"}>I already have an account</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}