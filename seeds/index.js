const userSeeder = require('./user-seeder');
const postSeeder = require('./post-seeder');
const commentSeeder = require('./comment-seeder');

const sequelize = require('../config/connection');
//Example from Module 14 
const seedAll = async () => {
  await sequelize.sync({ force: true });
  await userSeeder();
  await postSeeder();
  await commentSeeder();
  process.exit(0);
};

seedAll();

