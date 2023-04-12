import React from 'react'
import { NavHashLink as Link } from 'react-router-hash-link'
import signupImg from "../../assets/signupImg.jpg"
import "../SignUpForm/SignUpForm.css"

function SignUpForm() {
  return (
    <section className='signup-section'>
    <div className='signup-card'>
      <div className='signup-img'>
        <img src={signupImg} alt="signupImg" />
      </div>
      <div className='signup-form'>
        <div className='signup-text'>
          <h1>Create Account</h1>
        </div>
        <form>
          <label htmlFor="signupEmail">E-mail</label>
          <input type='email' id='signupEmail'/>
          <label htmlFor='signupPassword'>Password</label>
          <input type='password' id="signupPassword"/>
          <label htmlFor='signupConfirmPassword'>Confirm Password</label>
          <input type='password' id="signupConfirmPassword"/>
          <button type='submit'>Sign up</button>
        </form>
        <div className='login-msg'>
          <small>Already have an account? <Link to="/login#">Login</Link></small>
        </div>
      </div>
    </div>
  </section>
  )
}

export default SignUpForm