
const express = require("express")
const User = require("../models/user") //used to interact with backend
const router = express.Router()


router.post("/register", async function (req, res, next) {
    console.log("in register route")    
    try {
      console.log(req.body)
      const user = await User.register(req.body)
      return res.status(201).json({ user })
    } catch (err) {
      next(err)
    }
  })

  module.exports = router