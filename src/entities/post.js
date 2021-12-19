const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./user');

class Post extends Model {
    /**
     * Returns the author of the Post
     * @returns {User} The author of the Post
     */
    author = async (args, { userLoader }) => {
        return await userLoader.load(this.authorId);
    };
}

Post.init({
    text: DataTypes.STRING
}, { sequelize, modelName: 'post' });

Post.author = Post.belongsTo(User, { as: 'author' });

module.exports = Post;