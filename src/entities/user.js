const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class User extends Model {}
User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
}, { sequelize, modelName: 'user' });

module.exports = User;