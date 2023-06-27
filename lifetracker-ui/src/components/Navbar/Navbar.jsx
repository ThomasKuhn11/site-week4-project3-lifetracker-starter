import * as React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
      <div class="Navbar css-15bu2in">
        <div class="css-70qvj9">
          <a class="chakra-link css-14rj303" href="/">
            <img src="/assets/codepath-f1b3e41a.svg" alt="logo"></img>
          </a>
          <a class="chakra-link css-74uit1" href="/activity">
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
        <div class="css-70qvj9">
          <a class="chakra-link css-spn4bz" href="/login">
            <button type="button" class="chakra-button css-1t9i4zo">
              Sign In
            </button>
          </a>
          <a class="chakra-link css-spn4bz" href="/register">
            <button type="button" class="chakra-button css-td8gbm">
              Register
            </button>
          </a>
        </div>
      </div>
  );
}
