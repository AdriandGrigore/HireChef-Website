import React from 'react'
import "../UserOverview/UserOverview.css"

function UserOverview() {
  return (
    <div className='ow-card-container'>
      <div className='ow-card'>
        <p>Total meetings</p>
        <span>0</span>
      </div>
      <div className='ow-card'>
        <p>Upcoming meeting</p>
        <span>22.04.2023</span>
      </div>
      <div className='ow-card'>
        <p>Ratings</p>
        <span>0</span>
      </div>
    </div>
  )
}

export default UserOverview