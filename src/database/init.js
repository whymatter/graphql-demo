const sequelize = require('./connection');
const { User, Board, Post } = require('../entities');

/**
 * Scaffold database with some entries
 */
async function initDb() {
    await sequelize.sync({force: true});
  
    const oliver = await User.create({
      name: 'Oliver Seitz',
      email: 'oliver.seitz@uni-a.de'
    });
  
    const sebastian = await User.create({
      name: 'Sebastian Kempe',
      email: 'sebastian.kempe@uni-a.de'
    });
  
    const daniel = await User.create({
      name: 'Daniel Albert',
      email: 'daniel.albert@uni-a.de'
    });
  
    const dbBoard = await Board.create({
      name: 'Datenbanken',
      ownerId: daniel.id
    });
  
    const k8sBoard = await Board.create({
      name: 'Kubernetes',
      ownerId: oliver.id
    });

    const postDb1 = await Post.create({
      text: 'Biete Nachhilfe in Datenbanken',
      authorId: daniel.id,
      boardId: dbBoard.id
    });

    const postDb2 = await Post.create({
      text: 'Suche Nachhilfe für DB',
      authorId: oliver.id,
      boardId: dbBoard.id
    });

    const postK8s2 = await Post.create({
      text: 'Noch jemand interesse an einem Kubernetes Vortrag?',
      authorId: oliver.id,
      boardId: k8sBoard.id
    });
}

module.exports = initDb;