import React from 'react'
import "../Modal/Modal.css"

function Modal({icon, text, buttons}) {
  return (
    <div className='modal-background'>
        <div className='modal-container'>
            <div className='modal-icon'> 
                {icon}
            </div>
            <div className='modal-text'>
                {text}
            </div>
            <div className='modal-buttons'>
                {buttons}  
            </div>
        </div>
    </div>
  )
}
export default Modal