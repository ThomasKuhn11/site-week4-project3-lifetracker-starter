import './App.css'
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";


function App() {

  return (
    <div className='app'>

      <Navbar/>


      <BrowserRouter>
         
         <Routes>
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegistrationPage />} /> */}
        </Routes>
      
      
      </BrowserRouter>

      

    </div>
  )
}

export default App
