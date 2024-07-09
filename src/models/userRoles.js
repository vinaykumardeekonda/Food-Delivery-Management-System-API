module.exports = ( sequelize, DataTypes ) => {
    const userRole = sequelize.define('userRole', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return userRole
}