import * as React from "react";
import "./Navbar.css";
//import { useNavigate } from 'react-router-dom';


export default function Navbar({appState, setAppState}) {
  //const navigate = useNavigate();
  console.log(appState?.user)


  const handleOnLogout = () => {
    setAppState({})
    //navigate("/")
    localStorage.removeItem("token");
  }

  return (
      <div class="Navbar css-15bu2in">
        <div class="css-70qvj9">
          <a class="chakra-link css-14rj303" href="/">
            🏠
          </a>
          <a class="chakra-link css-74uit1" href="/activityPage">
            Activity
          </a>
          <a class="chakra-link css-74uit1" href="/exercise">
            Exercise
          </a>
          <a class="chakra-link css-74uit1" href="/nutrition">
            Nutrition
          </a>
          <a class="chakra-link css-74uit1" href="/sleep">
            Sleep
          </a>
        </div>

        <nav>
      <div className="css-70qvj9">
        { typeof appState.user === 'undefined' ? (
          <>
            <a className="chakra-link css-spn4bz" href="/login">
              <button type="button" className="chakra-button css-1t9i4zo">
                Sign In
              </button>
            </a>
            <a className="chakra-link css-spn4bz" href="/register">
              <button type="button" className="chakra-button css-td8gbm">
                Register
              </button>
            </a>
          </>
        ) : (
          <button type="button" onClick={handleOnLogout}>
            Log Out
          </button>
        )}
      </div>
    </nav>


      </div>
  );
}
