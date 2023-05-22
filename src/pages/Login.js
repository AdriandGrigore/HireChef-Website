import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { resetAllStates } from '../actions/resetAllStates'

function Login() {
  const dispatch = useDispatch()
  const {userDataFetchedBefore} = useSelector(state => state.users)
  const {userRatingsFetchedBefore} = useSelector(state => state.rating)
  const {userMeetingsFetchedBefore} = useSelector(state => state.meetings)

  useEffect(() =>{
    if(userDataFetchedBefore || userRatingsFetchedBefore || userMeetingsFetchedBefore){
      dispatch(resetAllStates())
    }
  }, [dispatch, userDataFetchedBefore, userRatingsFetchedBefore, userMeetingsFetchedBefore])
  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  )
}

export default Login