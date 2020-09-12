const config = require("../config/db.config")

const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require("../models/user.model")(sequelize, Sequelize)
db.role = require("../models/role.model")(sequelize, Sequelize)
db.userdetails = require("../models/userdetails.model")(sequelize, Sequelize)
db.log = require("../models/log.model")(sequelize, Sequelize)
db.user_roles = require("../models/user_roles.model")(sequelize, Sequelize)

db.user.hasOne(db.userdetails)
db.userdetails.belongsTo(db.user)

// db.user.hasMany(db.log)
// db.log.belongsTo(db.user)

db.role.belongsToMany(db.user, {
    through: db.user_roles,
    foreignKey: "roleId",
    otherKey: "roleId"
})
db.user.belongsToMany(db.role, {
    through: db.user_roles,
    foreignKey: "userId",
    otherKey: "roleId"
})
db.user_roles.belongsTo(db.role)
db.user_roles.belongsTo(db.user)

db.role.hasMany(db.user_roles)
db.user.hasMany(db.user_roles)
db.ROLES = ["user","admin", "moderator"]

module.exports = db