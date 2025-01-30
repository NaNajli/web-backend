const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildByInventoryId = async function(req,res,next)
{
  const inv_id = req.params.inventoryId
  let nav = await utilities.getNav()
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const vehicle = data[0]
  const viewDetail = await utilities.buildInventoryView(vehicle)
  res.render("./inventory/detail",{
    title: vehicle.inv_year + ' ' + '  '+ vehicle.inv_make  +  '  ' +  vehicle.inv_model ,
    viewDetail,
    nav,

  })
}
module.exports = invCont