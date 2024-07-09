const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('Zomato', 'root', '', {
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

module.exports = db