module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define("logs", {
        log:{
            type: Sequelize.TEXT
        },
        status:{
            type: Sequelize.STRING
        }
    })
    return Log
}