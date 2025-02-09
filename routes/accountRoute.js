const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const accountController = require ("../controllers/accountController")
const regValidate = require('../utilities/account-validation')


router.get("/login", utilities.handleErrors(accountController.buildLogin ))

router.get("/register" , utilities.handleErrors(accountController.buildRegister))

// route to build Management View
router.get( "/", 
  utilities.checkLogin,
  utilities.handleErrors(accountController.managementView ))

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login request
router.post(
  "/login",
   regValidate.loginRules(),
   regValidate.checkLoginData,
   utilities.handleErrors(accountController.accountLogin)
)




module.exports = router;