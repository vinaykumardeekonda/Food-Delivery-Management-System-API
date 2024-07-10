module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define('roles', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Roles;
  };