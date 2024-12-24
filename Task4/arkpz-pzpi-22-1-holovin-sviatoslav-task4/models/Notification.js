'use strict';

const { Sequelize } = require('sequelize');
const { sequelize } = require('../services/db');
const { User } = require('./User');

const Notification = sequelize.define(
  'notification',
  {
    notification_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      references: {
        model: User,
        key: 'username',
      },
    },
    sent_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    message: Sequelize.TEXT,
    notification_type: Sequelize.STRING,
  },
  {
    tableName: 'notification',
    timestamps: false,
  },
);

Notification.belongsTo(User, { foreignKey: 'username', onDelete: 'CASCADE' });
User.hasMany(Notification, { foreignKey: 'username', onDelete: 'CASCADE' });

module.exports = {
  Notification,
};
