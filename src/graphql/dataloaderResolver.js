const { User, Board, Post } = require('../entities');
const DataLoader = require('dataloader');
const { Op } = require('sequelize');


const userLoader = new DataLoader(async (keys) => {    
    const users = await User.findAll({
        where: {
            [User.primaryKeyAttribute]: { [Op.in]: keys }
        }
    });

    return users
});

var rootDataloaderResolver = {
    createUser: async ({userInput}) => {
        const user = await User.create({
            name: userInput.name,
            email: userInput.email,
        });

        return user;
    },
    user: async ({id}) => {
        const a = userLoader.load(+id);
        const b = userLoader.load(+id + 1);

        return (await Promise.all([a, b]))[0];
    },
    users: async () => {
        const users = await User.findAll({
            attributes: ['id'],
            benchmark: true
        });

        // Get only userIds
        const userIds = users.map(o => o.id);
        
        return await userLoader.loadMany(userIds);
    }
};

module.exports = rootDataloaderResolver;