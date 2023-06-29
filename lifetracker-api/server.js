const express = require('express')

const authRoutes = require("./routes/auth")

//const PORT = process.env.SERVER_PORT || 3002

const app = require("./app")
const { PORT } = require("./config")

//const app = express()


app.use(express.json())



app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})


//README line 432