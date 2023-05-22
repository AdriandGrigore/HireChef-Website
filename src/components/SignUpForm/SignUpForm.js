import React, {useState} from 'react'
import { NavHashLink as Link } from 'react-router-hash-link'
import signupImg from "../../assets/signupImg.jpg"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../util/firebase-config'
import { useNavigate } from 'react-router-dom'
import { addDoc } from 'firebase/firestore'
import { usersCollectionRef } from '../../util/firebase-config'
import User from "../../models/User"
import "../SignUpForm/SignUpForm.css"

function SignUpForm() {
  const [signupEmail,setSignUpEmail]  = useState("")
  const [signupPassword,setSignUpPassword]  = useState("")
  const [signupConfirmPassword,setSignUpConfirmPassword]  = useState("")
  const [signupError,setSignUpError]  = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const navigate = useNavigate()

  const signUp= async (e) =>{
    e.preventDefault()
    
    if(signupPassword !== signupConfirmPassword){
      return setSignUpError("Passwords do not match")
    }
    else if(firstName.length < 3){
      return setSignUpError("First name should be at least 3 characters")
    }
    else if (lastName.length < 3){
      return setSignUpError("Last name should be at least 3 characters")
    }

    try{
      setSignUpError("")
      const res = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      navigate("/user/meetings#")
      try{
        await addDoc(usersCollectionRef, {...new User(res.user.uid, firstName, lastName, signupEmail)})
      }
      catch(err){
        setSignUpError(err.message)
      }
    }
    catch(err){
      switch(err.code){
        case "auth/invalid-email":
          return setSignUpError("Email is invalid")
        case "auth/email-already-in-use":
          return setSignUpError("Email already in use")
        case "auth/weak-password":
          return setSignUpError("Password should be at least 6 characters")
        case "auth/missing-password":
          return setSignUpError("Missing password")
        default :
          return setSignUpError("Something went wrong. Please, try again!")
      }
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
            <h1>Sign Up</h1>
          </div>
          <form onSubmit={signUp}>
            {signupError ? <small className='signup-error'>{signupError}</small> : null}
            <label htmlFor='firstName'>First Name</label>
            <input 
              type='text' 
              id="firstName"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
            />
            <label htmlFor='lastName'>Last Name</label>
            <input 
              type='text' 
              id="lastName"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)} 
            />
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