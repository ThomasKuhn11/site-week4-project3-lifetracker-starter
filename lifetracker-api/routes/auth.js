const express = require("express");
const User = require("../models/user"); //used to interact with backend
const Nutrition = require("../models/nutrition");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", async function (req, res, next) {
  //postman to check endpointwork and after do it on front end like paige showed
  try {
    const user = await User.authenticate(req.body);

    //Generate and sign JWT token
    //pass in whole user: {}
    console.log(user)
    const token = jwt.sign({ user }, "longRandomString", {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "login successful",
      token: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        date: user.date,
      },
    });

    //return res.status(200).json({ user })
  } catch (err) {
    next(err);
  }
});

router.post("/register", async function (req, res, next) {
  try {
    console.log(req.body);
    const user = await User.register(req.body);
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});

router.post("/nutrition", async function (req, res, next) {
  try {
    //console.log("post nutrition", req.body);
    const nutri = await Nutrition.addItem(req.body);
    return res.status(201).json({ nutri });
  } catch (err) {
    next(err);
  }
});

//new router.get that will call getAllItems
router.post("/nutritionFeed", async function (req, res, next) {
  try {
    console.log("get all nutrition", req.body);

    const nutri = await Nutrition.getAllItems(req.body.userId);
    //console.log(nutri)
    return res.status(201).json({ nutri });
  } catch (err) {
    next(err);
  }
});


//make new route nutrution feed
//need to filter by id on sql command 
//need to send the id along with the get request
//need an useEffect to call it inside nutritionFeed  

module.exports = router;
