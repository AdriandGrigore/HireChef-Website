import React from 'react'
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import MeetingList from "../components/MeetingList/MeetingList"
import RatingModal from '../components/RatingModal/RatingModal'
import { useDispatch, useSelector } from 'react-redux'
import {FiDelete} from "react-icons/fi"
import Modal from '../components/Modal/Modal'
import { Link } from 'react-router-dom'
import { deleteMeeting } from '../features/meetingSlice'
import { closeDeleteModal } from '../features/modalSlice'

function UserMeetings() {
  const {isRatingModalOpen} = useSelector(state => state.ratingModal)
  const {isDeleteModalOpen} = useSelector(state => state.modal)
  const dispatch = useDispatch()

  return (
    <>
      {isDeleteModalOpen ? 
        <Modal 
          icon={<FiDelete style={{color:"red"}}/>}  
          text={     
            <>
              <h1>Are you sure you want to delete?</h1>
              <h3>You can't undo this action</h3>
            </>
          }
          buttons={
            <>
              <Link className="delete-link" onClick={() => dispatch(deleteMeeting())}> Delete </Link>
              <button onClick={() => dispatch(closeDeleteModal())}> Go back to page</button>
            </>
          }
        /> 
        : 
        null 
      }
      {isRatingModalOpen ? <RatingModal/> : null}
      <Navbar/>
      <MeetingList/>
      <Footer/>
    </>
  )
}

export default UserMeetings