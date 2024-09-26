'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Race extends Model {
    static associate(models) {
      // Asociace s týmy a body
      this.hasMany(models.Team, { foreignKey: 'raceId' });
      this.hasMany(models.Checkpoint, { foreignKey: 'raceId' });
      this.hasMany(models.Task, { foreignKey: 'raceId' });
    }
  }

  Race.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Race',
  });

  return Race;
};
