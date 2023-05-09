import React from 'react'
import UserSidebar from "../UserSidebar/UserSidebar"
import UserOverview from "../UserOverview/UserOverview"
import { useDispatch, useSelector } from 'react-redux'
import { deleteMeeting } from '../../features/meetingSlice'
import { NavHashLink as Link } from 'react-router-hash-link'
import { changeToEditForm, formValid, inputChange, inputStatus} from '../../features/bookingFormSlice'
import { openRatingModal } from '../../features/ratingModalSlice'
import "../MeetingList/MeetingList.css"

export const convertDateFormat = (dateString) => {
  var parts = dateString.split("/");
  var formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
  return formattedDate;
}

function MeetingList() {
  const {userMeetingsList, userMeetingsLoading, deleteMeetingError, userMeetingsError} = useSelector(state => state.meetings)
  const dispatch = useDispatch()

  const populateEditForm = (meetingId, date, chef, menu, phoneNumber) => {
    const inputNames = ["date", "chef", "menu", "phoneNumber"]
    const inputValues = [date, chef, menu, phoneNumber]
    inputNames.forEach((name, index) =>{
      dispatch(inputChange({inputName: name, value: inputValues[index]}))
      dispatch(inputStatus({inputName: name}))
    })
    dispatch(formValid())
    dispatch(changeToEditForm({id:meetingId}))
  }
  
  const loggedInUserMeetings = userMeetingsList
    .map(meeting => (
      <tr key ={meeting.meetingId}>
        <td data-cell="Date">{meeting.date}</td>
        <td data-cell="Chef">{meeting.chef}</td>
        <td data-cell="Menu">{meeting.menu}</td>
        <td data-cell="Phone Number">{meeting.phoneNumber}</td>
        <td data-cell="Actions" className='actions-cell'>
          { 
          new Date(convertDateFormat(meeting.date)) < new Date() ? // if meeting date is less than current date, edit button will be replaced by rate button
            <Link
              className="rate-link"
              onClick={() => dispatch(openRatingModal())}
            >
              Rate
            </Link> 
            :
            <Link
              className="edit-link"
              onClick={() => populateEditForm(meeting.meetingId, convertDateFormat(meeting.date), meeting.chef, meeting.menu, meeting.phoneNumber)}
              to="/user/booking#">
              Edit
            </Link>
          }
          <button onClick={()=>dispatch(deleteMeeting(meeting.meetingId))}>Delete</button>
        </td>
      </tr>
  ))
  
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