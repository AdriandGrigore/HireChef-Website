import React from 'react'
import "../Banner/Banner.css"
function Banner(props) {
  return (
    <h2 className='banner' id={props.id}>
        {props.title}
    </h2>
  )
}

export default Banner