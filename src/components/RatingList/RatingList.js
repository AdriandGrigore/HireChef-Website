import React from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserOverview from '../UserOverview/UserOverview'
import { useDispatch, useSelector } from 'react-redux'
import {AiFillStar} from "react-icons/ai"
import { openDeleteModal } from '../../features/modalSlice'
import "../RatingList/RatingList.css"

function RatingList() {
  const {
    userRatingsList, 
    userRatingsError, 
    userRatingsLoading,
    deleteRatingError,
  } = useSelector(state => state.rating)
  const dispatch = useDispatch()
  
  const loggedInUserRatings = userRatingsList
    .map(rating => (
      <tr key= {rating.ratingId}>
        <td 
          data-cell="Chef" 
          className='rating-chef-cell'
        >
          {rating.chef}
        </td>
        <td 
          data-cell="Rating" 
          className='rating-stars-cell'
        >
          <div>
            {[...Array(Number(rating.rating))].map((_, index) =>{
              return <AiFillStar key={index} className='rating-star'/>
            })}
          </div>
        </td>
        <td 
          data-cell="Comment"  
          className='rating-comment-cell'
        >
          {rating.comment === "" ? 
            <i style={{color:"rgb(90 89 89 / 90%)"}}>
              No comment left
            </i> : 
            <span>{rating.comment}</span>
          }
        </td>
        <td 
          data-cell="Actions" 
          className='rating-actions-cell'
        >
          <button
            className='delete-rating-button'
            onClick={()=>dispatch(openDeleteModal(rating.ratingId))}
          >
            Delete
          </button>
        </td>
      </tr>
  ))

  return (
    <section className='ratings-section'>
      <UserSidebar />
      <UserOverview />
      {deleteRatingError ? <h1 className='delete-error-message'>Something went wrong. We couldn't delete the rating. Please try again</h1> : null}
      {
        userRatingsError ? 
        <h1 className='fetching-error-message'>We could not fetch the ratings. Please try again</h1> :
        userRatingsLoading ?
        <h1 className='loading-message'>Loading ratings...</h1> :
        <div className='rating-table-wrapper'>
          <table className='ratings-table'>
            <thead>
              <tr>
                <th>Chef</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loggedInUserRatings}
            </tbody>
          </table>
        </div>
      }
      {
        userRatingsList.length === 0 && userRatingsLoading === false ? 
        <h1 className='no-ratings-message'>You have no ratings</h1> : 
        null
      }
    </section>
  )
}

export default RatingList