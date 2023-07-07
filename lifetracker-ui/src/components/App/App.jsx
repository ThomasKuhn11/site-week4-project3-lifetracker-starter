import './App.css'
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import Landing from "../Landing/Landing";
import { useState, useEffect } from 'react'

import ActivityPage from '../ActivityPage/ActivityPage'

import NutritionPage from '../NutritionPage/NutritionPage'
import jwt_decode from "jwt-decode";


function App(){ 
  const [appState, setAppState] = useState({})

  //add useEffect here like in token video 
  useEffect(() => {
    const checkLoggedIn = () => {
      //check if the user is logged in when the user first acceses the webpage
      //alert("hi")
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token);
        //setUserName(decodedToken.username)
        console.log(decodedToken)
        setAppState(decodedToken)
        
        if (decodedToken.exp * 1000 > Date.now()) {
          //setLoggedIn(true);
          setAppState(decodedToken)
        } else {
          //token has expired
          handleLogout();
        }
      }

    }

    checkLoggedIn();
  }, [])

  const handleLogout = () => {
    setAppState({})
    //navigate("/")
    localStorage.removeItem("token");
  }

  return (
    <div className='app'>

      <Navbar appState={appState} setAppState={setAppState}/>


      <BrowserRouter>
         
         <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage setAppState={setAppState}/>} />
          <Route path="/register" element={<RegistrationPage setAppState={setAppState}/>} />
          <Route path="/activityPage" element={<ActivityPage setAppState={setAppState} appState={appState} user={appState?.user}/> }/>
          <Route path="/nutrition" element={<NutritionPage user={appState?.user}/>} />
        </Routes>
      
      
      </BrowserRouter>

      

    </div>
  )
}

export default App
