const { User, Board, Post } = require('../entities');

class BoardEntity {
    constructor(_board) {
        this.board = _board;
    }

    /**
     * @type {Board}
     */
    board;

    get id() { return this.board.id; }

    get name() { return this.board.name; }

    async owner() {
        return {}
    }
}

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
    },
    boards: async () => {
        return await Board.findAll();
    }
};

module.exports = rootResolver;