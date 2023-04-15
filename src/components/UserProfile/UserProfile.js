import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../util/firebase-config'
import useAuth from '../../custom-hooks/useAuth'
import "../UserProfile/UserProfile.css"

function UserProfile() {
  const {currentUser} = useAuth()

  const logout = async () =>{
    await signOut(auth)
  }

  return (
    <section className='user-section'>
      <h1>Hello {currentUser.email}</h1>
      <button onClick={logout}>Log out</button>
    </section>
  )
}

export default UserProfile