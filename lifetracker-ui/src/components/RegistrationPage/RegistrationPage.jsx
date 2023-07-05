import * as React from "react";
import "./RegistrationPage.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

export default function RegistrationPage({setAppState}) {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputChange = (event) => {
    //console.log(event.target.name, event.target.value)
    //console.log(user.password, user.passwordConfirm)

    if (event.target.name === "password") {
      if (user.passwordConfirm && user.passwordConfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (user.password && user.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setUser((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async () => {
    //setIsLoading(true)
    //setErrors((e) => ({ ...e, user: null }));

    // if (user.passwordConfirm !== user.password) {
    //   setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
    //   //setIsLoading(false)
    //   //return;
    // } else {
    //   setErrors((e) => ({ ...e, passwordConfirm: null }));
    // }

    // if (user.email.indexOf("@") === -1) {
    //   setErrors((e) => ({ ...e, email: "Please enter a valid email." }));   
    // } else {
    //   setErrors((e) => ({ ...e, email: null }));
    
    // }

    console.log(errors);

    try {
      if (errors.passwordConfirm === null && errors.email === null) {
       
        const res = await axios.post("http://localhost:3001/auth/register", {
          username: user.username,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });

        if (res?.data?.user ) {
            setAppState(res.data)
            //setIsLoading(false)
            navigate("/login");

        }
        
   
      } else {
        setErrors((e) => ({
          ...e,
          user: "Something went wrong with registration",
        }));
        //setIsLoading(false)
      }



    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        user: message ? String(message) : String(err),
      }));
      //setIsLoading(false)
    }
  };

  return (
    <div className="registrationPage">
      <h2 className="createAccountHeader">Create an Account</h2>
      <div className="userInputs">
        <div className="inputsFrame">
          <div className="frame">
            <div className="bar">
              <div className="icon">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="icon"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                </svg>
              </div>
              <form>
                <div className="inputField">
                  <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    id="field-:r2:"
                    value={user.email}
                    onChange={handleInputChange}
                  ></input>
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div role="group" className="frame">
            <div className="bar" data-group="true">
              <div className="icon">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  className="icon"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path>
                </svg>
              </div>
              <input
                name="username"
                type="text"
                placeholder="Username"
                id="field-:r3:"
                required=""
                aria-required="true"
                className="chakra-input css-trvw4f"
                value={user.username}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="frame">
            <div role="group" className="usernameInput">
              <div className="chakra-input__group css-bx0blc" data-group="true">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  id="field-:r4:"
                  required=""
                  aria-required="true"
                  className="chakra-input css-qz53jc"
                  value={user.firstName}
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
            &nbsp;
            <div role="group" className="frame">
              <div className="bar" data-group="true">
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  id="field-:r5:"
                  required=""
                  aria-required="true"
                  className="chakra-input css-qz53jc"
                  value={user.lastName}
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
          </div>
          <div role="group" className="frame">
            <div className="bar" data-group="true">
              <div className="chakra-input__left-element css-17ke578">
         
              </div>
              <div className="inputField">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  id="field-:r6:"
                  required=""
                  aria-required="true"
                  className="chakra-input css-67vh0"
                  value={user.password}
                  onChange={handleInputChange}
                ></input>
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              <div className="chakra-input__right-element css-1qww07b">
                <button type="button" className="chakra-button css-18zqh0c">
                  Show
                </button>
              </div>
            </div>
          </div>
          <div role="group" className="frame">
            <div className="bar" data-group="true">
              <div className="chakra-input__left-element css-17ke578">
    
              </div>
              <div className="inputField">
                <input
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirm Password"
                  id="field-:r7:"
                  required=""
                  aria-required="true"
                  className="chakra-input css-67vh0"
                  value={user.passwordConfirm}
                  onChange={handleInputChange}
                ></input>
                {errors.passwordConfirm && (
                  <span className="error">{errors.passwordConfirm}</span>
                )}
              </div>

              <div className="chakra-input__right-element css-1qww07b">
                <button type="button" className="chakra-button css-18zqh0c">
                  Show
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="submitButton" onClick={handleSubmit}>
            Sign up
          </button>
        </div>
      </div>

      <div className="css-0">
        Have an account?{" "}
        <a className="chakra-link css-c6nly4" href="/login">
          Login
        </a>
      </div>
    </div>
  );
}
