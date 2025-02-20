const utilities = require("../utilities/")
const upcModel = require("../models/upcoming-model")


/* ****************************************
*  Deliver New Cars view
* *************************************** */
async function viewNewCars(req, res, next) {
    let nav = await utilities.getNav()
    let data = await upcModel.getUpcomingId()
    let newCar =  await utilities.buildNewCarView(data)
    res.render("upcoming/new-cars", {
      title: "Future Car Models: Upcoming Releases",
      nav,
      newCar,
    })
  }

  module.exports = {viewNewCars}
