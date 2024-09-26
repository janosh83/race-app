'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    static associate(models) {
      // Asociace s týmy a body
      this.belongsTo(models.Team, { foreignKey: 'teamId' });
      this.belongsTo(models.Race, { foreignKey: 'raceId' });
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }

  Registration.init({
    status: {
      type: DataTypes.ENUM('signed','payed','canceled'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Registration',
  });

  return Registration;
};