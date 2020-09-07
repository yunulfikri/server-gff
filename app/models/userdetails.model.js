module.exports = (sequelize, Sequelize) => {
    const UserDetails = sequelize.define("user_details", {
        fullname: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.INTEGER
        },
        birth: {
            type: Sequelize.DATE
        },
        address: {
            type: Sequelize.TEXT
        },
        photo: {
            type: Sequelize.STRING
        },
        about: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.STRING
        }
    })
    return UserDetails
}