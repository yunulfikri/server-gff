module.exports = (sequelize, Sequelize) => {
    const UserRoles = sequelize.define("user_roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    })
    return UserRoles
}