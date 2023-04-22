import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import UserSidebar from "../components/UserSidebar/UserSidebar"
import UserOverview from "../components/UserOverview/UserOverview"

function UserBooking() {
  return (
    <>
        <Navbar />
        <UserSidebar />
        <UserOverview />
    </>
  )
}

export default UserBooking