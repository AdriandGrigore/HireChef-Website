import React from 'react'
import Navbar from "../components/Navbar/Navbar"
import Form from '../components/Form/Form'
import Footer from "../components/Footer/Footer"
import Modal from '../components/Modal/Modal'
import { useSelector } from 'react-redux'

function Book() {
  const {isModalOpen}=useSelector((state)=>state.modal)
  return (
    <>
      {isModalOpen ? <Modal /> : null}
      <Navbar/>
      <Form/>  
      <Footer/>
    </>
    
  )
}

export default Book