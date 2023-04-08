import React from 'react'
import "../Modal/Modal.css"
import { useDispatch } from 'react-redux'
import { closeModal } from '../../features/modalSlice'
import {BsEnvelopeCheckFill} from "react-icons/bs"
import { NavHashLink as Link } from 'react-router-hash-link'

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
                <h3>Log into your account to see your meetings</h3>
            </div>
            <div className='modal-buttons'>
                <Link>Log in</Link>
                <button onClick={()=>dispatch(closeModal())}> Go back to page</button>
            </div>
        </div>
    </div>
  )
}

export default Modal