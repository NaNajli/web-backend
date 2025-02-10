const invModel = require("../models/inventory-model")
const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
 // console.log(data)
  let list = "<ul class= display-nav>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

// will take the specific vehicle's information and wrap it up in HTML to deliver to the view

Util.buildInventoryView = async function (data){
  let viewDetail = ""
          viewDetail += '<ul id="detail">'
          viewDetail += '<li>'
          viewDetail += '<img src="'+ data.inv_image + '" alt="Image of '+ data.inv_model +'"/>'
          viewDetail += '<div class="detail-div">'
          viewDetail += '<h2>' + data.inv_make + ' ' + data.inv_model +'</h2>' 
          viewDetail += '<h1>'+' Price :'+'<span> $' + new Intl.NumberFormat('en-US').format(data.inv_price) + '</span>'+'</h1>'
          viewDetail += '<p><strong> Description:</strong> '+ data.inv_description + '</p>'
          viewDetail += '<p>'+'<strong> Color: </strong>' + data.inv_color +'</p>'
          viewDetail += '<p>'+'<strong> Mileage: </strong>' + new Intl.NumberFormat('en-US').format(data.inv_miles) +'</p>'
          viewDetail += '</div>'
          viewDetail += '</li>' 
          viewDetail += '</ul>'
  return viewDetail
}

/* **************************************
* Build Management view HTML
* ************************************ */

Util.buildAddClassiView = async function()
{
  let viewAddCla = ""
  viewAddCla += '<form class="add-classif-form" action="add-classification" method="post">'+'<br>'
  viewAddCla += '<label for="name" required>' + 'Classification Name:' + '</label>' +'<br>'  
  viewAddCla += '<input type="text" name="classification_name" id="classification_name" required>'+'<br>'
  viewAddCla += '<span class="view-add-cla">NAME MUST BE ALPHABETIC CHARACTERS ONLY '+'</span>'+'<br>'
  viewAddCla += '<input type="submit" id="submit" value="Add classification">'
  viewAddCla += '</form>'

  return viewAddCla
}

Util.buildAddInventoryView = async function()
{
  const data = await Util.buildClassificationList()
  let viewAddInv = ""
      viewAddInv += '<form class="add-inventory-form" action="add-inventory" method="post">'+'<br>'
      viewAddInv += '<div>' + data + '</div>'
    /*  viewAddInv += '<select id="" name="cars"><br>'
      viewAddInv += '<option value="classification_id">Custom</option>'
      viewAddInv += '<option value="classification_id">Sedan</option>'
      viewAddInv += '<option value="classification_id">Sport</option>'
      viewAddInv += '<option value="classification_id">SUV</option>'
      viewAddInv += '<option value="classification_id">Truck</option>'
       viewAddInv += '<option value="classification_id"></option>'
      viewAddInv += '</select><br>'*/
      viewAddInv += '<label for="inv_make">Make:'+'</label><br>'
      viewAddInv += '<input type="text" name="inv_make" id="inv_make" required value="" ><br>'
      viewAddInv += '<label for="inv_model">Model:' + '</label><br>'
      viewAddInv += '<input type="text" name="inv_model" id="inv_model" required value=""><br>'
      viewAddInv += '<label for="inv_description"> Description:' + '</label><br>'
      viewAddInv += '<textarea id="inv_description" name="inv_description"  rows="6" cols="30" required> </textarea><br>'
      viewAddInv += '<label for= "inv_image">Imagen Path:' + '</label>'+'<br>'
      viewAddInv += '<input type="text" name="inv_image" id="inv_image" required><br>'
      viewAddInv += '<label for= "inv_thumbnail">Thumbnail Path:' + '</label>'+'<br>'
      viewAddInv += '<input type="text" name="inv_thumbnail" id="inv_thumbnail" required><br>'
      viewAddInv += '<label for="inv_price"> Price:' + '</label>'+'<br>'
      viewAddInv += '<input type="text" id="inv_price" name="inv_price" required><br>'
      viewAddInv += '<label for="inv_year"> Year: '+ '</label>'+'<br>'
      viewAddInv += '<input type="text" id="inv_year" name="inv_year" required><br>'
      viewAddInv += '<label for="inv_miles"> Miles:' + '</label>'+'<br>'
      viewAddInv += '<input type="text" id="inv_miles" name="inv_miles" required><br>'
      viewAddInv += '<label for="inv_color">Color:' + '</label>'+'<br>'
      viewAddInv += '<input type="text" name="inv_color" id="inv_color" required value=""><br>'
      viewAddInv += '<input type="submit" id="submit" value="Add Vehicle">'
      viewAddInv += '</form>'
     
  return viewAddInv    
}


Util.buildMngView = async function()
{
  let viewMng = ''
      viewMng  += '<ul class= "management">'
      viewMng  += '<li>'
      viewMng  += '<a href="../../inv/add-classification "> Add New Classification </a>'
      viewMng += '</li>'
      viewMng  += '<li>'
      viewMng += '<a href="../../inv/add-inventory"> Add New Vehicle </a>' 
      viewMng += '</li>'
      viewMng += '</ul>' 
      return viewMng
}
/*
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList = '<form class="add-inventory-form" action="add-inventory" method="post">'+'<br>'
  classificationList +=  '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>" +'<br>'
  classificationList += '<label for="make">Make:</label><br>'
  classificationList += '<input type="text" name="inv_make" id="inv_make" required value="" ><br>'
  classificationList += '<label for="model">Model:</label><br>'
  classificationList += '<input type="text" name="inv_model" id="inv_model" required value=""><br>'
  classificationList += '<label for="description"> Description:</label><br>'
  classificationList += '<textarea name="inv_description"  rows="6" cols="30" required> </textarea><br>'
  classificationList += '<label for= "image">Imagen Path:<br>'
  classificationList += '<input type="text" name="inv_image" id="inv_image" required><br>'
  classificationList += '<label for= "imaget">Thumbnail Path:<br>'
  classificationList += '<input type="text" name="inv_thumbnail" id="inv_thumbnail" required><br>'
  classificationList += '<label for="price"> Price:<br>'
  classificationList += '<input type="text" id="inv_price" name="inv_price" required><br>'
  classificationList += '<label for="year"> Year:<br>'
  classificationList += '<input type="text" id="inv_year" name="inv_year" required><br>'
  classificationList += '<label for="miles"> Miles:<br>'
  classificationList += '<input type="text" id="inv_miles" name="inv_miles" required><br>'
  classificationList += '<label for="color">Color:</label><br>'
  classificationList += '<input type="text" name="inv_color" id="inv_color" required value=""><br>'
  classificationList += '<input type="submit" id="submit" value="Add Vehicle">'
  classificationList += '</form>'
 

  return classificationList
}
*/

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
/* ****************************************
* Middleware to check token validity
**************************************** */

Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }

 /* ****************************************
 *  Check Login
 * ************************************ */
 Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }

 


module.exports = Util