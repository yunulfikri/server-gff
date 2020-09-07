module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define("logs", {
        info:{
            type: Sequelize.TEXT
        }
    })
    return Log
}