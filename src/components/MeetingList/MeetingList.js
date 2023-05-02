import React, { useEffect } from 'react'
import UserSidebar from "../UserSidebar/UserSidebar"
import UserOverview from "../UserOverview/UserOverview"
import { useDispatch, useSelector } from 'react-redux'
import useAuth from '../../custom-hooks/useAuth'
import { deleteMeeting, fetchMeetings } from '../../features/meetingSlice'
import "../MeetingList/MeetingList.css"

function MeetingList() {
  const {userMeetingsList, userMeetingsLoading, deleteMeetingError, userMeetingsError} = useSelector(state => state.meetings)
  const {loggedInUser} = useAuth()
  const dispatch = useDispatch()
  const loggedInUserMeetings = userMeetingsList
    .map(meeting => (
      <tr key ={meeting.meetingId}>
        <td data-cell="Date">{meeting.date}</td>
        <td data-cell="Chef">{meeting.chef}</td>
        <td data-cell="Menu">{meeting.menu}</td>
        <td data-cell="Phone Number">{meeting.phoneNumber}</td>
        <td data-cell="Actions" className='actions-cell'>
          <button>Edit</button>
          <button onClick={()=>dispatch(deleteMeeting(meeting.meetingId))}>Delete</button>
        </td>
      </tr>
  ))
  
  useEffect(()=>{
    dispatch(fetchMeetings(loggedInUser))
  },[dispatch, loggedInUser])

  return (
    <section className='meetings-section'>
      <UserSidebar />
      <UserOverview />
      {deleteMeetingError ? <h1 className='delete-error-message'>Something went wrong. We couldn't delete the meeting. Please try again</h1> : null}
      {
        userMeetingsError ? 
        <h1 className='fetching-error-message'>We could not fetch the meetings. Please try again</h1> :
        userMeetingsLoading ?  
        <h1 className='loading-message'>Loading data...</h1> :
        <div className='table-wrapper'>
          <table className='meetings-table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Chef</th>
                <th>Menu</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loggedInUserMeetings}
            </tbody>
          </table>
        </div>
      }
      {userMeetingsList.length === 0 && userMeetingsLoading === false ? <h1 className='no-meetings-message'>You have no meetings booked</h1> : null}
    </section>
  )
}

export default MeetingList