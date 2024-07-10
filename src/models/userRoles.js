module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('userRole', {
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
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'roles',
          key: 'id'
        }
      }
    });
  
    return UserRole;
  };