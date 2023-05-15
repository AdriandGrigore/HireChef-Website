import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import RatingList from '../components/RatingList/RatingList'
import { useDispatch, useSelector } from 'react-redux'
import { closeDeleteModal } from '../features/modalSlice'
import { FiDelete } from 'react-icons/fi'
import Modal from '../components/Modal/Modal'
import { deleteRating } from '../features/ratingSlice'

function UserRatings() {
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
              <button
                className="delete-button" 
                onClick={() => dispatch(deleteRating())}
              > 
                Delete 
              </button>
              <button 
                className='go-back-button'
                onClick={() => dispatch(closeDeleteModal())}
              > 
                Go back to page
              </button>
            </>
          }
        /> 
        : 
        null 
      }
      <Navbar/>
      <RatingList/>
      <Footer/>
    </>
  )
}

export default UserRatings