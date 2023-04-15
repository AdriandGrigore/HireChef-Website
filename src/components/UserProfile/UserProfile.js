import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../util/firebase-config'
import useAuth from '../../custom-hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import "../UserProfile/UserProfile.css"

function UserProfile() {
  const {currentUser} = useAuth()
  const [logoutError, setLogoutError] = useState()
  const navigate = useNavigate()
  
  const logout = async () =>{
    try{
      await signOut(auth)
      navigate("/login#")
    }
    catch(err){
      setLogoutError("Something went wrong.Try again")
    }
  }

  return (
    <section className='user-section'>
      <h1>Hello {currentUser.email}</h1>
      {logoutError ? <small>{logoutError}</small> : null}
      <button onClick={logout}>Log out</button>
    </section>
  )
}

export default UserProfile