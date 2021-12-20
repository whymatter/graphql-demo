const { withFilter } = require("graphql-subscriptions");
const { Board, User, Post } = require("../entities");
const { PubSub } = require("graphql-subscriptions");

const NEW_POST_TOPIC = 'new_post';
const pubSub = new PubSub();

var resolver = {
    Mutation: {
        createUser: async (parent, { userInput }) => {
            const user = await User.create({
                name: userInput.name,
                email: userInput.email,
            });

            return user;
        },
        createPost: async (parent, { postInput }) => {
            const post = await Post.create({
                text: postInput.text,
                boardId: +postInput.boardId,
                authorId: +postInput.authorId
            });

            await pubSub.publish(NEW_POST_TOPIC, { newPost: post });

            return post;
        },
    },
    Query: {
        user: async (parent, { id }, { userLoader }) => {
            return await userLoader.load(+id);
        },
        users: async (parent, args, { userLoader }) => {
            const users = await User.findAll({
                attributes: ['id'],
                benchmark: true
            });
    
            // Get only userIds
            const userIds = users.map(o => o.id);
            
            return await userLoader.loadMany(userIds);
        },
        boards: async (parent, args, { boardLoader }) => {
            const boards = await Board.findAll({
                attributes: ['id'],
                benchmark: true
            });

            // Get only userIds
            const boardIds = boards.map(o => o.id);
            
            return await boardLoader.loadMany(boardIds);
        },    
    },
    Subscription: {
        newPost: {
            subscribe: withFilter(
                () => pubSub.asyncIterator(NEW_POST_TOPIC),
                (payload, variables) => {
                    return payload.newPost.boardId === +variables.boardId;
                }
            )
        }
    }
};

module.exports = resolver;