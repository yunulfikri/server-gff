const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./app/models")
const Role = db.role

db.sequelize.sync({force: true}).then(() => {
    console.log("drop and resync DB")
    initial() //delete this for production boy
})
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
app.get("/", (req, res) => {
    res.send("restricted area")
})

app.get("*", (req, res)=>{
    res.status(404).send("404")
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

function initial() {
    Role.create({
        id:1,
        name: "user"
    })
    Role.create({
        id:2,
        name: "moderator"
    })
    Role.create({
        id:3,
        name: "admin"
    })
}