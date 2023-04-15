import React, { useState } from 'react'
import loginImg from "../../assets/loginImg.jpg"
import { NavHashLink as Link } from 'react-router-hash-link'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../util/firebase-config'
import "../LoginForm/LoginForm.css"

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const login = async (e) =>{
    e.preventDefault()
    
    try{
      setLoginError("")
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    }
    catch(err){
      setLoginError(err.message)
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