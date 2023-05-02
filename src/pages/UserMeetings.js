import React from 'react'
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import MeetingList from "../components/MeetingList/MeetingList"

function UserMeetings() {
  return (
    <>
        <Navbar/>
        <MeetingList/>
        <Footer/>
    </>
  )
}

export default UserMeetings