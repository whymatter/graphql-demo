const { Board, User, Post } = require("../entities");

var rootDataloaderResolver = {
    createUser: async ({userInput}) => {
        const user = await User.create({
            name: userInput.name,
            email: userInput.email,
        });

        return user;
    },
    user: async ({id}, {userLoader}) => {
        return await userLoader.load(+id);
    },
    users: async (_, {userLoader}) => {
        const users = await User.findAll({
            attributes: ['id'],
            benchmark: true
        });

        // Get only userIds
        const userIds = users.map(o => o.id);
        
        return await userLoader.loadMany(userIds);
    },
    boards: async (_, { boardLoader }) => {
        const boards = await Board.findAll({
            attributes: ['id'],
            benchmark: true
        });

        // Get only userIds
        const boardIds = boards.map(o => o.id);
        
        return await boardLoader.loadMany(boardIds);
    }
};

module.exports = rootDataloaderResolver;