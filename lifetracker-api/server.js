const express = require('express')

const authRoutes = require("./routes/auth")

const app = require("./app")
const { PORT } = require("./config")

//const app = express()


app.use(express.json())



app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})


