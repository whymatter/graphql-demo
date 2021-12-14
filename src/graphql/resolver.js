const { User, Board, Post } = require('../entities');

var rootResolver = {
    createUser: async ({userInput}) => {
        const user = await User.create({
            name: userInput.name,
            email: userInput.email,
        });

        return user;
    },
    user: async ({id}) => {
        return await User.findByPk(id);
    },
    users: async () => {
        return await User.findAll();
    }
};

module.exports = rootResolver;