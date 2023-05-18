import Home from "./pages/Home";
import Menu from "./pages/Menu"
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./routers/ProtectedRoute";
import UserBooking from "./pages/UserBooking";
import UserMeetings from "./pages/UserMeetings";
import UserRatings from "./pages/UserRatings";
import HideRoute from "./routers/HideRoute";
import "./App.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/login" element={<HideRoute> <Login/> </HideRoute>}/>
        <Route path="/signup" element={<HideRoute> <SignUp/> </HideRoute>}/>
        <Route path= "/user/meetings" element={<ProtectedRoute> <UserMeetings/> </ProtectedRoute>}/>
        <Route path="/user/booking" element={<ProtectedRoute> <UserBooking/> </ProtectedRoute>}/>
        <Route path="/user/ratings" element={<ProtectedRoute> <UserRatings/> </ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
