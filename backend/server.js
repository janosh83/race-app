// just to test connection to database

const { Sequelize } = require('sequelize');

// Konfigurace připojení k databázi
const sequelize = new Sequelize('raceapp', 'postgres', 'password', {
  host: 'postgres',
  dialect: 'postgres',
  port: 5432
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });