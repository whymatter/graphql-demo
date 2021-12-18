const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./user');
const Post = require('./post');

class Board extends Model {
    /**
     * Returns the owner of the Board
     * @returns {User} The owner of the Board
     */
    owner = async () => {
        return await User.findByPk(this.ownerId);
    }
}

Board.init({
    name: DataTypes.STRING
}, { sequelize, modelName: 'board' });

Board.owner = Board.belongsTo(User, { as: 'owner' });
Board.posts = Board.hasMany(Post);

module.exports = Board;