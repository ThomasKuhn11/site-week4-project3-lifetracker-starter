//implement config like in lab examplar
//than implement db.js to create connection

//from there start working on auth.js. Test backend endpoint with postman make sure endpoint works
//than start doing the front end with an axius post(they will send an example)

"use strict"

require("dotenv").config()
require("colors")

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const IS_TESTING = process.env.NODE_ENV === "test"

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "postgres"
  const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
  const dbHost = process.env.DATABASE_HOST || "localhost"
  const dbPort = process.env.DATABASE_PORT || 5432
  //const dbTestName = process.env.DATABASE_TEST_NAME || "lifetracker_test"
  const dbProdName = process.env.DATABASE_NAME || "lifetrackerdb"
  const dbName = dbProdName

  return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}




const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13


module.exports = {
  PORT,
  IS_TESTING,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
}