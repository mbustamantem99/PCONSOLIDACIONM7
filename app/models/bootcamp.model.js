const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bootcamp extends Model {
    static associate(models) {
      Bootcamp.belongsToMany(models.User, {
        through: 'UserBootcamp',
        foreignKey: 'bootcampId',
        as: 'users'
      });
    }
  }

  Bootcamp.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 5,
        max: 10
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Bootcamp'
  });

  return Bootcamp;
};
