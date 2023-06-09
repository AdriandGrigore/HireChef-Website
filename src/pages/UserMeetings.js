import React from 'react'
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import MeetingList from "../components/MeetingList/MeetingList"
import RatingModal from '../components/RatingModal/RatingModal'
import Modal from '../components/Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import {FiDelete} from "react-icons/fi"
import {RiChatSmileLine} from "react-icons/ri"
import { NavHashLink as Link } from 'react-router-hash-link'
import { deleteMeeting } from '../features/meetingSlice'
import { closeDeleteModal, closeConfirmationModal } from '../features/modalSlice'

function UserMeetings() {
  const {isDeleteModalOpen, isConfirmationModalOpen, isRatingModalOpen} = useSelector(state => state.modal)
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
              <button 
                className="delete-button" 
                onClick={() => dispatch(deleteMeeting())}> 
                Delete 
              </button>
              <button 
                className='go-back-button'
                onClick={() => dispatch(closeDeleteModal())}> 
                Go back to page
              </button>
            </>
          }
        /> 
        : 
        null 
      }

      {isConfirmationModalOpen ? 
        <Modal 
          icon={<RiChatSmileLine style={{color:"rgb(31, 156, 31)"}}/>}
          text={
            <>
              <h1>Thank you for sending your feedback!</h1>
              <h3>Press the button below to see your ratings</h3>
            </>
          }
          buttons={
            <>
              <Link 
                onClick={() => dispatch(closeConfirmationModal())} 
                to="/user/ratings#"> 
                Ratings 
              </Link>
              <button 
                className='go-back-button'
                onClick={() => dispatch(closeConfirmationModal())}> 
                Go back to page
              </button>
            </>
          }
        />
        :
        null
      }
      
      {isRatingModalOpen ? 
        <RatingModal/> 
        : 
        null
      }
      
      <Navbar/>
      <MeetingList/>
      <Footer/>
    </>
  )
}

export default UserMeetings