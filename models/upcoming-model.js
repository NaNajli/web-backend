const pool = require("../database/")

/* retrive data from upcoming table */

async function getUpcomingId() {
  const data = await pool.query(
    "SELECT * FROM public.upcoming ORDER BY upc_name"
  )
  return data.rows
}


module.exports = { getUpcomingId}