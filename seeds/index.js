const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('---------------');
  console.log('-users  seeded-');
  console.log('---------------');

  await seedPosts();
  console.log('---------------');
  console.log('-posts  seeded-');
  console.log('---------------');
  await seedComments();
  console.log('---------------');
  console.log('comments seeded');
  console.log('---------------');

  await seedVotes();
  console.log('---------------');
  console.log('-votes  seeded-');
  console.log('---------------');

  process.exit(0);
};

seedAll();
