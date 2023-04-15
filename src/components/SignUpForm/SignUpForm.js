import React, {useState} from 'react'
import { NavHashLink as Link } from 'react-router-hash-link'
import signupImg from "../../assets/signupImg.jpg"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../util/firebase-config'
import "../SignUpForm/SignUpForm.css"

function SignUpForm() {
  const [signupEmail,setSignUpEmail]  = useState("")
  const [signupPassword,setSignUpPassword]  = useState("")
  const [signupConfirmPassword,setSignUpConfirmPassword]  = useState("")
  const [signupError,setSignUpError]  = useState("")
  
  const signUp= async (e) =>{
    e.preventDefault()
    
    if(signupPassword !== signupConfirmPassword){
      return setSignUpError("Passwords do not match")
    }

    try{
      setSignUpError("")
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    }
    catch(err){
      setSignUpError(err.message)
    }
  }

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
          <form onSubmit={signUp}>
            {signupError ? <small className='signup-error'>{signupError}</small> : null}
            <label htmlFor="signupEmail">E-mail</label>
            <input 
              type='email' 
              id='signupEmail'
              value={signupEmail}
              onChange={(e)=>setSignUpEmail(e.target.value)}
            />
            <label htmlFor='signupPassword'>Password</label>
            <input 
              type='password' 
              id="signupPassword"
              value={signupPassword}
              onChange={(e)=>setSignUpPassword(e.target.value)}
            />
            <label htmlFor='signupConfirmPassword'>Confirm Password</label>
            <input 
              type='password' 
              id="signupConfirmPassword"
              value={signupConfirmPassword}
              onChange={(e)=>setSignUpConfirmPassword(e.target.value)}
            />
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