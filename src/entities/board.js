const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./user');
const Post = require('./post');

class Board extends Model {
    /**
     * Returns the owner of the Board
     * @returns {User} The owner of the Board
     */
    owner = async (args, { userLoader }) => {
        return await userLoader.load(this.ownerId);
    }

    /**
     * Returns the posts on the Board
     * @returns {Array<Post>} The posts on the Board
     */
    posts = async (args, { postByBoardIdLoader }) => {
        return await postByBoardIdLoader.load(this.id);
    }
}

Board.init({
    name: DataTypes.STRING
}, { sequelize, modelName: 'board' });

Board.owner = Board.belongsTo(User, { as: 'owner' });
Board.posts = Board.hasMany(Post);

module.exports = Board;