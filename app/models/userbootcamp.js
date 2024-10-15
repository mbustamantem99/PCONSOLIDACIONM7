const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserBootcamp extends Model {}

  UserBootcamp.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    bootcampId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Bootcamps',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'UserBootcamp',
  });

  return UserBootcamp;
};
