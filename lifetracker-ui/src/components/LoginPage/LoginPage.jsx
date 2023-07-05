import * as React from "react";
import "./LoginPage.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

export default function LoginPage({setAppState}) {

  const navigate = useNavigate()
  //const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setUser((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    //setIsLoading(true)
    setErrors((e) => ({ ...e, user: null }))

    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, user)
      if (res?.data) {
        console.log(  res.data)
        setAppState(res.data)
        //setIsLoading(false)
        navigate("/activityPage")
      } else {
        setErrors((e) => ({ ...e, user: "Invalid username/password combination" }))
        //setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, user: message ? String(message) : String(err) }))
      //setIsLoading(false)
    }
  }





  return (

    <div class="loginPage">
      
        <h2 class="welcomeMessage">Welcome</h2>
        {Boolean(errors.user) && <span className="error">{errors.user}</span>}
        
        <div class="userInputs">
          <user>
            <div class="inputsFrame">
              <div role="group" class="frame">
                <div class="bar" data-group="true">
                  <div class="icon">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      class="css-119zpey"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                    </svg>
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    id="field-:r0:"
                    required=""
                    aria-required="true"
                    class="chakra-input css-trvw4f"
                    value={user.email}
                    onChange={handleOnInputChange}

                  ></input>
                </div>
              </div>
              <div role="group" class="frame">
                <div class="bar" data-group="true">
                  <div class="icon">
         
                  </div>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    id="field-:r1:"
                    required=""
                    aria-required="true"
                    class="chakra-input css-67vh0"
                    value={user.password}
                    onChange={handleOnInputChange}

                  ></input>
                  <div class="chakra-input__right-element css-1qww07b">
                    <button type="button" class="chakra-button css-18zqh0c">
                      Show
                    </button>
                  </div>
                </div>
              </div>
              <button type="submit" onClick={handleOnSubmit} class="chakra-button css-4lvvxn">
                Login
              </button>
            </div>
          </user>
        </div>
      
      <div class="css-0">
        New to us?{" "}
        <a class="chakra-link css-c6nly4" href="/register">
          Sign Up
        </a>
      </div>
    </div>
  );
}
