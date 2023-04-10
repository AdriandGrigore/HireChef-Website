import React from 'react'
import "./Instructions.css"
import {MdOutlineRestaurantMenu,MdDashboardCustomize, MdMenuBook, MdChat, MdBookmarkAdd, MdThumbUp} from "react-icons/md"

function Instructions() {
  return (
    <section className='instructions-section'>
        <div className='instructions-section-container'>
            <div className='instructions-section-grid-container'>
                <div className='card'>
                    <div className='card-icon'>
                        <MdOutlineRestaurantMenu />
                    </div>
                    <h3>Choose a menu</h3>
                    <p>
                        Select a preset menu from our page or talk with the chefs about your own!
                    </p>
                </div>
                <div className='card'>
                    <div className='card-icon'>
                        <MdDashboardCustomize />
                    </div>
                    <h3>Personalize your request</h3>
                    <p>
                        Share with us the details of your dreamed meal,
                        including type of cuisine, preferences and intolerances.
                    </p>
                </div>
                <div className='card'>
                    <div className='card-icon'>
                        <MdMenuBook />
                    </div>
                    <h3>Receive menu proposals</h3>
                    <p>
                        Our chefs will design menus based solely on your wants and needs.
                    </p>
                </div>
                <div className='card'>
                    <div className='card-icon'>
                        <MdChat />
                    </div>
                    <h3>Get chatty with your chefs</h3>
                    <p>
                        Dont be shy to exchange some messages with your chefs until your
                        perfect menu is ready!
                    </p>
                </div>
                <div className='card'>
                    <div className='card-icon'>
                        <MdBookmarkAdd />
                    </div>
                    <h3>Book your experience</h3>
                    <p>
                        Once you are happy with your choice, submit your payment to secure your experience.
                    </p>
                </div>
                <div className='card'>
                    <div className='card-icon'>
                        <MdThumbUp />
                    </div>
                    <h3>Enjoy!</h3>
                    <p>
                        All there is left to do is counting down the days till your culinary experience begins!
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
} 

export default Instructions