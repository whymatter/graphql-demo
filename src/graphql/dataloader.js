const { User, Board, Post } = require('../entities');
const DataLoader = require('dataloader');
const { Op } = require('sequelize');

/**
 * 
 * @param {Array<any>} keys 
 * @param {any} values
 * @param {(any) => any} keySelector 
 */
 function preserveOrder(keys, values, keySelector) {
    // build a map for key -> value
    var map = new Map(values.map(v => [keySelector(v), v]));

    // return values in order of keys
    return keys.map(k => map.get(k));
}

/**
 * Group `values` by a key selected by `keySelector`.
 * Then return the groups in the same order as keys
 * @param {Array<any>} keys 
 * @param {any} values
 * @param {(any) => any} keySelector 
 */
 function preserveListOrder(keys, values, keySelector) {
    // build a map for key -> values[]
    var map = new Map();

    for (const value of values) {
        const key = keySelector(value);

        if (map.has(key)) {
            map.get(key).push(value);
        } else {
            map.set(key, [value]);
        }
    }

    // return values in order of keys
    return keys.map(k => map.get(k));
}

const buildLoader = () => {
    const userLoader = new DataLoader(async (keys) => {
        const users = await User.findAll({
            where: {
                [User.primaryKeyAttribute]: { [Op.in]: keys }
            }
        });
    
        return preserveOrder(keys, users, user => user.id);
    });
    
    const boardLoader = new DataLoader(async (keys) => {    
        const boards = await Board.findAll({
            where: {
                [Board.primaryKeyAttribute]: { [Op.in]: keys }
            }
        });
    
        return preserveOrder(keys, boards, board => board.id);
    });

    async function loadPostsByBoardId(keys) {
        // load all posts for boardIds given by keys
        const posts = await Post.findAll({
            where: {
                boardId: { [Op.in]: keys }
            }
        });
        
        return preserveListOrder(
            keys,
            posts,
            post => post.boardId
        );
    }
    
    const postByBoardIdLoader = new DataLoader(loadPostsByBoardId);

    return {
        userLoader,
        boardLoader,
        postByBoardIdLoader
    };
}

module.exports = buildLoader;