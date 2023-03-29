import React from 'react'
import "../Footer/Footer.css"
import {SiFacebook, SiTwitter, SiInstagram, SiLinkedin} from "react-icons/si"
import {SlPhone,SlLocationPin} from "react-icons/sl"
function Footer() {
  return (
    <div className='footer-container' id="footer">
        <div className='footer-copyright-container'>
            <p> &copy; Copyright HireChef-Grigore Adrian. All rights reserved </p>
        </div>
        <div className='footer-adress-container'>
            <h1><SlLocationPin/></h1>
            <p>1253 Random Street</p>
            <p>City, 332254</p>
        </div>
        <div className='footer-contact-container'>
            <h1><SlPhone/></h1>
            <p>E-mail: support@gmail.com</p>
            <p>Phone: 0134556789</p>
        </div>
        <div className='footer-social-container'>
            <a href="https://www.facebook.com" rel="noreferrer" target="_blank"><SiFacebook/></a>
            <a href="https://www.twitter.com" rel="noreferrer" target="_blank"><SiTwitter/></a>
            <a href="https://www.instagram.com" rel="noreferrer" target="_blank"><SiInstagram/></a>
            <a href="https://www.linkedin.com" rel="noreferrer" target="_blank"><SiLinkedin/></a>
        </div>
    </div>
  )
}

export default Footer