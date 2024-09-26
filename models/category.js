'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Asociace s týmy a body
      this.hasMany(models.xxx, { foreignKey: 'raceId' }); // TODO
    }
  }

  Race.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Category',
  });

  return Category;
};