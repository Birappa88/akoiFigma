import './App.css';
import Login from "./components/Login/login.js"
import Register from "./components/Register/register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Logo from "./assets/Logo.png"
import Group from "./assets/Group1.png"

function App() {

  const [user, setUser] = useState({})

  return (
    <div className="App">
      <img src={Logo} alt="logo" className="logo"></img>
      <img src={Group} alt="frame" className="frame"></img>
      <div className="rectangle"></div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/" element={<Register />} />
        </Routes>
      </Router>
      <div className="line"></div>

    </div>
  );
}

export default App;
