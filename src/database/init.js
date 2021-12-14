const sequelize = require('./connection');
const { User, Board, Post } = require('../entities');

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
}

module.exports = initDb;