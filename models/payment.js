'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      this.belongsTo(models.CheckpointLog, { foreignKey: 'teamId' });
      this.hasMany(models.TaskLog, { foreignKey: 'teamId' });
      this.hasMany(models.Che, { foreignKey: 'teamId' });
    }
  }

  Payment.init({
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'payed'),
      defaultValue: 'pending',
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    payed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Team',
  });

  return Payment;
};