import Home from "./pages/Home";
import Menu from "./pages/Menu"
import Booking from "./pages/Booking"
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
