module.exports = ( sequelize, DataTypes ) => {
    const Role = sequelize.define('roles', {
        role: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Role
}