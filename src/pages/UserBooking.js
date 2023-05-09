import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import BookingForm from "../components/BookingForm/BookingForm"
import Footer from '../components/Footer/Footer'
import Modal from "../components/Modal/Modal"
import { useSelector } from 'react-redux'

function UserBooking() {
  const {isModalOpen} = useSelector(state=>state.modal)
  return (
    <>
      {isModalOpen ? <Modal /> : null}
      <Navbar />
      <BookingForm />
      <Footer />
    </>
  )
}

export default UserBooking