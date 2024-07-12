module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'payments',
          key: 'id'
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
    
    return Order;
  };
  