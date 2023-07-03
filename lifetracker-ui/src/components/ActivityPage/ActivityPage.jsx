import { Link, useNavigate } from "react-router-dom"



export default function ActivityPage({user, setAppState}) {
    const navigate = useNavigate()
    const isAuthenticated = Boolean(user?.email)
  
    const handleOnLogout = () => {
      setAppState({})
      navigate("/")
    }
  
    const title = isAuthenticated ? "Welcome" : "Please login to see your acrtivities."
  
    const content = isAuthenticated ? (
      <>
        <p className="appt">Hella ACTIVITIES</p>
        <p className="location">
          Please head to <strong>{user.location}</strong> on that day.
        </p>
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