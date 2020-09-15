// use this file for sync database
// dont run with nodemon
// how to run ? : node sync.js
// just it


const db = require("./app/models")
db.sequelize.sync({force: true}).then(() => {
    console.log("drop and resync DB")
    initial() //delete this for production boy
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