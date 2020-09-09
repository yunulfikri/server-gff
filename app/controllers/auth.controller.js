const db = require("../models")
const config = require("../config/auth.config")
const User = db.user
const Role = db.role
const Log = db.log
const UserDetails = db.userdetails

const Op = db.Sequelize.Op

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")

exports.signup = (req, res) => {
    // save user to database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        // create user details data
        udetails = UserDetails.create({
            fullname: req.body.username,
            status: 'unverified',
            userId: user.id
        })
        Log.create({
            log: "new user registered with email : " + req.body.email,
            status: "success"
        })
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({
                        message: "User was registered"
                    })
                })
            }).catch((e) => {
                user.destroy();
                Log.bulkCreate({
                    log: "Server error :" + e.message,
                    status: "danger"
                }, {
                    log: "remove by err :" + req.body.email,
                    status: "warning"
                })
                res.status(400).send({
                    message: "Server error :" + e.message
                })
            })
        } else {
            //set role to user default, when roles empty
            user.setRoles([1]).then(() => {
                res.send({
                    message: "User was registered success"
                })
            })
        }

    })
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User or password not match, try again"
            })
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "User or password not match, try again!"
            })
        }

        var token = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: 86400
        })
        var authorities = []
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
    })
}