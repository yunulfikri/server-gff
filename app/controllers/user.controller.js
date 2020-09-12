const db = require("../models")
const config = require("../config/auth.config")
const User = db.user
const UserRoles = db.user_roles
const UserDetails = db.userdetails
const Role = db.role
const Op = db.Sequelize.Op
exports.allAccess = (req, res) => {
    res.status(200).send("public content")
}
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.")
}
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.")
}
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.")
}
exports.getAllUser = (req, res) => {
    User.findAll({
        include: [{model: UserRoles, where:{roleId:1}}]
    }).then(user => {
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(500).send("error + " + e)
    })
}