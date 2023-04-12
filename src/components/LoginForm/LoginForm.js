import React from 'react'
import loginImg from "../../assets/loginImg.jpg"
import { NavHashLink as Link } from 'react-router-hash-link'
import "../LoginForm/LoginForm.css"

function LoginForm() {
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
          <form>
            <label htmlFor="loginEmail">E-mail</label>
            <input type='email' id='loginEmail'/>
            <label htmlFor='loginPassword'>Password</label>
            <input type='password' id="loginPassword"/>
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