import React from 'react'
import {useSelector, useDispatch }from "react-redux"
import { inputChange, inputStatus, formValid, formNotValid, resetForm} from '../../features/formSlice'
import { openModal } from '../../features/modalSlice'
import "../Form/Form.css"

const getCurrentDate=()=>{
  const date= new Date()
  const day= date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month= date.getMonth() < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
  const year= date.getFullYear()
  return (
    `${year}-${month}-${day}`
  )
}

function Form() {

  const {firstName, lastName, email, phoneNumber, menu, chef, date, submitBtnIsDisabled}= useSelector((state)=>state.form)
  const dispatch = useDispatch()

  const errCondition ={
    firstName: firstName.value.length < 3 && firstName.wasClicked,
    lastName: lastName.value.length < 3 && lastName.wasClicked,
    email: email.value.length < 3 && email.wasClicked,
    phoneNumber: phoneNumber.value.length < 10 && phoneNumber.wasClicked,
    menu: menu.value === "none" && menu.wasClicked,
    chef: chef.value === "none" && chef.wasClicked,
    date: date.value === "" && date.wasClicked,
  }
  
  const formValidationChecker=()=>{
    const allInputsClicked = firstName.wasClicked && lastName.wasClicked && email.wasClicked && phoneNumber.wasClicked && menu.wasClicked && chef.wasClicked && date.wasClicked
    const errorIsShowing = errCondition.firstName || errCondition.lastName || errCondition.email || errCondition.phoneNumber || errCondition.menu || errCondition.chef || errCondition.date
    
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

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(resetForm())
    dispatch(openModal())
  }

  return (
    <div className='booking-section'>
      <form onSubmit={submitForm} autoComplete='off'>
        <div>
          <label htmlFor="firstName">First Name: <sup>*</sup></label>
          <input 
            type="text" 
            id="firstName"
            placeholder='First Name'
            value={firstName.value}
            onChange={handleChange}
            onFocus={handleStatus}
            onBlur={formValidationChecker}
          />
        </div>
        {errCondition.firstName ? <small>{firstName.errorMsg} </small> : null}
        <div>
          <label htmlFor='lastName'>Last Name: <sup>*</sup></label>
          <input 
            type="text" 
            id="lastName" 
            placeholder='Last Name'
            value={lastName.value}
            onChange={handleChange}
            onFocus={handleStatus}
            onBlur={formValidationChecker}
          />
        </div>
        {errCondition.lastName ? <small>{lastName.errorMsg}</small> : null}
        <div>
          <label htmlFor='email'>E-mail address: <sup>*</sup></label>
          <input 
            type="email" 
            id="email" 
            placeholder='E-mail address'
            value={email.value}
            onChange={handleChange}
            onFocus={handleStatus}
            onBlur={formValidationChecker}
          />
        </div>
        {errCondition.email ? <small>{email.errorMsg}</small> : null}
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
          <select id="menu" value={menu.value} onChange={handleChange} onFocus={handleStatus} onBlur={formValidationChecker} >
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
          <select id="chef" value={chef.value} onChange={handleChange} onFocus={handleStatus} onBlur={formValidationChecker} >
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
            min={getCurrentDate()}
            value={date.value}
            onChange={handleChange}
            onFocus={handleStatus} 
            onBlur={formValidationChecker}
          />
        </div>
        {errCondition.date ? <small>{date.errorMsg}</small> : null}
        <button type='submit' className={ submitBtnIsDisabled ? "submit-button disabled": "submit-button" } disabled={submitBtnIsDisabled}>SUBMIT</button>
      </form>
    </div>
  )
}

export default Form