// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const regValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// an appropriate route as part of the inventory route file
router.get("/detail/:inventoryId", invController.buildByInventoryId);

// route to build Management View
router.get( "/", invController.builManagement)

//route to build Add new classification
router.get("/add-classification" , utilities.handleErrors(invController.buildAddClassification ))

//route to build Add new inventory

// router.get("/add-inventory" , invController.buildAddInventory)
router.get("/add-inventory" ,utilities.handleErrors(invController.buildAddInventory))


//router.post("/add-classification", invController.buildAddClassification)


router.post("/add-classification",
      utilities.handleErrors(invController.addNewClassification))

router.post("/add-inventory",
     //regValidate.registationRules(),
     //regValidate.checkRegData,
     utilities.handleErrors(invController.addNewInventory))


router.get("/getInventory/:classification_id", 
utilities.handleErrors(invController.getInventoryJSON))     

//view to update
router.get("/edit/:inv_id", 
utilities.handleErrors(invController.viewInventoryUpdate))  


//view to edit inventory
router.post("/update/", 
      regValidate.newInventoryRules(),
      regValidate.checkUpdateData,
      utilities.handleErrors(invController.updateInventory))

//router to delete view 
router.get("/delete/:inv_id", utilities.handleErrors(invController.deleteView)) 

//route to delete
router.post("/delete/", 
      utilities.handleErrors(invController.deleteItem))
 
      
         
module.exports = router;
