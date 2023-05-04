import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../features/modalSlice'
import { BsEnvelopeCheckFill } from "react-icons/bs"
import { NavHashLink as Link } from 'react-router-hash-link'
import { resetForm } from '../../features/bookingFormSlice'
import "../Modal/Modal.css"

function Modal() {
    const dispatch=useDispatch()  
    const {editForm} = useSelector(state => state.bookingForm)
    
    const handleClick = () =>{
        dispatch(closeModal())
        dispatch(resetForm())
    }

  return (
    <div className='modal-background'>
        <div className='modal-container'>
            <div className='modal-icon'> 
                <BsEnvelopeCheckFill/>
            </div>
            <div className='modal-text'>
                <h1>The form was {editForm.status ? "updated" : "submited"} successfully</h1>
                <h3>Press the button below to see your meetings</h3>
            </div>
            <div className='modal-buttons'>
                <Link onClick={handleClick} to="/user/meetings#"> Meetings </Link>
                <button onClick={handleClick}> Go back to page</button>
            </div>
        </div>
    </div>
  )
}
export default Modal