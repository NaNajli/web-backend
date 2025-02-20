const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const upcomingController = require("../controllers/upcomingController")

//get router View of upcoming Cars
router.get("/new-cars", utilities.handleErrors(upcomingController.viewNewCars))

module.exports = router;