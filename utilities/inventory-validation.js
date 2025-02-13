const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}
  
  /*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
  validate.registationRules = () => {
    return [
     
      body("inv_make")
        .trim()
        .escape()
        .notEmpty()
       // .isLength({ min: 1 })
        .withMessage("Please provide a Make."), // on error this message is sent.
  
   
      body("inv_model")
        .trim()
        .escape()
        .notEmpty()
       // .isLength({ min: 2 })
        .withMessage("Please provide Model."), // on error this message is sent.

        body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide Description."), // on error this message is sent.
   

        body("inv_imagen")
        .trim()
        //.escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide path."),

        body("inv_thumbnail")
        .trim()
        //.escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide path."),

        body("inv_price")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide price."),

        body("inv_year")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage("Please provide year."),

        body("inv_miles")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide Miles."),

        body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide color."),
  
      
    ]
  }

    /*  **********************************
  * Update Data Validation Rules
  * ********************************* */
    validate.newInventoryRules = () => {
      return [
       
        body("inv_make")
          .trim()
          .escape()
          .notEmpty()
         // .isLength({ min: 1 })
          .withMessage("Please provide a Make."), // on error this message is sent.
    
     
        body("inv_model")
          .trim()
          .escape()
          .notEmpty()
         // .isLength({ min: 2 })
          .withMessage("Please provide Model."), // on error this message is sent.
  
          body("inv_description")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide Description."), // on error this message is sent.
     
  
          body("inv_imagen")
          .trim()
          //.escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide path."),
  
          body("inv_thumbnail")
          .trim()
          //.escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide path."),
  
          body("inv_price")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide price."),
  
          body("inv_year")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 4 })
          .withMessage("Please provide year."),
  
          body("inv_miles")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide Miles."),
  
          body("inv_color")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide color."),
    
        
      ]
    }
  

  /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { classification_id,inv_make , inv_model,inv_description, inv_image,inv_thumbnail,inv_price,inv_year,inv_miles,inv_color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      const  classificationList = await utilities.buildClassificationList()
      const viewAddInv = await utilities.buildAddInventoryView()
      res.render("inventory/add-inventory", {
        errors,
        title: "Add new Inventory",
        nav,
        classificationList,
        viewAddInv,
        classification_id,
        inv_make ,
        inv_model,
        inv_description,
        inv_image,inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color
      })
      return
    }
    next()
  }
  

  /* ******************************
 * Check data and return errors or continue to Edit view
 * ***************************** */
  validate.checkUpdateData = async (req, res, next) => {
    const { classification_id,inv_make , inv_model,inv_description, inv_image,inv_thumbnail,inv_price,inv_year,inv_miles,inv_color,inv_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      const  classificationList = await utilities.buildClassificationList()
      const viewAddInv = await utilities.buildAddInventoryView()
      res.render("inventory/edit-inventory", {
        errors,
        title: "Edit",
        nav,
        classificationList,
        viewAddInv,
        classification_id,
        inv_make ,
        inv_model,
        inv_description,
        inv_image,inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        inv_id,
      })
      return
    }
    next()
  }

  module.exports = validate