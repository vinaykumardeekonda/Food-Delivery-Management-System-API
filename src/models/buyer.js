module.exports = (sequelize, DataTypes) => {
    const Buyer = sequelize.define('buyer', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Buyer;
  };