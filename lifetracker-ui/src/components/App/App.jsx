import './App.css'
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import Landing from "../Landing/Landing";
import { useState } from 'react'

import ActivityPage from '../ActivityPage/ActivityPage'

import NutritionPage from '../NutritionPage/NutritionPage'


function App(){ 
  const [appState, setAppState] = useState({})

  //add useEffect here like in token video 

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
