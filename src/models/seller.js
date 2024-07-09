module.exports = ( sequelize, DataTypes ) => {
    
    const Seller = sequelize.define('seller', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        business_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Seller
}