import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMeetings } from '../../features/meetingSlice'
import useAuth from '../../custom-hooks/useAuth'
import "../UserOverview/UserOverview.css"

function UserOverview() {
  const {userMeetingsList} = useSelector(state=>state.meetings)
  const upcomingMeeting = userMeetingsList.length > 0 ? userMeetingsList[0].date : "-"
  const {loggedInUser} = useAuth()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchMeetings(loggedInUser))
  },[dispatch, loggedInUser])

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
        <span>0</span>
      </div>
    </div>
  )
}

export default UserOverview