const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./user');
const Board = require('./board');

class Post extends Model {}
Post.init({
    text: DataTypes.STRING
}, { sequelize, modelName: 'post' });

Post.author = Post.belongsTo(User, { as: 'author' });

module.exports = Post;