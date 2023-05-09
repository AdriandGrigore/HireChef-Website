import React, { useState } from 'react'
import {AiFillStar} from "react-icons/ai"
import { NavHashLink as Link } from 'react-router-hash-link'
import { closeRatingModal } from '../../features/ratingModalSlice';
import { useDispatch } from 'react-redux';
import "../RatingModal/RatingModal.css"

function RatingModal() {
    const [rating, setRating] = useState(3);
    const [hover, setHover] = useState(0);
    const dispatch = useDispatch()

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
                cols="28" 
                rows="4" 
                placeholder='How was your experience?'
            />
            <div className='rating-modal-buttons'>
                <Link>Rate</Link>
                <button onClick={() => dispatch(closeRatingModal())}>Go back to page</button>
            </div>
        </div>
    </div>
  )
}

export default RatingModal