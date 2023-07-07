
const express = require("express")
const User = require("../models/user") //used to interact with backend
const Nutrition = require("../models/nutrition")
const router = express.Router()



router.post("/login", async function (req, res, next) { //postman to check endpointwork and after do it on front end like paige showed
    try {
      const user = await User.authenticate(req.body)
      return res.status(200).json({ user })
    } catch (err) {
      next(err)
    }
  })


router.post("/register", async function (req, res, next) {
       
    try {
      console.log(req.body)
      const user = await User.register(req.body)
      return res.status(201).json({ user })
    } catch (err) {
      next(err)
    }
  })

  router.post("/nutrition", async function (req, res, next) {
       
    try {
      console.log("post nutrition", req.body)
      const nutri = await Nutrition.addItem(req.body)
      return res.status(201).json({ nutri })
    } catch (err) {
      next(err)
    }
  })


  

  module.exports = router