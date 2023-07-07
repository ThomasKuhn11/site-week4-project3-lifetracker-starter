import * as React from "react";
import "./Landing.css";

export default function Landing() {

    return (
        <div className="container">
          <div className="hero-image">
            <img src="https://www.muscleandfitness.com/wp-content/uploads/2016/09/Bodybuilder-Working-Out-His-Upper-Body-With-Cable-Crossover-Exercise.jpg?quality=86&strip=all" alt="Hero" />
          </div>
          <div className="blurb">
            <h1>Welcome to MyFitnessApp!</h1>
            <p>
              MyApp is an amazing application that helps you track your daily activities, set goals, and improve your productivity.
            </p>
          </div>
        </div>
      );
    };
