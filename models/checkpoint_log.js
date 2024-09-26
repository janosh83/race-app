'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CheckpointLog extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Checkpoint, { foreignKey: 'checkpointId' });
    }
  }

  CheckpointLog.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    checkpointId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    logTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CheckpointLog',
  });

  return CheckpointLog;
};
