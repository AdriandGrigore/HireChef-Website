import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import UserProfile from '../components/UserProfile/UserProfile'

function User() {
  return (
    <> 
      <Navbar/> 
      <UserProfile/>
      <Footer/>
    </>           
  )
}

export default User