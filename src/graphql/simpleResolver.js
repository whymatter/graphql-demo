const { User, Board } = require('../entities');

var resolver = {
    Mutation: {
        createUser: async ({userInput}) => {
            const user = await User.create({
                name: userInput.name,
                email: userInput.email,
            });
    
            return user;
        },
    },
    Query: {
        user: async ({id}) => {
            return await User.findByPk(id);
        },
        users: async () => {
            return await User.findAll();
        },
        boards: async () => {
            return await Board.findAll();
        }
    }
};

module.exports = resolver;