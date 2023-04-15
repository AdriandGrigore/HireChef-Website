import Home from "./pages/Home";
import Menu from "./pages/Menu"
import Booking from "./pages/Booking"
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import ProtectedRoute from "./routers/ProtectedRoute";
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
        <Route path="/user" element={<ProtectedRoute> <User/> </ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
