'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      this.hasMany(models.CheckpointLog, { foreignKey: 'teamId' });
      this.hasMany(models.TaskLog, { foreignKey: 'teamId' });
      this.hasMany(models.Che, { foreignKey: 'teamId' });
    }
  }

  Team.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    raceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Team',
  });

  return Team;
};
