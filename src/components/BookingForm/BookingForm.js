import React from 'react'
import UserSidebar from "../UserSidebar/UserSidebar"
import UserOverview from "../UserOverview/UserOverview"
import useAuth from "../../custom-hooks/useAuth"
import { Timestamp, addDoc } from 'firebase/firestore'
import Meeting from "../../models/Meeting"
import { useDispatch, useSelector } from 'react-redux'
import { formNotValid, formValid, inputChange, inputStatus } from '../../features/bookingFormSlice'
import {openModal} from "../../features/modalSlice"
import { meetingsCollectionRef } from '../../util/firebase-config'
import { fetchMeetings, updateMeeting } from '../../features/meetingSlice'
import "../BookingForm/BookingForm.css"

const getTomorrowDate=()=>{
    const date= new Date()
    const day= date.getDate() + 1 < 10 ? `0${date.getDate()+1}` : date.getDate()+1
    const month= date.getMonth() < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
    const year= date.getFullYear()
    return (
      `${year}-${month}-${day}`
    )
}

function BookingForm() {
    const {loggedInUser} = useAuth()
    const {phoneNumber, menu, chef, date,submitBtnIsDisabled, editForm} = useSelector((state)=>state.bookingForm)
    const dispatch = useDispatch()
    
    const errCondition ={
        phoneNumber: phoneNumber.value.length < 10 && phoneNumber.wasClicked,
        menu: menu.value === "none" && menu.wasClicked,
        chef: chef.value === "none" && chef.wasClicked,
        date: date.value === "" && date.wasClicked,
    }
    
    const formValidationChecker=()=>{
        const allInputsClicked = phoneNumber.wasClicked && menu.wasClicked && chef.wasClicked && date.wasClicked
        const errorIsShowing = errCondition.phoneNumber || errCondition.menu || errCondition.chef || errCondition.date
        
        if(errorIsShowing){
            dispatch(formNotValid())
        }
        else if(allInputsClicked){
            dispatch(formValid())
        }
        else{
            dispatch(formNotValid())
        }
    }

    const handleChange = (e) => {
        dispatch(inputChange({ value: e.target.value, inputName: e.target.id }))
    }
    
    const handleStatus = (e) => {
        dispatch(inputStatus({inputName:e.target.id}))
    }

    const sendMeetingToDb = async (e) =>{
        e.preventDefault()
        try{ 
            await addDoc(meetingsCollectionRef, {...new Meeting(loggedInUser.uid, phoneNumber.value, menu.value, chef.value, Timestamp.fromDate(new Date(date.value)))})
            dispatch(openModal())
            dispatch(fetchMeetings(loggedInUser))
        }
        catch{
            alert("Something went wrong, please try again")
        }
    }

    const sendUpdatedMeetingToDb = (e) =>{
        e.preventDefault()
        dispatch(updateMeeting())
    }

    return (
        <section className='booking-section'>
            <UserSidebar />
            <UserOverview />
            <form className='booking-form' onSubmit={editForm.status ? sendUpdatedMeetingToDb : sendMeetingToDb} autoComplete='off'>
                <h1>{editForm.status ? "Update Meeting" : "Book a meeting"}</h1>
                <div>
                    <label htmlFor='phoneNumber'>Phone Number: <sup>*</sup></label>
                    <input 
                        id="phoneNumber" 
                        type="tel" 
                        pattern="[0-9]{10}"
                        placeholder='Phone Number'
                        value={phoneNumber.value}
                        onChange={handleChange}
                        onFocus={handleStatus}
                        onBlur={formValidationChecker}
                    />
                </div>
                {errCondition.phoneNumber ? <small>{phoneNumber.errorMsg}</small> : null}
                <div>
                    <label htmlFor='menu'>Type of menu: <sup>*</sup></label>
                    <select id="menu" value={menu.value} onChange={handleChange} onFocus={handleStatus} onBlur={formValidationChecker}>
                        <option value="none">Select menu</option>
                        <option value="my-own-menu">Got my own menu</option>
                        <option value="No.1">No.1</option>
                        <option value="No.2">No.2</option>
                        <option value="No.3">No.3</option>
                    </select> 
                </div>
                {errCondition.menu ? <small>{menu.errorMsg}</small> : null}
                <div>
                    <label htmlFor="chef">Choose a chef: <sup>*</sup></label>
                    <select id="chef" value={chef.value} onChange={handleChange} onFocus={handleStatus} onBlur={formValidationChecker}>
                        <option value="none">Select chef</option>
                        <option value="Lisa Quinn">Lisa Quinn</option>
                        <option value="Ben Malone">Ben Malone</option>
                        <option value="Liam Pierce">Liam Pierce</option>
                    </select>    
                </div>
                {errCondition.chef ? <small>{chef.errorMsg}</small> : null}
                <div>
                    <label htmlFor='date'>Choose a date: <sup>*</sup></label>
                    <input 
                        type="date" 
                        id="date"
                        min={getTomorrowDate()}
                        value={date.value}
                        onChange={handleChange}
                        onFocus={handleStatus}
                        onBlur={formValidationChecker}
                    />
                </div>
                {errCondition.date ? <small>{date.errorMsg}</small> : null}
                <button
                    type="submit"
                    className={submitBtnIsDisabled ? "submit-button disabled" : "submit-button"}
                    disabled={submitBtnIsDisabled}>
                    {editForm.status ? "UPDATE" : "SUBMIT"}
                </button>
            </form>
        </section>
    )
}

export default BookingForm