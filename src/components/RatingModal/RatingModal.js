import React, { useState } from 'react'
import {AiFillStar} from "react-icons/ai"
import { NavHashLink as Link } from 'react-router-hash-link'
import { closeRatingModal } from '../../features/ratingModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../../models/Rating';
import { addDoc } from 'firebase/firestore';
import { ratingsCollectionRef } from '../../util/firebase-config';
import useAuth from '../../custom-hooks/useAuth';
import "../RatingModal/RatingModal.css"

function RatingModal() {
    const [rating, setRating] = useState(3);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("")
    const {loggedInUser} = useAuth()
    const {chefSelectedForRating} = useSelector(state => state.ratingModal)
    const dispatch = useDispatch()

    const sendRatingToDb = async () =>{
        try{
            await addDoc(ratingsCollectionRef, {...new Rating(loggedInUser.uid, chefSelectedForRating, comment, rating)})
            dispatch(closeRatingModal())
        }
        catch{
            alert("Something went wrong! Please try again")
        }
    }

  return (
    <div className='rating-modal-background'>
        <div className='rating-modal-container'>
            <h1>Rate this chef</h1>
            <div className="stars-container">
                {[...Array(5)].map((_, index)=>{
                    return(
                        <button 
                            key={index}
                            className={index + 1 <= (hover || rating) ? "on" : "off"}
                            onClick={() => setRating(index + 1)}
                            onMouseEnter={() => setHover(index + 1)}
                            onMouseLeave={() => setHover(rating)}
                        >
                           <AiFillStar/>
                        </button>
                    )
                })}
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)} 
                cols="28" 
                rows="4" 
                placeholder='How was your experience?'
            />
            <div className='rating-modal-buttons'>
                <button 
                    className="send-rating-button" 
                    onClick={sendRatingToDb}>
                    Send 
                </button>
                <button 
                    className="go-back-to-page" 
                    onClick={() => dispatch(closeRatingModal())}>
                    Go back to page
                </button>
            </div>
        </div>
    </div>
  )
}

export default RatingModal