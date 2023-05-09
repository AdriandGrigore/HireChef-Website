import React from 'react'
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import MeetingList from "../components/MeetingList/MeetingList"
import RatingModal from '../components/RatingModal/RatingModal'
import { useSelector } from 'react-redux'

function UserMeetings() {
  const {isRatingModalOpen} = useSelector(state => state.ratingModal)
  
  return (
    <>
      {isRatingModalOpen ? <RatingModal/> : null}
      <Navbar/>
      <MeetingList/>
      <Footer/>
    </>
  )
}

export default UserMeetings