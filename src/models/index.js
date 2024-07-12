const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('zomato', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()
.then( () => {
    console.log('MySQL Connected');
})
.catch( error => {
    console.log('Error' + error);
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Users = require('./users')(sequelize, DataTypes)
db.userRole = require('./userRoles')(sequelize, DataTypes)
db.Role = require('./Roles')(sequelize, DataTypes)
db.Buyer = require('./buyer')(sequelize, DataTypes)
db.Seller = require('./seller')(sequelize, DataTypes)
db.Product = require('./products')(sequelize, DataTypes)
db.Cart = require('./cart')(sequelize, DataTypes)
db.Order = require('./order'),(sequelize, DataTypes)
db.OrderItem = require('./orderItem'),(sequelize, DataTypes)
db.Payment = require('./payment'),(sequelize, DataTypes)

module.exports = db