const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./user');
const Post = require('./post');

class Board extends Model {}
Board.init({
    name: DataTypes.STRING
}, { sequelize, modelName: 'board' });

Board.owner = Board.belongsTo(User, { as: 'owner' });
Board.posts = Board.hasMany(Post);

module.exports = Board;