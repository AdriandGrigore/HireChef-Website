import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import BookingForm from "../components/BookingForm/BookingForm"
import Footer from '../components/Footer/Footer'
import Modal from "../components/Modal/Modal"
import { BsEnvelopeCheckFill } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { closeConfirmationModal } from '../features/modalSlice'
import { resetState } from '../features/bookingFormSlice'
import { NavHashLink as Link } from 'react-router-hash-link'

function UserBooking() {
  const {isConfirmationModalOpen} = useSelector(state=>state.modal)
  const {editForm} = useSelector(state => state.bookingForm)
  const dispatch=useDispatch()  
  
  const handleClick = () =>{
    dispatch(closeConfirmationModal())
    dispatch(resetState())
  }

  return (
    <>
      {isConfirmationModalOpen ? 
        <Modal 
          icon={<BsEnvelopeCheckFill />}
          text={
            <>
              <h1>The form was {editForm.status ? "updated" : "submited"} successfully</h1>
              <h3>Press the button below to see your meetings</h3>
            </>
          }
          buttons={
            <>
              <Link onClick={handleClick} to="/user/meetings#"> Meetings </Link>
              <button 
                className='go-back-button'
                onClick={handleClick}> 
                Go back to page
              </button>
            </>
          }
        />
        :
        null
      }
      <Navbar />
      <BookingForm />
      <Footer />
    </>
  )
}

export default UserBooking