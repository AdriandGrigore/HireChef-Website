import Home from "./pages/Home";
import Menu from "./pages/Menu"
import Booking from "./pages/Booking"
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./routers/ProtectedRoute";
import UserMeetings from "./pages/UserMeetings";
import "./App.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/booking" element={<ProtectedRoute> <Booking/> </ProtectedRoute>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/user/meetings" element={<ProtectedRoute> <UserMeetings/> </ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
