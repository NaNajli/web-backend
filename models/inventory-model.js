const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}
//  Get all inventory  data

async function getInventory(){
  return await pool.query("SELECT * FROM public.inventory ORDER BY inv_model")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

// function to retrieve the data for a specific vehicle in inventory, based on the inventory id

async function getInventoryByInventoryId(inv_id){
  try{
  const data = await pool.query(`SELECT inv_make , inv_model, inv_year, inv_price, inv_image, inv_description , inv_miles ,inv_color FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id
      WHERE inv_id = $1 ;`
       ,[inv_id]
      
  )
  return data.rows
}catch (error){
  console.error("getspecificVehicle error " + error)
}
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventory,getInventoryByInventoryId};