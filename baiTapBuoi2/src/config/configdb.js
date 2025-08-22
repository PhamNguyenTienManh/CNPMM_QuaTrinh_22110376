import { Sequelize } from 'sequelize';
// const { Sequelize } = require('sequelize'); // Nếu dùng CommonJS

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('node_fulltask', 'root', 'Manh2004!!!', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = connectDB;
