module.exports = ( sequelize, DataTypes ) => {
    
    const Buyer = sequelize.define('buyer', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Buyer
}