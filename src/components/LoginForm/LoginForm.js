import React, { useState } from 'react'
import loginImg from "../../assets/loginImg.jpg"
import { NavHashLink as Link } from 'react-router-hash-link'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../util/firebase-config'
import { useNavigate } from 'react-router-dom'
import "../LoginForm/LoginForm.css"

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("demo@user.com")
  const [loginPassword, setLoginPassword] = useState(`${process.env.REACT_APP_DEMO_USER_PASSWORD}`)
  const [loginError, setLoginError] = useState("")
  const navigate = useNavigate()

  const login = async (e) =>{
    e.preventDefault()
    
    try{
      setLoginError("")
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      navigate("/user/meetings#")
    }
    catch(err){
      switch(err.code){
        case "auth/missing-password":
          return setLoginError("Missing password")
        case "auth/wrong-password":
          return setLoginError("Wrong password")
        case "auth/user-not-found":
          return setLoginError("User not found")
        case "auth/invalid-email":
          return setLoginError("Email is invalid")
        case "auth/too-many-requests":
          return setLoginError("To many failed login attempts. Try again later")
        default: 
          return setLoginError(err.message)
      }
    }
  }

  return (
    <section className='login-section'>
      <div className='login-card'>
        <div className='login-img'>
          <img src={loginImg} alt="loginIcon" />
        </div>
        <div className='login-form'>
          <div className='welcome-text'>
            <h1>Welcome</h1>
          </div>
          <form onSubmit={login}>
            {loginError ? <small className='login-error'>{loginError}</small> : null}
            <label htmlFor="loginEmail">E-mail</label>
            <input 
              type='email' 
              id='loginEmail'
              value={loginEmail}
              onChange={(e)=>setLoginEmail(e.target.value)}
            />
            <label htmlFor='loginPassword'>Password</label>
            <input 
              type='password' 
              id="loginPassword"
              value={loginPassword}
              onChange={(e)=>setLoginPassword(e.target.value)}
            />
            <button type='submit'>Log in</button>
          </form>
          <div className='register-msg'>
            <small>Don't have an account? <Link to="/signup">Sign up</Link></small>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm