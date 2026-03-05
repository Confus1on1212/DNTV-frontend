import { useState } from "react"
import Header from "./Header"
import InputField from "./components/InputField.jsx"
import Btn from "./components/Btn.jsx"
import './style/main.css'

import { login } from "./user.js"
import { useNavigate } from "react-router"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [psw, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  async function onLogin() {
    if (!email || !psw) {
      return alert("Email vagy jelszót töltsd ki!")
    } 
      try {
        const data = await login(email, psw)
        if (data.error) {
          return alert(data.error)
        } else {
          alert(data.message)
          setTimeout(() => navigate('/', 600))
        }
      } catch (err) {
        alert("nem sikerült csatlakozni a szerverhez!")
      }
    
  }
  
  return (
    <div className="container-fluid text-bg-dark vh-100 asddd">
      <Header />

      <div className="blurry-light rounded w-25 h-75 mt-4 p-5 mx-auto">
        <h1 className="text-center text-custom-yellow">Log In</h1>

        <form onSubmit={onLogin}>
          <InputField value={email} type="email" placeholder="Email" isHelperEnabled={true} helperText="We won't share your email" showPassword={true} setValue={setEmail} />
          <InputField value={psw} type="password" placeholder="Password" isHelperEnabled={false} showPassword={showPassword} setValue={setPassword} />

          <div className="mb-3 form-check text-custom-blue">
            <input type="checkbox" className="form-check-input" id="showPasswordCheck" onClick={() => setShowPassword(!showPassword)} />
            <label className="form-check-label" htmlFor="showPasswordCheck"> Show Password</label>
          </div>
        </form>

        <Btn btnClass={"btn btn-custom-yellow"} content={"Log In"} onClick={onLogin} />
      </div>
    </div>
  )
}
