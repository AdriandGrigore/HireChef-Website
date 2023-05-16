import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMeetings } from '../../features/meetingSlice'
import {fetchRatings} from '../../features/ratingSlice'
import useAuth from '../../custom-hooks/useAuth'
import { convertDateFormat } from '../MeetingList/MeetingList'
import "../UserOverview/UserOverview.css"

function UserOverview() {
  const {userMeetingsList} = useSelector(state=>state.meetings)
  const filteredMeetingDates = userMeetingsList.filter(meeting => new Date(convertDateFormat(meeting.date)) > new Date())
  const upcomingMeeting = filteredMeetingDates.length > 0 ? filteredMeetingDates[0].date : "-"
  const {userRatingsList} = useSelector(state => state.rating)
  const {loggedInUser} = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMeetings(loggedInUser))
  },[dispatch, loggedInUser])

  useEffect(() => {
    dispatch(fetchRatings(loggedInUser))
  }, [dispatch, loggedInUser])

  return (
    <div className='ow-card-container'>
      <div className='ow-card'>
        <p>Total meetings</p>
        <span>{userMeetingsList.length}</span>
      </div>
      <div className='ow-card'>
        <p>Upcoming meeting</p>
        <span>{upcomingMeeting}</span>
      </div>
      <div className='ow-card'>
        <p>Ratings</p>
        <span>{userRatingsList.length}</span>
      </div>
    </div>
  )
}

export default UserOverview