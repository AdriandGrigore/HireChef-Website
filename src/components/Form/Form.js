import React, { useReducer} from 'react'
import "../Form/Form.css"

const getCurrentDate=()=>{
  const date= new Date()
  const day= date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month= date.getMonth()<10 ? `0${date.getMonth()+1}` : date.getMonth()+1
  const year= date.getFullYear()
  return (
    `${year}-${month}-${day}`
  )
}

const ACTION={
  INPUT_CHANGE:"INPUT_CHANGE",
  INPUT_STATUS:"INPUT_STATUS",
  FORM_VALID:"FORM_VALID",
  FORM_NOT_VALID:"FORM_NOT_VALID",
  RESET_FORM:"RESET_FORM",
}

const initialState = {
  firstName: {
    value: "",
    wasClicked: false,
    error: "First name must be 3 characters long",
  },
  lastName: {
    value: "",
    wasClicked: false,
    error: "Last name must be 3 characters long",
  },
  email: {
    value: "",
    wasClicked: false,
    error:"Enter a valid e-mail address",
  },
  phoneNumber: {
    value: "",
    wasClicked: false,
    error:"Enter a valid phone number"
  },
  menu: {
    value: "none",
    wasClicked: false,
    error:"Please select a menu",
  },
  chef: {
    value: "none",
    wasClicked: false,
    error:"Please select a chef"
  },
  date: {
    value: "",
    wasClicked: false,
    error:"Select a date"
  },
  isDisabled: true
}

const reducer=(state, {type,payload})=>{
  switch(type){
    case ACTION.INPUT_CHANGE:
      return {...state, [payload.name]:{...state[payload.name],value:payload.value}}
    case ACTION.INPUT_STATUS:
      return {...state, [payload.name]:{...state[payload.name], wasClicked:true}}
    case ACTION.FORM_NOT_VALID:
      return {...state, isDisabled:true}
    case ACTION.FORM_VALID:
      return {...state, isDisabled:false}
    case ACTION.RESET_FORM:
      return initialState
    default:
      return state
  }
}

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const errorCondition ={
    firstName: state.firstName.value.length < 3 && state.firstName.wasClicked,
    lastName: state.lastName.value.length < 3 && state.lastName.wasClicked,
    email: state.email.value.length < 3 && state.email.wasClicked,
    phoneNumber: state.phoneNumber.value.length < 10 && state.phoneNumber.wasClicked,
    menu: state.menu.value === "none" && state.menu.wasClicked,
    chef: state.chef.value === "none" && state.chef.wasClicked,
    date: state.date.value === "" && state.date.wasClicked,
  }
  
  const formValidationChecker=()=>{
    const {firstName, lastName, email, phoneNumber,menu,chef,date}=errorCondition
    const allInputsClicked = state.firstName.wasClicked && state.lastName.wasClicked && state.email.wasClicked && state.phoneNumber.wasClicked && state.menu.wasClicked && state.chef.wasClicked && state.date.wasClicked

    if(firstName || lastName || email || phoneNumber || menu || chef || date){
      dispatch({type:ACTION.FORM_NOT_VALID})
    }
    else if(allInputsClicked){
      dispatch({type:ACTION.FORM_VALID})
    }
    else{
      dispatch({type:ACTION.FORM_NOT_VALID})
    }
  }

  const handleChange = (e) => {
    dispatch({ type: ACTION.INPUT_CHANGE, payload: { value: e.target.value, name: e.target.id } })
  }
  
  const handleStatus = (e) => {
    dispatch({ type: ACTION.INPUT_STATUS, payload: { name: e.target.id } })
  }

  const submitForm = (e) => {
    e.preventDefault()
    alert("Form submited")
    dispatch({type:ACTION.RESET_FORM})
  }

  return (
    <div className='booking-section'>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="firstName">First Name: <sup>*</sup></label>
          <input 
            type="text" 
            id="firstName"
            placeholder='First Name'
            value={state.firstName.value}
            onChange={handleChange}
            onFocus={handleStatus}
            onBlur={formValidationChecker}
          />
        </div>
        {errorCondition.firstName ? <small>{state.firstName.error}</small> : null}
        <div>
          <label htmlFor='lastName'>Last Name: <sup>*</sup></label>
          <input 
            type="text" 
            id="lastName" 
            placeholder='Last Name'
            value={state.lastName.value}
            onChange={handleChange}
            onFocus={handleStatus}
            onBlur={formValidationChecker}
          />
        </div>
        {errorCondition.lastName ?<small>{state.lastName.error}</small>: null}
        <div>
          <label htmlFor='email'>E-mail address: <sup>*</sup></label>
          <input 
            type="email" 
            id="email" 
            placeholder='E-mail address'
            value={state.email.value}
            onChange={handleChange}
            onFocus={handleStatus}
            onBlur={formValidationChecker}
          />
        </div>
        {errorCondition.email ?<small>{state.email.error}</small> : null}
        <div>
          <label htmlFor='phoneNumber'>Phone Number: <sup>*</sup></label>
          <input 
            id="phoneNumber" 
            type="tel" 
            pattern="[0-9]{10}"
            placeholder='Phone Number'
            value={state.phoneNumber.value}
            onChange={handleChange}
            onFocus={handleStatus}
            onBlur={formValidationChecker}
          />
        </div>
        {errorCondition.phoneNumber ?<small>{state.phoneNumber.error}</small> : null}
        <div>
          <label htmlFor='menu'>Type of menu: <sup>*</sup></label>
          <select id="menu" value={state.menu.value} onChange={handleChange} onFocus={handleStatus} onBlur={formValidationChecker}>
            <option value="none">Select menu</option>
            <option value="my-own-menu">Got my own menu</option>
            <option value="No.1">No.1</option>
            <option value="No.2">No.2</option>
            <option value="No.3">No.3</option>
          </select> 
        </div>
        {errorCondition.menu ? <small>{state.menu.error}</small> : null}
        <div>
          <label htmlFor="chef">Choose a chef: <sup>*</sup></label>
          <select id="chef" value={state.chef.value} onChange={handleChange} onFocus={handleStatus} onBlur={formValidationChecker}>
            <option value="none">Select chef</option>
            <option value="Lisa Quinn">Lisa Quinn</option>
            <option value="Ben Malone">Ben Malone</option>
            <option value="Liam Pierce">Liam Pierce</option>
          </select>    
        </div>
        {errorCondition.chef ? <small>{state.chef.error}</small> : null}
        <div>
          <label htmlFor='date'>Choose a date: <sup>*</sup></label>
          <input 
            type="date" 
            id="date"
            min={getCurrentDate()}
            value={state.date.value}
            onChange={handleChange}
            onFocus={handleStatus}
            onBlur={formValidationChecker}
          />
        </div>
        {errorCondition.date ? <small>{state.date.error}</small> : null}
        <button type='submit' className={state.isDisabled?"submit-button disabled": "submit-button"} disabled={state.isDisabled}>SUBMIT</button>
      </form>
    </div>
  )
}

export default Form