import { Link, useNavigate } from "react-router-dom"
import "./ActivityPage.css"
import { useState } from "react"




export default function ActivityPage({user, setAppState}) {
    const navigate = useNavigate()
    
    const isAuthenticated = Boolean(user?.email)
  
    const handleOnLogout = () => {
      setAppState({})
      navigate("/")
    }

    const handleGoToNutritionPage = (event) => {
      navigate("/nutrition")
      

    }
  
    const title = isAuthenticated ? "" : "Please login to see your acrtivities."
  
    const content = isAuthenticated ? (
      <>
      <div className="rectangle">
        <h2>Total Exercise Minutes</h2>
        <button onClick={() => console.log('Exercise button clicked')}>
          Go to Exercise Page
        </button>
      </div>

      <div className="rectangle">
        <h2>Average Hours of Sleep</h2>
        <button onClick={() => console.log('Sleep button clicked')}>
          Go to Sleep Page
        </button>
      </div>

      <div className="rectangle">
        <h2>Average Daily Calories</h2>
        <button onClick={() => handleGoToNutritionPage}>
          Go to Nutrition Page
        </button>
      </div>
      </>
    ) : (
      <p className="appt">Thank you!</p>
    )
  
    const button = isAuthenticated ? (
      <button className="btn primary" onClick={handleOnLogout}>
        Logout
      </button>
    ) : (
      <Link to="/login">
        <button className="btn primary">Login</button>
      </Link>
    )
  
    return (
      <div className="Portal">
        <div className="content">
          {isAuthenticated ? <h1>Welcome, {user.firstName}!</h1> : null}
  
          <div className="card">
            <div className="header">
              <div className={`title ${isAuthenticated ? "green" : ""}`}>{title}</div>
            </div>
            <div className="content">{content}</div>
            <div className="footer">{button}</div>
          </div>
        </div>
  
        <div className="media">
          
        </div>
      </div>
    )
}