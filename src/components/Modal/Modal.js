import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../features/modalSlice'
import { BsEnvelopeCheckFill } from "react-icons/bs"
import { NavHashLink as Link } from 'react-router-hash-link'
import "../Modal/Modal.css"

function Modal() {
  const dispatch=useDispatch()  

  return (
    <div className='modal-background'>
        <div className='modal-container'>
            <div className='modal-icon'> 
                <BsEnvelopeCheckFill/>
            </div>
            <div className='modal-text'>
                <h1>The form was submited successfully</h1>
                <h3>Press the button below to see your meetings</h3>
            </div>
            <div className='modal-buttons'>
                <Link to="/user/meetings"> Meetings </Link>
                <button onClick={()=>dispatch(closeModal())}> Go back to page</button>
            </div>
        </div>
    </div>
  )
}

export default Modal