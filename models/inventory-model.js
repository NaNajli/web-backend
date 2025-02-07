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


async function addNewClassification(classification_name)
{
  try{
      const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *";
      return await pool.query(sql, [classification_name])
  }catch(error)
  {
    return error.message 
  }
}
/*
async function addNewClassification(classification_name)
{
  try {
    const sql = await pool.query(`INSERT INTO classification (classification_name)VALUES ($1) RETURNING *
       `, [classification_name]
      )
      return sql.rows[0]
  }
  catch(error){
    return error.message 
  }
}
*/

async function addNewInventory(inv_make , inv_model,inv_description, inv_image,inv_thumbnail,inv_price,inv_year,inv_miles,inv_color)
{
  try{
      const sql = "INSERT INTO inventory (inv_make , inv_model,inv_description, inv_image,inv_thumbnail,inv_price,inv_year,inv_miles,inv_color) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";
      return await pool.query(sql, [inv_make , inv_model,inv_description, inv_image,inv_thumbnail,inv_price,inv_year,inv_miles,inv_color])
  }catch(error)
  {
    return error.message 
  }
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventory,getInventoryByInventoryId , addNewClassification, addNewInventory};