const upcomingModel = require("../models/upcoming-model")
const utilities = require("../utilities/")


/* ****************************************
*  Deliver New Cars view
* *************************************** */
async function viewNewCars(req, res, next) {
    let nav = await utilities.getNav()
    res.render("upcoming/new-cars", {
      title: "Future Car Models: Upcoming Releases",
      nav,
    })
  }

  module.exports = {viewNewCars}
