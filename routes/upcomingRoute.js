const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const upcController = require("../controllers/upcomingController")

//get router View of upcoming Cars
router.get("/new-cars", utilities.handleErrors(upcController.viewNewCars))

module.exports = router;