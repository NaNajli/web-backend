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

/* ***************************
 *  Build Vehicle Management  view
 * ************************** */

invCont.builManagement = async function (req, res, next)
{
  let nav = await utilities.getNav()
  let viewMng = await utilities.buildMngView()
  const  classificationList = await utilities.buildClassificationList()
  res.render("./inventory/management",{
    title: "Vehicle Management" ,
    nav,
    viewMng,
    classificationList,
    
  })
}

invCont.buildAddClassification = async function(req, res, next)
{
  let nav = await utilities.getNav()
  const management = await utilities.buildMngView()
  const viewAddCla = await utilities.buildAddClassiView()
  res.render("inventory/add-classification", 
    // res.render("./inventory/add-classification", 
    {
      title: "Add new Classification",
      nav,
      management,
      viewAddCla,
    })
}

invCont.buildAddInventory = async function(req, res, next)
{
  let nav = await utilities.getNav()
  const management = await utilities.buildMngView()
  const classificationList = await utilities.buildClassificationList()
  const viewAddInv = await utilities.buildAddInventoryView()
  res.render("inventory/add-inventory", 
    // res.render("./inventory/add-inventory", 
    {
      title: "Add new Inventory",
      nav,
      management,
      classificationList,
      viewAddInv,
    })
}


/* ****************************************
*  Process Add new classification
* *************************************** */

 invCont.addNewClassification  = async function(req, res) {
    nav = await utilities.getNav()
    const viewAddCla = await utilities.buildAddClassiView()
    const { classification_name} = req.body

    const regResult = await invModel.addNewClassification(
      classification_name
    )
    if (regResult) {
      req.flash(
        "notice",
         `Congratulations, you\'re added ${classification_name}`
      )
      res.status(201).render("inventory/add-classification", {
        title: "Add new Classification",
        nav,
        viewAddCla,
      
      })
    } else {
      req.flash("notice", "Sorry, the action failed.")
      res.status(501).render("inventory/add-classification", {
        title: "Add new Classification",
        nav,
      })
    }
  }

/* ****************************************
*  Process Add new inventory
* *************************************** */
  invCont.addNewInventory = async function(req, res) {
    nav = await utilities.getNav()
    const  classificationList = await utilities.buildClassificationList()
    const viewAddInv = await utilities.buildAddInventoryView()
    const { classification_id,
            inv_make,
            inv_model,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_year,
            inv_miles,
            inv_color} = req.body

    const regResult = await invModel.addNewInventory(
      classification_id,
      inv_make ,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color
    )
    if (regResult) {
      req.flash(
        "notice",
         `Congratulations, you\'re added ${inv_model}`
      )
      res.status(201).render("inventory/add-inventory", {
        title: "Add new Inventory",
        nav,
        classificationList,
        viewAddInv,
      
      })
    } else {
      req.flash("notice", "Sorry, the action failed.")
      res.status(501).render("inventory/add-inventory", {
        title: "Add new Classification",
        nav,
       
      })
    }
  }

  /* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build edit inventory view
 * ************************** */


invCont.viewInventoryUpdate = async function(req, res, next)
{ 
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryInventoryId(inv_id)
  const  classificationList = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName ,
    nav,
    classificationList: classificationList,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id,
   

    })
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inventory/management")
  } else {
    const classificationList = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList: classificationList,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}



module.exports = invCont

