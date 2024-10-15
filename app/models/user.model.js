const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Definir relaciones aquí si es necesario
      User.belongsToMany(models.Bootcamp, {
        through: 'UserBootcamp',
        foreignKey: 'userId',
        as: 'bootcamps'
      });
    }
  }

  // Definición de los campos del modelo
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  return User;
};
