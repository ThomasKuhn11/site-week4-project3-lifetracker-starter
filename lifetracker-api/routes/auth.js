
const express = require("express")
const User = require("../models/user") //used to interact with backend
const router = express.Router()


//form axios post in front //////////////////////////
/*
router.post("/login", async function (req, res, next) { //postman to check endpointwork and after do it on front end like paige showed
    try {
      const user = await User.authenticate(req.body)
      return res.status(200).json({ user })
    } catch (err) {
      next(err)
    }
  })

  */